if (! window.console ) {
    window.console = {
        log:   function() {}, warn:  function() {},
        error: function() {}, fatal: function() {},
        debug: function() {}, dir:   function() {}
    }
}

/**
 * Editor Package
 * @author lds
 */
(function($, E, window){
    
var i18n = {
    SAVE_SUCCESS : '保存成功.',
    SAVING : '正在保存...',
    JSON_PARSE_ERROR : '无法解析服务器返回的数据'
};
E.i18n.extend('Editor', i18n);

/**
 * Class Editor
 * 主编辑器
 */
var Editor = {
    
    //AUTO_SAVE_INTERVAL : 5*60*1000, // 5 min 
    AUTO_SAVE_INTERVAL : 0.5*60*1000, // 0.5 min 
    
    version : 0.1,
    
    debug: true,
    
    // The Editor is ready or not
    isReady : false, 
    
    // The Editor DOM Element(jQuery Object)
    element : null,
    
    // Title Element(jQuery Object)
    titleElem : null,
    
    // Body Element(jQuery Object)
    bodyElem : null, // <textarae>
    
    // auto resize task(Interval)
    resizer: null,
    
    // auto save task(Interval)
    updater: null,
    
    // is saving now
    saving: false,
    
    // title length on last save
    titleLength: -1,
    
    // content length on last save
    contentLength: -1,
    
    // Default Settings
    settings : {
        element:       '#diary',              // editor target selector
        formElem:      '#form_diary',         // editor form selector
        titleElem:     '#diary_title',        // diary title selector
        idElem:        '#diary_id',           // diary id selector
        bodyElem:      '#diary_content',      // diary content selector
        containerElem: '.diary_container',    // diary content wrapper
        updateElem:    '#diary_last_update',  // diary last update time selector  
        ajaxSetup: {                          // jQuery.Ajax.Options
           // dataType : 'json'
        },
        saveUrl: Ediary.baseUrl + '/diary/do/save',  // save action Url
        getDiaryUrl:  E.url('/diary/do/get'),
        deleteUrl: ''                     // delete action Url
    },
    
    // A list of Plugins
    plugins: {},
    
    // Handle All events
    events: new Ediary.Events(), 
    
    /**
     * init the editor
     * 
     * @param Object options
     * @return Editor self
     */
    init : function(options) {
        var t = this, o = $.extend(this.settings, options);
        
        // Some DOM elements are requried
        if (! this.checkDOMIsReady()) { return; }
        
        // Init
        this.element = $(o.element);
        this.bodyElem = $(o.bodyElem);
        this.titleElem = $(o.titleElem);
        this.containerElem = $(o.containerElem);
        
        // Settup 
        this.initPlugins(); // init all plugins
        this.setupAjax();   // Setup Ajax
        this.setupTinyMCE();
        
        this.updateTitleContentLength();
        this.cache('diary', this.getValues());
        
        // Event
        this.bindEvent();
        
        // Tasks FIXME:
        if (! this.isReadonly()) {
            this.resizer = setInterval(function () { t.resize(); }, 500);
            this.startAutoSave(true);
        }
        
        this.isReady = true;
        return this;
    },
    
    bindEvent: function() {
        var self = this;
        
        // Force save when title onChange
        this.titleElem.bind('change', function(){
            console.log('on title change');
            self.doSave(true);
        });
        
        $(window).bind('beforeunload', function(e) {
            self.rteSave(true);
            if (self.isChanged()) {
                return '日记没有保存, 确定离开?';
            }
        });
    },
    
    // 判断 isChanged 时需要上一次保存时标题/内容的快照
    updateTitleContentLength: function() {
        this.titleLength = this.titleElem.val().length;
        this.contentLength = this.bodyElem.val().length;
    },
    
    setupTinyMCE: function() {
        var t = this;
        if (typeof window.tinyMCE == 'undefined') {
            E.include(E.baseUrl + "/js/tiny_mce/tiny_mce.js");
        }
        window.tinyMCE.init({
            mode: 'exact',
            elements: this.bodyElem.attr('id'),
            readonly: this.isReadonly() ? 1 : 0,
            width: this.bodyElem.width(),
            height: this.bodyElem.height(),
            plugins: "safari,paste,inlinepopups,spellchecker,insertdatetime,nonbreaking",
            theme : "advanced",
            skin: 'default',
            content_css : E.baseUrl + "/css/rte.css",
            theme_advanced_buttons1 : "bold,italic,underline,|,fontselect,forecolor,|,justifyleft,justifycenter,justifyright,|,indent,outdent,|,strikethrough,backcolor,|,bullist,numlist,|,spellchecker,insertdate,link,removeformat",
            theme_advanced_buttons2 : "",
            theme_advanced_buttons3 : "",
            theme_advanced_toolbar_location : "external",
            theme_advanced_toolbar_align : "left",
            theme_advanced_statusbar_location : "none",
            theme_advanced_resizing : true,
            invalid_elements: 'embed,object,script,form',
            entity_encoding: "raw", //All characters will be stored in non-entity form except these XML default entities: &amp; &lt; &gt; &quot;
            paste_convert_middot_lists: true,
            paste_remove_spans: true,
            paste_remove_styles: true,
            paste_strip_class_attributes: true,
            nonbreaking_force_tab: true,
            convert_urls: false,
            setup: function(ed) {
                // IE iframe background trasparent hack
                if ($.browser.msie) {
                    ed.onPostRender.add(function (ed, cm) {
                        if ($.browser.msie) {
                            $('iframe', $(ed.getContentAreaContainer())).attr('allowTransparency', "true");
                            $(ed.getBody()).css('background', 'transparent');
                        }
                    });
                }
            },
            template_replace_values : {
            }
        });

    },

    // 初始化所必须的DOM元素一个都不能少
    checkDOMIsReady: function() {
        var o = this.settings,
            requiredElem = ['element', 'titleElem', 'bodyElem',
                            'containerElem', 'formElem'];
            
        for (var elem in requiredElem) {
            var elem = requiredElem[elem];
            
            if ($(o[elem]).length < 1) {
                console.error(elem + " DOM element is missing, " 
                    + " it should be : " + o[elem]);
                return false;
            }
        }
            
        return true;
    },
    
    /**
     * Add Plugin
     * 
     * @param Editor.Plugin plugin object
     * @param Object extend data
     */
    addPlugin: function(name, plugin, extData) {
        if (! (plugin instanceof E.Plugin)) {
            console.warn("Editor.addPlugin expect a Object instance of Plugin. " 
                + " Plugin name: " + name);
            return;
        }
        
        if (typeof this.plugins[name] === 'undefined') {
            this.plugins[name] = plugin;
            this.plugins[name].addExt(extData);
        } else {
            console.warn("Editor already has a Plugin named as " + name);
        }
    },
    initPlugins: function() {
        $.each(this.plugins, function() {
            this.delayInit();
        });
    },
    
    /**
     * addListener 
     * 
     * @param String event name
     * @param Function callback function
     */
    addListener: function(name, callback) {
        var listener = new E.Listener(callback);
        this.events.addListener(name, listener);
    },
    
    // 通知绑定在某一事件上的监听函数
    hook: function(hookName, args) {
        this.events.callListener(hookName, args);
    },
    
    // 调用服务器返回的callback
    callback: function(callbackName) {
        if (typeof this[callbackName] === 'function') {
            var fn = this[callbackName];
            fn.call(this);
        }
    },

    isReadonly: function() {
        return this.titleElem.attr('readonly') || this.bodyElem.attr('readonly');
    },

    /**
     * Get Rich text editor
     * 
     * @return TinyMCE.Editor rich text editor 
     */ 
    getRTEditor: function() {
        var rte;
        try {
            rte = window.tinyMCE.get(this.bodyElem.attr("id"));
        } catch (e) {
            rte = null;
        }
        return rte;
    },
    
    /**
     * Repaint the panel
     * 
     * @param Object {title, content}, if it's null, will use the cache
     */
    repaint: function(data) {
        // If no data params, then use the cache data
        var data = data || this.getCache('diary');
        
        if (typeof data.title !== 'undefined') {
            this.setTitle(data.title);
        }
        if (typeof data.content !== 'undefined') {
            this.setContent(data.content);
        }
        if (typeof data.id !== 'undefined') {
            this.setId(data.id);
        }
        if (typeof data.saved_at !== 'undefined') {
            $(this.settings.updateElem).html(data.saved_at);
        }
        
        // debug
        if (this.debug) { console.log('repaint with data: '); console.dir(data); }
    },
    
    newDiary: function() {
        var data = {
            title: 'new title',
            content: 'new content',
            id: '-1',
            saved_at: '未保存'
        };
        
        this.repaint(data);
    },
    
    /**
     * Get All values, such as title, content
     * 
     * @return Object{title, content}
     */
    getValues: function() {
        return {
            title : this.getTitle(),
            content : this.getContent(),
            id : this.getId(),
            saved_at :  $(this.settings.updateElem).html()
        };
    },
    
    // update id dom element's value
    updateId: function($id) {
        console.log('update Id by Server callback');
        this.setId(this.getCache('diary').id);
    },
    
    // title and body both are empty
    isEmpty: function() {
       return ( 0 == this.titleElem.val().length 
             && 0 == this.bodyElem.val().length );
    },
    
    // title or body has been changed
    isChanged: function() {
        //this.rteSave(true); // make sure rte has been saved.
        //console.log(this.bodyElem.val(),  this.contentLength);
        return ( this.titleElem.val().length !== this.titleLength 
              || this.bodyElem.val().length !== this.contentLength ); 
    },
    
    startAutoSave: function() {
        var self = this;
        this.updater = setInterval(function() {
            self.doSave();
        }, self.AUTO_SAVE_INTERVAL);
    },
    stopAutoSave: function() {
        if (!! this.updater) {
            clearInterval(this.updater);
            this.updater = null;
        }
    },
    
    // resize the editor when reach the bottom
    resize: function () {
        var rte = this.getRTEditor(),
            elem, elemHeight, scrollHeight, newHeight,
            settings = {
                minHeight: 815,
                increment: 815,
                margin: 0
        };
        if (rte) {
            elem = $('iframe', $(rte.getContentAreaContainer()));
            elemHeight = elem.height(); // iframe height
            // iframe's body height
            scrollHeight = $.browser.chrome ? $(rte.getBody()).insideHeight() : $(rte.getBody()).height();
            settings.margin = 40;
        } else if (!this.isReadonly()) {
            elem = this.bodyElem;
            elemHeight = elem.height();
            scrollHeight = elem.get(0).scrollHeight;
        }
        if (elem) {
            if ((elemHeight < scrollHeight + settings.margin) || (elemHeight - settings.increment > scrollHeight + settings.margin)) {
                newHeight = Math.ceil((scrollHeight + settings.margin) / settings.increment) * settings.increment;
            }
            //console.log($(rte.getBody()));
            //console.log('scrool', scrollHeight);
            if (newHeight) {
                newHeight = Math.max(settings.minHeight, newHeight);
                elem.css('height', newHeight + "px");
                this.containerElem.css('height', newHeight + "px");
            }
        }
    },
    
    stopResizer: function() {
        if (!! this.resizer) {
            clearInterval(this.resizer);
            this.resizer = null;
        }
    },
    
    // Save the content into the textarea, so isChanged can read it
    rteSave: function(force) {
        console.log('rte save.');
        var force = force || false,
            rte = this.getRTEditor();
        if (force || (rte && rte.isDirty()) ) {
            rte.save();
        }
    },
    
    // save diary
    doSave: function(force) {
        try {
            var self = this,
                force = force || false,
                $form = $(this.settings.formElem);

            this.rteSave();
            if ( force || (!this.isEmpty() && this.isChanged() && !this.saving) ) {
                console.log('do save');
                $.ajax({
                    url: self.settings.saveUrl,
                    type: 'POST',
                    data: $form.serialize(),
                    dataType: 'json',
                    beforeSend: function(jqXHR, settings) {
                        self.saving = true;
                        E.Notice.showMessage(i18n.SAVING);
                        self.updateStatus(false);
                        self.hook('onBeforeSend', arguments);
                    },
                    success: function(data, textStatus, jqXHR) {
                        self.saving = false;
                        self.onSaveDone(data);
                        self.hook('onSaveDone', arguments);
                    }
                });
            }
        } catch (e) {
            console.log('error by dosave :' + e);
        }
    },
    // do save success callback
    onSaveDone: function(data) {
        if (!this.checkData(data)) { return; }
        
        var diary = data.diary;
        if (diary) {
            var update = {
                'saved_at' : diary.saved_at
            };
            this.repaint(update);
            this.updateTitleContentLength();
            this.updateStatus(true);
            E.Notice.showMessage(i18n.SAVE_SUCCESS, 1000);
        }
    },
    
    /**
     * update last time status
     * 
     * @param $isDone true: just start request, show loading icon
     *                false: request done, remove loading icon
     */
    updateStatus: function(isDone) {
        var isDone = isDone || false,
            $status = $(this.settings.updateElem).prev();
        if (isDone) {
            $status.removeClass('icon_loading_16');
            $status.addClass('icon_ok_16');
        } else {
            $status.removeClass('icon_ok_16');
            $status.addClass('icon_loading_16');
        }
    },
    
    /**
     * Check if has a error message in response data
     * if no error, when cache response, call callback
     * 
     * @param json data 
     * @return boolan false only when has a error
     */ 
    checkData: function(data) {
        if (this.debug) {
            console.log("Get data form server : " + data);
            console.dir(data);
        }
        if (null == data) {
            return false;
        }
        if ( data.error) {
            E.Notice.showMessage(data.error);
            return false;
        }
        // cache server response
        if (data.diary) {
            this.cache('diary', data.diary);
        }
        // call server callback
        if (data.callback) {
            this.callback(data.callback);
        }
        return true;
    },
    
    // get a diary from server 
    doGetDiary: function(id) {
        var self = this;
        $.ajax({
            url: self.settings.getDiaryUrl,
            data: {id : id},
            type: 'POST',
            dataType: 'json',
            beforeSendMessage: '正在获取日记.',
            success: function(data, textStatus, jqXHR) {
                self.onGetDiaryDone(data);
                self.hook('onGetDiaryDone', arguments);
            }
        });
    },
    onGetDiaryDone: function(data) {
        if (! this.checkData(data)) { return; }
        
        if (data.diary) {
            this.repaint(); // use server response data
            E.Notice.showMessage('成功', 1000);
        }
    },

    doDelete: function() {
        console.log('do delete');
    },
    
    setupAjax: function() {
        var self = this, 
            options = {
                error: function(jqXHR, textStatus, errorThrown) {
                    if('parsererror' == textStatus) {
                        console.warn("Response is not a valid JSON Object," 
                            + " Cann't parse it. Response is: \n" ,jqXHR.responseText);
                        E.Notice.showMessage(i18n.JSON_PARSE_ERROR);
                    }
                    self.hook('onError', arguments);
                },
                beforeSend: function(jqXHR, settings) {
                    var msg = settings.beforeSendMessage;
                    if (msg) {
                        E.Notice.showMessage(msg);
                    }
                    self.hook('onBeforeSend', arguments);
                }
            };
        
        $.extend(this.settings.ajaxSetup, options);
        $.ajaxSetup(this.settings.ajaxSetup);
    },
    
    // set/get Cache
    cache: function(key, value) {
        if (this.debug) {
            console.log('cache data ' + key + ' : ' + value);
        }
        this.element.data(key, value);
    },
    getCache: function(key) {
        return this.element.data(key);
    },
    
    // set/get Title
    setTitle: function(title) {
        this.titleElem.val(title);
    },
    getTitle: function() {
        return this.titleElem.val();
    },
    
    // set/get Content
    setContent: function(content) {
        if ( this.getRTEditor() ) {
            this.getRTEditor().setContent(content);
        } else {
            this.bodyElem.val(content);
        }
        
    },
    getContent: function() {
        if ( this.getRTEditor() ) {
            return this.getRTEditor().getContent();
        } else {
            return this.bodyElem.val();
        }
    },
    
    // set/get ID
    setId: function(id) {
        $(this.settings.idElem).val(id);
    },
    getId: function(id) {
        return $(this.settings.idElem).val();
    },
    
    // destroy the editor
    destroy : function() {
        //console.log('destroy editor');
        
        this.stopAutoSave();
        this.stopResizer();
        
        if ( window.tinyMCE && this.getRTEditor() ) {
            //TODO: tinyMCE 生成的元素无法完全destroy, 生成的元素只是被hide,而非删除
            this.getRTEditor().remove();
        }
        
        this.element = null;
        this.titleElem = null;
        this.bodyElem = null;
        
        $.each(this.plugins, function() {
            this.destroy();
        });
        
    }
};
E.extend('Editor', Editor); // NAMESPACE

/**
 * Class Plugin
 * 编辑器插件基类
 */ 
var Plugin = Class.extend({
    init: function() {
        this.element = null;
        this.extData = {};
    },
    
    /**
     * 延时init方法, 非实例化对象时立即调用, 而是延时被Editor#init()调用 
     * 故可在其中对DOM进行处理
     */
    delayInit: function() {},    
    
    /**
     * Add Extend data (like options, params)
     * @param Object extend data
     */
    addExt: function(data) {
        $.extend(this.extData, data);
    },
    
    destroy: function() {} 
});
E.Plugin = Plugin; // NAMESPACE

/**
 * Class OpenButton extends Plugin
 * 打开按钮 - 日记管理列表 - 插件
 */
var OpenButton = Plugin.extend({
    
    data: {
        count: 10,
        page: 1
    },
    
    options: {
        // elements 
        element:       '#editor-btn-open',
        tableElem:     '#table_diary_list', // will cache the repsonse data
        tbodyElem:     '#table_diary_list>tbody',
        editBtnElem:   '#table_diary_list .icon_edit_16',
        delBtnElem:    '#table_diary_list .icon_del_16',
        filterElem:    '#diarys_list_filter',
        startDateElem: '#datepicker-start',
        endDateElem:   '#datepicker-end',
        boxElem:       '#toolbar_extBox_list',
        tabsElem:      '#editor-toolbar',
        flashElem:     '#diarys_list_flash',
        pageElem:      '#diarys_list_pages',
        nextPageElem:  '#diarys_list_next_page',
        prePageElem:   '#diarys_list_pre_page',
        // urls
        listUrl:         E.url('/diary/list/get'),
        getUserDiaryUrl: E.url('/diary/do/user_diarys'),
        delUrl:          E.url('/diary/do/delete')
    },
    
    isReady : false,
    
    init: function() {
        this._super();
        $.extend(this.options, this.extData);
        
        var o = this.options, 
            self = this;

        this.element = $(o.element);
        this.tabElemId = this.element.attr('href');
        
         // open button
        this.element.click(function(){
            self.doGetDiarys(self.data);
            // 只在第一次点击时绑定
            if ( !self.isReady ) {
                self.isReady = true;
                self.bindEvent();
            }
            return false;
        });
        
        
        // debug 
        //this.element.trigger('click');
    },
    
    bindEvent: function() {
        var self = this,
            o = this.options;
        
        // flash button
        $(o.flashElem).click(function() {
            self.doGetDiarys($.extend(self.data, {
                page : $(o.tableElem).data('last').current_page || 1
            }));
            return false;
        });
        
        // edit button
        $(o.editBtnElem).live('click', function(e) {
            var id = self._findId(this);
            if (id) {
                E.Editor.doGetDiary(id);
                $(o.tabsElem).simpleTabs('hide');
            }
            return false;
        });
        
        // delete button
        $(o.delBtnElem).live('click', function(e) {
            var target = this;
            self.doDelete(self._findId(this), function(){
                $(target).parent().parent().hide(); // hide this row
            });
            return false;
        });
        
        // next page button
        $(o.nextPageElem).click(function() {
            var nextPage = self._nextPage();
            if (nextPage) {
                self.doGetDiarys($.extend(self.data, {
                    page: nextPage
                }));
            }
            return false;
        });
        
        // pre page button
        $(o.prePageElem).click(function() {
            var prePage = self._nextPage(true);
            if (prePage) {
                self.doGetDiarys($.extend(self.data, {
                    page: prePage
                }));
            }
            return false;
        });
        
        // filter date button
        $(o.filterElem).click(function() {
            var start = $(o.startDateElem).val(),
                end = $(o.endDateElem).val(),
                today = new Date(),
                newData = {page: 1, count: self.data.count}; // 每次点击此按钮都希望使用新的参数请求数据 
            
            // 没有初始日期表示不限, 没有结束日期表示到今日止
            if (start) { newData.since = start; }
            newData.max = (!!end) ? end : today.getFullYear() 
                                  + '-' + (today.getMonth() + 1) 
                                  + '-' + today.getDate();
            if (newData.since && newData.max 
                && Date.parse(newData.since) > Date.parse(newData.max))
            {
                //alert("起始日期不得大于结束日期.", 5000);
                E.Notice.showDialog("起始日期不得大于结束日期.", '警告');
                return false;
            }
            self.doGetDiarys(newData);
            self.data = newData; // reset
            return false;
        });
        
        // datepicker
        var params = { 
            dateFormat: "yy-mm-dd",
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月",
                         "七月","八月","九月","十月","十一月","十二月"]
        };
        $("#datepicker-start").datepicker(params);
        $("#datepicker-end").datepicker(params);
    },
    
    /**
     * @param pre boolean false: get next page number
     *                    true : get pre page number
     */
    _nextPage: function(pre) {
        var o = this.options, 
            pre = pre || false,
            data = $(o.tableElem).data('last');
        if (data) {
            if (pre) {
                // pre page
                if (data.current_page !== 1) {
                    return parseInt(data.current_page) - 1;
                }
            } else {
                // next page
                if (data.current_page * this.data.count < data.total_diarys) {
                    return parseInt(data.current_page) + 1;
                }
            }
            
        }
        return false;
    },
    
    // find current row diary id
    _findId: function(obj) {
        $tr = $(obj).parent().parent();
        if ($tr.length > 0) {
            return parseInt($tr.attr('id').replace('diarys_item_id_', ''));
        }
    },
    
    // delete a diary
    doDelete: function(id, callback) {
        var self = this,
            o = this.options,
            data = {id : id};
        $.ajax({
            url: o.delUrl,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (data && data.result) {
                    console.log(data);
                    callback();
                }
                E.Notice.showMessage("成功", 1000);
            }
        });
    },
    
    // request a list of diarys
    doGetDiarys: function(data) {
        var self = this, 
            o = this.options,
            post = data ||  {count: 10, page: 1};
        $.ajax({
            url: o.getUserDiaryUrl,
            type: 'post',
            dataType: 'json',
            data: post,
            beforeSendMessage: '正在请求服务器',
            success: function(data) {
                console.log(data);
                if (data && data.diarys) {
                    self.updateTable(data, post);
                    E.Notice.showMessage("成功", 1000);
                    // save response except diarys list
                    delete data.diarys;
                    $(o.tableElem).data('last', data);
                }
            }
        });
    },
    
    // update Table Dom 
    updateTable: function(data, post) {
        var o = this.options, 
            tbody = $(o.tbodyElem).empty(),
            pagebar = $(o.pageElem).empty(),
            diarys = data.diarys;
        
        for ( var i in diarys ) {
            var diary = diarys[i],
                html = '<td>' + diary.title + '</td>'
                     + '<td>' + diary.content + '</td>'
                     + '<td>' + diary.saved_at + '</td>'
                     + '<td><a class="icon_edit_16" href="/diary/' + diary.id + '"></a>'
                     + '<td><a class="icon_del_16" href="/diary/del/' + diary.id + '"></a>',
                tr = $('<tr></tr>')
                     .attr('id', 'diarys_item_id_' + diary.id)
                     .html(html)
                     .appendTo(tbody);
        }
        if (0 == diarys.length) {
            tbody.html('<tr><td>无日记</td></tr>');
        }
        
        var start = (data.current_page * post.count) - post.count + 1,
            end = start + diarys.length - 1,
            pageHtml = start + " - " + end + " of " + data.total_diarys;
        pagebar.html(pageHtml);
        
        if (this.data.since) {
            $(o.startDateElem).val(this.data.since);
        }
        if (this.data.max) {
            $(o.endDateElem).val(this.data.max);
        }
    },
    
    /** @deprecated */
    getList: function(page) {
        var self = this,
            o = this.options
            page = page || 1;
        $.ajax({
            url: o.listUrl,
            type: 'post',
            dataType: 'html',
            data: {page: page},
            success: function(data) {
                $(o.boxElem).html(data);
                E.Notice.showMessage("成功", 1000);
            }
        });
    },
    
    destroy : function() {
        this.element.unbind();
    }
});
E.OpenButton = OpenButton; // NAMESPACE

/**
 * Class SaveButton extends Plugin
 * 保存按钮 - 插件
 */
var ThemeManager = Plugin.extend({
    
    // 选择的主题
    select: null,
    
    options: {
        element: '#toolbar-tabs-theme',
        previewElem: '.preview-theme-btns',
        changeElem: '#change-theme-btn',
        themeLinkElem: '#theme-css',
        
        themeRoot: E.url('/theme/'),
        changeThemeUrl: E.url('/user/settings/save')
    },
    
    init: function() {
        this._super();
    
        $.extend(this.options, this.extData);
        var o = this.options;

        this.element = $(o.element);
        if (this.element.length < 1) {
            console.warn("Theme Button is missing, it should be :", o.element);
        }

        this.bindEvent();
    },
    
    bindEvent: function() {
        var self = this, o = this.options;
        
        // preview theme buttons, no really change the theme, just preview
        $(o.previewElem).each(function(i) {
            $(this).click(function(e) {
                var themeName = $(this).attr('href'),
                    themeCSS = o.themeRoot + themeName + '/style.css';
                
                $(o.themeLinkElem).attr('href', themeCSS);
                self.select = themeName;
                return false;
            });
        });
        
        // change the theme button
        $(o.changeElem).click(function() {
            if (null == self.select) return;
            
            $.ajax({
                url : o.changeThemeUrl,
                data: {theme: self.select},
                success: function(data) {
                    if (data && data.result) {
                        E.Notice.showMessage("成功更换主题", 2000);
                        console.log(data);
                    }
                }
            });
            
        });
    },
    
    destroy : function() {
        this.element.unbind();
    }
});
E.ThemeManager = ThemeManager; // NAMESPACE

})(jQuery, Ediary, window);


(function($, E, window){
    
/**
 * class Pad
 * 写字板 - 含 Editor, Notice, Button...
 * 
 * Call Pad.init() after DOM ready
 */
var Pad = {
    
    options: {
        editor: {},
        notice: {}
    },
    
    init: function(options) {
        this.initEditor(options);
        return this;
    },
    
    initEditor: function(options) {
        $.extend(this.options, options);
        
        var editor = E.Editor.init(this.options.editor);
            //notice = E.Notice.init(this.options.notice),
        
        // add listeners
        editor.addListener("onSaveSuccess", function(data, textStatus, jqXHR){
        });
        
        $("#editor-toolbar").simpleTabs({select: null, useId: true});
        
        // add Plugins 
        editor.addPlugin('OpenButton', new E.OpenButton());
        
        $('#editor-btn-save').click(function() {
            editor.doSave(true); // force save
            return false;
        });
        
        $('#editor-btn-create').click(function() {
            editor.newDiary();
            return false;
        });
        
        $('.toolbar-close-btn').live('click', function() {
            $('#editor-toolbar').simpleTabs('hide');
            return false;
        });
        
        // buttons tooltip
        $("#menu>li>a").tipsy({gravity: "s", fake: true});
    },
    
    destroy: function() {
        
    }
};
// NAMESPACE
E.extend('Pad', Pad);
        
})(jQuery, Ediary, window);


(function($, E, window){

E.extend('upload', function(){

    var Upload = {
        debug: E.debug,
        
        element: null,
        settings : {
            'element' : '#diary_file_upload',
            'idElem'  : '#diary_id', // <input name="diary_id" value="0000000" />
            'targetElem' : '#diary_file_list', // 需要将服务器响应结果刷新到的元素
            'js' : ['/js/jquery.uploadify/swfobject.js', 
                    '/js/jquery.uploadify/jquery.uploadify.v2.1.4.js',
                    '/js/fancybox/jquery.fancybox-1.3.4.js'],
            'loadJs' : true,
            'previewSize' : [120, 120],
            'uploadify' : {
                'uploader'  : '/js/jquery.uploadify/uploadify.swf',
                'script'    : '/upload/index/images',
                'buttonText': 'Upload',
                //'cancelImg' : '/js/jquery.uploadify/cancel.png',
                'folder'    : '/uploads',
                'auto'      : true,
                'multi'     : true,
                'fileExt'   : '*.jpg;*.gif;*.png',
                'fileDesc'  : 'Image Files (.JPG, .GIF, .PNG)',
                'queueID'   : 'diary-upload-queue',
                'wmode'     : 'transparent',
                //'removeCompleted': false
            },
            'fancybox' : {
                //'transitionIn'  :   'elastic',
                //'transitionOut' :   'elastic',
                //'speedIn'       :   600, 
                //'speedOut'      :   200, 
                //'overlayShow'   :   false
                'titlePosition'     : 'over',
                'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
                    return '<span id="fancybox-title-over">Image ' +  (currentIndex + 1) + ' / ' + currentArray.length + ' ' + title + '</span>';
                }
            },
            'fancyboxGroup' : 'group1'
        },

        init: function(options) {
            var self = this, o = this.settings; 
            if (options) {
                $.extend(o, options);
            }

            this.element = $(o.element);
            if (o.loadJs) {
                this.loadJs();
            }
            this.initUploadify();
            
            $('a', o.targetElem).fancybox(o.fancybox);
        },
        
        loadJs: function() {
            if (typeof jQuery.fn.uploadify === 'undefined') {
                for (var i in this.settings.js) {
                    E.include(this.settings.js[i]);
                }
            }
        },

        initUploadify: function() {
            var self = this, o = this.settings;

            var params = {
                //'scriptData': {'diary_id' : null},
                'onSelectOnce': function(event, data) {
                    self.onSelectOnce.apply(self, arguments);
                },
                'onAllComplete': function() {
                    self.onAllComplete.apply(self, arguments);
                },
                'coCancel': function() {
                    self.onCancel.apply(self, arguments);
                },
                'onComplete': function() {
                    self.onComplete.apply(self, arguments);
                }
            };
            this.element.uploadify($.extend(params, o.uploadify));
        },
        
        onSelectOnce: function(event, data) {
            // 每次都从idElem里读取id, 保证在id更改后依然发送正确的数据
            var id = $(this.settings.idElem).val();
            if (this.debug) { console.log('upload file -> diary_id : ' + id); }
            $(event.target).uploadifySettings('scriptData', {'diary_id' : id});
        },
        
        onCancel: function(event, ID, fileObj, data) {
            // AJAX delete
        },
        onComplete: function(event, ID, fileObj, response, data) {
            var o = this.settings;
            if (this.debug) { console.log(response); }
            if (response) {
                try {
                    var json = $.parseJSON(response),
                        origin = json.origin,
                        small = json.small,
                        html = '<a href="' + json.origin + '" rel="' 
                             + o.fancyboxGroup + '">'
                             + '<img src="' + json.small 
                             + '" width="' + o.previewSize[0] 
                             + '" height="' + o.previewSize[1] + '" /></a>',
                        a = $(html).fancybox();
                        
                    $('<li></li>').append(a).appendTo($(o.targetElem));
                } catch (e) {
                    $.error(e.getMessage());
                }
            }
        },
        onAllComplete: function() {
            
        }
    };

    E.Upload = Upload;
});

})(jQuery, Ediary, window);

