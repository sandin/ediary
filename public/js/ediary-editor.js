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
    
    // resize Interval
    resizer: null,
    
    // current title length
    titleLength: -1,
    
    // current body length
    bodyLength: -1,
    
    // auto save task(Interval)
    updater: null,
    
    // Default Settings
    settings : {
        element:       '#diary',              // editor target selector
        formElem:      '#form_diary',         // editor form selector
        titleElem:     '#diary_title',        // diary title selector
        idElem:        '#diary_id',           // diary id selector
        bodyElem:      '#diary_content',      // diary content selector
        containerElem: '.diary_container',    // diary content wrapper
        ajaxSetup: {                          // jQuery.Ajax.Options
           // dataType : 'json'
        },
        saveUrl: Ediary.baseUrl + '/diary/do/save',  // save action Url
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
        
        // Cann't init the editor, Missing DOM element
        if (! this.checkDOMIsReady()) { return; }
        
        // Setup
        this.element = $(o.element);
        this.bodyElem = $(o.bodyElem);
        this.titleElem = $(o.titleElem);
        this.containerElem = $(o.containerElem);
        this.bodyLength = this.bodyElem.val().length;
        this.titleLength = this.titleElem.val().length;
        
        this.initPlugins(); // init all plugins
        this.setupAjax();   // Setup Ajax
        this.setupTinyMCE();
        
        // FIXME:
        this.resizer = setInterval(function () { t.resize(); }, 500);
        
        this.isReady = true;
        return this;
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
            theme_advanced_buttons1 : "bold,italic,underline,|,fontselect,fontsizeselect,forecolor,|,justifyleft,justifycenter,justifyright,|,indent,outdent,|,strikethrough,backcolor,|,bullist,numlist,|,spellchecker,insertdate,link,removeformat",
            theme_advanced_buttons2 : "",
            theme_advanced_buttons3 : "",
            theme_advanced_toolbar_location : "none",
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

    // Check if required DOM elements all exist
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
    
    // Init all plugins
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
    
    // Notice listeners
    hook: function(hookName, args) {
        this.events.callListener(hookName, args);
    },
    
    callback: function(callbackName) {
        if (typeof this[callbackName] === 'function') {
            var fn = this[callbackName];
            fn.call(this);
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
    
    // is read only
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
        
        if (data.title) {
            this.setTitle(data.title);
        }
        if (data.content) {
            this.setContent(data.content);
        }
        if (data.id) {
            this.setId(data.id);
        }
    },
    
    /**
     * Get All values, such as title, content
     * 
     * @return Object{title, content}
     */
    getValues: function() {
        return {
            title : this.getTitle(),
            content : this.getContent()
        };
    },
    
    updateId: function($id) {
        console.log('update Id by Server callback');
        this.setId(this.getCache('diary').id);
    },
    
    // title&&body is empty
    isEmpty: function() {
       return ( 0 == this.titleElem.val().length 
             && 0 == this.bodyElem.val().length );
    },
    
    // title||body is changed
    isChanged: function() {
        return ( this.titleElem.val().length !== this.titleLength 
              || this.bodyElem.val().length !== this.bodyLenght ); 
    },
    
    // start auto-save task
    startAutoSave: function() {
        var self = this;
        this.updater = setInterval(function() {
            self.doSave();
        }, self.AUTO_SAVE_INTERVAL);
    },
    
    // stop auto-save task
    stopAutoSave: function() {
        if (!! this.updater) {
            clearInterval(this.updater);
            this.updater = null;
        }
    },
    
    stopResizer: function() {
        if (!! this.resizer) {
            clearInterval(this.resizer);
            this.resizer = null;
        }
    },
    
    // do save action
    doSave: function(force) {
        try {
            var self = this,
            force = force || false,
            rte = this.getRTEditor(),
            $form = $(this.settings.formElem);

            // Save the content into the textarea
            if (rte && rte.isDirty()) {
                rte.save();
            }

            // force save or (is not empty and changed)
            if ( force || (!this.isEmpty() && this.isChanged()) ) {
                console.log('do save');
                // Send data to Server
                $.ajax({
                    url: self.settings.saveUrl,
                    type: 'POST',
                    data: $form.serialize(),
                    dataType: 'json',
                    beforeSendMessage: i18n.SAVING,
                    success: function(data, textStatus, jqXHR) {
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
        
        E.Notice.showMessage(i18n.SAVE_SUCCESS, 1000);
        var diary = data.diary;
    },
    
    // check error, cache response, callback
    checkData: function(data) {
        if (this.debug) {
            console.log("Get data form server : " + data);
            console.dir(data);
        }
        if (null == data) return false; 
        
        // has error
        if (data.error) {
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
    doGetDiary: function() {
        var self = this;
        $.ajax({
            url: self.settings.getDiaryUrl,
            type: 'POST',
            dataType: 'json',
            beforeSendMessage: '正在获取日记.',
            success: function(data, textStatus, jqXHR) {
                self.onGetDiaryDone(data);
                self.hook('onGetDiaryDone', arguments);
            }
        });
    },
    
    // use server response repaint the panel
    onGetDiaryDone: function(data) {
        if (! this.checkData(data)) { return; }
        
        if (data.diary) {
//            this.repaint(data.diary);
            this.repaint();
        }
    },

    doDelete: function() {
        console.log('do delete');
    },
    
    // Call jQuery.ajaxSetup
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
                    if (settings.beforeSendMessage) {
                        E.Notice.showMessage(settings.beforeSendMessage);
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
        
        // Stop Tasks
        this.stopAutoSave();
        this.stopResizer();
        
        // Destroy TinyMCE Editor
        if ( window.tinyMCE && this.getRTEditor() ) {
            //TODO: tinyMCE 生成的元素无法完全destroy, 生成的元素只是被hide,而非删除
            this.getRTEditor().remove();
        }
        
        // Destroy all elements
        this.element = null;
        this.titleElem = null;
        this.bodyElem = null;
        
        // Destroy all plugins
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
 * Class SaveButton extends Plugin
 * 保存按钮 - 插件
 */
var SaveButton = Plugin.extend({
    options: {
        element: '#editor-btn-save'
    },
    
    init: function() {
        this._super();
    
        $.extend(this.options, this.extData);
        var o = this.options;

        this.element = $(o.element);
        if (this.element.length < 1) {
            console.warn("Save Button is missing, it should be :", o.element);
        }

        this.bindEvent();
    },
    
    bindEvent: function() {
        this.element.click(this.clickHandler);
    },
    
    clickHandler : function(e) {
        console.log('click save btn');
        E.Editor.doSave();
        return false;
    },
    
    destroy : function() {
        this.element.unbind();
    }
});
E.SaveButton = SaveButton; // NAMESPACE

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
        
        // add Plugins 
        editor.addPlugin('SaveButton', new E.SaveButton());
    },
    
    destroy: function() {
        
    }
};
// NAMESPACE
E.extend('Pad', Pad);
        
})(jQuery, Ediary, window);
    
