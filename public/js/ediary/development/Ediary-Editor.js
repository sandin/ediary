/**
 * Editor Package
 * @author lds
 */
;(function($, E, window){
    
var i18n = {
    SAVE_SUCCESS : '保存成功.',
    SAVE_FAIL : '保存失败.',
    SAVING : '正在保存...',
    JSON_PARSE_ERROR : '无法解析服务器返回的数据',
    NOT_SAVED: '日记没有保存, 确定离开?',
    GETING_DIARYS : '正在获取日记.',
    SUCCESS: '成功'
};
E.i18n.extend('Editor', i18n);

/**
 * Class Editor
 * 主编辑器
 */
var Editor = {
    
    TAG : 'Editor -> ',
    
    AUTO_SAVE_INTERVAL : 30*1000, // 30s 
    
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
    
    // is isSaving now
    isSaving: false,
    
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
        mceElemId:     'diary_content',       // mce textarea selector
        mceWidth:      '572',                 // mce textarea width (px)
        containerElem: '.diary_container',    // diary content wrapper
        updateElem:    '#diary_last_update',  // diary last update time selector  
        ajaxSetup: {                          // jQuery.Ajax.Options
           // dataType : 'json'
        },
        saveUrl: Ediary.baseUrl + '/diary/do/save',  // save action Url
        getDiaryUrl:  E.url('/diary/do/get'),
        deleteUrl: ''                     // delete action Url
    },
    
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
        this.setupTinyMCE();
        this.setupAjax();   // Setup Ajax
        
        this.updateTitleContentLength();
        this.cache('diary', this.getValues());
        
        // Event
        this.bindEvent();
        
        // Tasks FIXME:
        if (! this.isReadonly()) {
            //FIXME:
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
            console.log(self.TAG, 'on title change');
            self.doSave(true);
        });
        
        $(window).bind('beforeunload', function(e) {
            self.rteSave(true);
            if (self.isChanged()) {
                return i18n.NOT_SAVED;
            }
        });
    },
    
    // 判断 isChanged 时需要上一次保存时标题/内容的快照
    updateTitleContentLength: function() {
        this.titleLength = this.titleElem.val().length;
        this.contentLength = this.bodyElem.val().length;
    },
    
    setupTinyMCE: function() {
        var self = this;
        if (typeof window.tinyMCE == 'undefined') {
            //E.include(E.baseUrl + "/js/tiny_mce/tinymce_hammer.js");
        }
        window.tinyMCE.init({
            mode: 'exact',
            elements: this.settings.mceElemId,
            auto_focus : this.settings.mceElemId,
            readonly: this.isReadonly() ? 1 : 0,
            width: this.settings.mceWidth,
            height: this.bodyElem.height(),
            plugins: "inlinepopups",
            theme : "advanced",
            skin: 'default',
            content_css : E.baseUrl + "/css/rte.css",
            theme_advanced_buttons1 : "bold,italic,underline,forecolor,|,justifyleft,justifycenter,justifyright,|,indent,outdent,|,strikethrough,|,bullist,numlist,|,link,removeformat",
            theme_advanced_buttons2 : "",
            theme_advanced_buttons3 : "",
            theme_advanced_toolbar_location : "docked",
            theme_penzu_toolbar_location_docked_element_id : 'diary_editor_toolbar_docked',
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
                /* TODO: 内容为空时显示"默认信息"
                ed.onKeyPress.add(function(ed) {
                    self.setDefaultContent(ed);
                });
                */
            }
            /* TODO: 快捷键
            setupcontent_callback: function(editor_id, body, doc) {
                console.log(body, doc);
                console.log($(body));
                $(doc).bind('keydown', 'ctrl+shift+s', function() {
                    //FIXME: 快捷键只能用一次...
                    self.doSave(true);
                });
            }
            */
        });
    },
    
    /**
     * @param ed TinyMCE.Editor
     * @deprecated 未使用, 直接返回了
     */
    setDefaultContent: function(ed, force) {
        return; // do nothing
        ed = ed || this.getRTEditor();
        ed.focus();
        if (force || ed.getContent().length === 0) {
            $(ed.getBody()).addClass("content_is_empty");
        } else {
            $(ed.getBody()).removeClass("content_is_empty");
        }
    },
    
    // 初始化所必须的DOM元素一个都不能少
    checkDOMIsReady: function() {
        var o = this.settings,
            requiredElem = ['element', 'titleElem', 'bodyElem',
                            'containerElem', 'formElem'];
            
        for (var elem in requiredElem) {
            var elem = requiredElem[elem];
            
            if ($(o[elem]).length < 1) {
                console.error(elem + " DOM element is missing, " + " it should be : " + o[elem]);
                return false;
            }
        }
            
        return true;
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
        var rte = null;
        try {
            rte = window.tinyMCE.get(this.bodyElem.attr("id"));
        } catch (e) {
            console.error(e);
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
        
        this.setDefaultContent();
        // debug
        console.log(this.TAG, 'repaint with data: ');
        console.dir(data); 
    },
    
    newDiary: function() {
        var data = {
            title: E.Date.getDateAndWeek(),
            content: '',
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
        console.log(this.TAG, 'update Id by Server callback');
        this.setId(this.getCache('diary').id);
    },
    
    // title or body is empty
    isEmpty: function() {
       return ( 0 === this.titleElem.val().length 
             || 0 === this.bodyElem.val().length );
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
            //scrollHeight = $.browser.chrome ? $(rte.getBody()).insideHeight() : $(rte.getBody()).height();
            // Penzu的算法在IE6下有BUG, body的高总等于iframe的高
            // 新算法使用: 行数 X 行高  = 内容总高
            scrollHeight = $(rte.getBody()).children().length * 24; // content height
            settings.margin = 40;
        } else if (!this.isReadonly()) {
            elem = this.bodyElem;
            elemHeight = elem.height();
            scrollHeight = $(elem.get(0)).scrollTop(); // TODO: 这里可能有问题
        }
        if (elem) {
            if ((elemHeight < scrollHeight + settings.margin) || (elemHeight - settings.increment > scrollHeight + settings.margin)) {
                newHeight = Math.ceil((scrollHeight + settings.margin) / settings.increment) * settings.increment;
            }
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
        console.log(this.TAG, 'rte save.');
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
            // 标题和内容都不能为空
            if ( (this.isEmpty() || this.isSaving) ) {
                console.log(this.TAG, 'Content/Title is empty, Cann\'t Save');
                E.Notice.showMessage("日记为空, 写点东西先吧.", 1000);
                return; // do nothing
            }
            if ( force || this.isChanged() ) {
                console.log(this.TAG, 'do save');
                $.ajax({
                    url: self.settings.saveUrl,
                    type: 'POST',
                    data: $form.serialize(),
                    dataType: 'json',
                    beforeSend: function(jqXHR, settings) {
                        self.isSaving = true;
                        E.Notice.showMessage(i18n.SAVING);
                        self.updateStatus(false);
                        self.hook('onBeforeSend', arguments);
                    },
                    success: function(data, textStatus, jqXHR) {
                        self.isSaving = false;
                        self.onSaveDone(data);
                        self.updateStatus(true);
                        self.hook('onSaveDone', arguments);
                    }
                });
            }
        } catch (e) {
            console.log(this.TAG, 'error by dosave :' + e);
        }
    },
    // do save success callback
    onSaveDone: function(data) {
        var msg = i18n.SAVE_FAIL;
        if ( this.checkData(data) && data.diary) {
            this.repaint({'saved_at' : data.diary.saved_at});
            this.updateTitleContentLength();
            msg = i18n.SAVE_SUCCESS;
            
            // 取消"今天还没有写日记"提示
            if (data.diary.created_date == E.Date.sqlDateFormator(new Date()) ) {
                E.Tooltip.unCheck();
            }
        }
        E.Notice.showMessage(msg, 3000);
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
        console.log(this.TAG, "Get data form server : " + data);
        console.dir(data);
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
            beforeSendMessage: i18n.GET_DIARYS,
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
            E.Notice.showMessage(i18n.SUCCESS, 1000);
        }
    },

    doDelete: function() {
        console.log(this.TAG, 'do delete');
    },
    
    setupAjax: function() {
        var self = this, 
            options = {
                error: function(jqXHR, textStatus, errorThrown) {
                    if('parsererror' == textStatus) {
                        console.warn("Response is not a valid JSON Object," + " Cann't parse it. Response is: \n" ,jqXHR.responseText);
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
    
    cache: function(key, value) {
        //console.log(this.TAG, 'cache data ' + key + ' :');
        //console.dir(value);
        this.element.data(key, value);
    },
    getCache: function(key) {
        return this.element.data(key);
    },
    
    setTitle: function(title) {
        this.titleElem.val(title);
    },
    getTitle: function() {
        return this.titleElem.val();
    },
    
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
        
        //TODO: tinyMCE 生成的元素无法完全destroy, 生成的元素只是被hide,而非删除
        if ( this.getRTEditor() ) {
            //this.getRTEditor().remove();
        }
        
        this.element = null;
        this.titleElem = null;
        this.bodyElem = null;
        
    }
};
E.extend('Editor', Editor); // NAMESPACE

})(jQuery, Ediary, window);
