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
    SAVING : '正在保存...'
}

/**
 * Class Editor
 * 主编辑器
 */
var Editor = {
    version : 0.1,
    
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
    
    // Default Settings
    settings : {
        target:        '#diary',              // editor target selector
        formElem:      '#form_diary',         // editor form selector
        titleElem:     '#diary_title',        // diary title selector
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
        
        // Setup
        this.element = $(o.target);
        this.bodyElem = $(o.bodyElem);
        this.titleElem = $(o.titleElem);
        this.containerElem = $(o.containerElem);
        
        // Cann't init the editor, Missing DOM element
        if (! this.checkDOMIsReady()) { return; }
        
        this.initPlugins(); // init all plugins
        this.setupAjax();   // Setup Ajax
        this.setupTinyMCE();
        
        // 
        this.resizer = setInterval(function () { t.resize(); }, 500);
        
        this.isReady = true;
        return this;
    },
    
    setupTinyMCE: function() {
        var t = this;
        
        if (typeof jQuery.tinymce === 'undefined') {
            $.include(E.baseUrl + "/js/tiny_mce/jquery.tinymce.js");
        }

        t.bodyElem.tinymce({
            script_url : E.baseUrl + '/js/tiny_mce/tiny_mce.js',
            content_css : E.baseUrl + "/css/rte.css",
            mode: 'exact',
            elements: this.bodyElem.attr('id'),
            width: this.bodyElem.width(),
            height: this.bodyElem.height(),
            theme : "advanced",
            skin: 'default',
            plugins: "safari,paste,inlinepopups,spellchecker,insertdatetime,nonbreaking",
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

    // Check if all DOM elements exist
    checkDOMIsReady: function() {
        var t = this, o = t.settings;
        if (t.element.length < 1) {
            console.error("editor element is missing, it should be : " + o.element);
            return false;
        }
        if (t.titleElem.length < 1) {
            console.error("editor title element is missing, it should be : " + o.titleElem);
            return false;
        }
        if (t.bodyElem.length < 1) {
            console.error("editor body element is missing, it should be : " + o.bodyElem);
            return false;
        }
        if (t.containerElem.length < 1) {
            console.error("editor container element is missing, it should be : " + o.containerElem);
            return false;
        }
        if ($(o.formElem).length < 1) {
            console.error("editor form element is missing, it should be : " + o.formElem);
            return false;
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
        console.log(this.plugins);
        $.each(this.plugins, function() {
            this.delayInit();
        });
    },
    
    // shortcut for events.addListener
    addListener: function(name, listener) {
        this.events.addListener(name, listener);
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
        } else if (!this.isLocked()) {
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
    
    isLocked: function() {
        return false;
    },

    /**
     * Get Rich text editor
     * 
     * @return TinyMCE.Editor rich text editor 
     */ 
    getRTEditor: function() {
        return window.tinyMCE.get(this.bodyElem.attr("id"));
    },
    
    /**
     * Set DOM elements' values
     * 
     * @param Object{title, content} values
     */
    updateValues: function(values) {
        this.setTitle(values.title);
        this.setContent(values.content);
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
    
    doSave: function() {
        console.log('do save');
        
        var self = this,
            rte = this.getRTEditor(),
            $form = $(this.settings.formElem);
        
        console.log(this.getContent());
        if (rte && rte.isDirty()) {
            rte.save(); // save the content into the textarea
        }
        
               
        $.ajax({
            url: self.settings.saveUrl,
            type: 'POST',
            data: $form.serialize(),
            beforeSendMessage: i18n.SAVING,
            success: function(data, textStatus, jqXHR) {
                var data =  $.parseJSON(data),
                    diary = data.diary;
                E.Notice.showMessage(i18n.SAVE_SUCCESS, 1000);
                self.events.callListener('onSaveSuccess', arguments);
                self.setContent(diary.content);
                console.log(data);
            }
        });
    },
    
    doDelete: function() {
        console.log('do delete');
    },
    
    // Call jQuery.ajaxSetup
    setupAjax: function() {
        var that = this, 
            options = {
                error: function(jqXHR, textStatus, errorThrown) {
                    if('parsererror' == textStatus) {
                        console.warn("Response is not a valid JSON Object," 
                            + " Cann't parse it. Response is: \n" ,jqXHR.responseText);
                    }
                    that.events.callListener('onError');
                },
                beforeSend: function(jqXHR, settings) {
                    if (settings.beforeSendMessage) {
                        E.Notice.showMessage(settings.beforeSendMessage);
                    }
                },
            };
        
        $.extend(this.settings.ajaxSetup, options);
        $.ajaxSetup(this.settings.ajaxSetup);
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
    
    // destroy the editor
    destroy : function() {
        //console.log('destroy editor');
        
        // stop the resizer
        clearInterval(this.resizer);
        
        // destroy TinyMCE Editor
        if ( window.tinyMCE && this.getRTEditor() ) {
            //TODO: tinyMCE 生成的元素无法完全destroy, 生成的元素只是被hide,而非删除
            this.getRTEditor().remove();
        }
        
        // destroy all elements
        this.element = null;
        this.titleElem = null;
        this.bodyElem = null;
        
        // destroy all plugins
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
    
    destroy: function() {}, 
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
        editor.addListener("onSaveSuccess", new E.Listener(function(data, textStatus, jqXHR){
        }));
        
        // add Plugins 
        editor.addPlugin('SaveButton', new E.SaveButton());
    },
    
    destroy: function() {
        
    }
};
// NAMESPACE
E.extend('Pad', Pad);
        
})(jQuery, Ediary, window);
    
