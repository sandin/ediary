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
    bodyElem : null,
    
    // Default settings
    settings : {
        target : '#editor',                // editor target selector
        titleElem : '#editor-title',       // editor title selector
        bodyElem : '#editor-body',         // editor content selector
        ajaxSetup : {                      // jQuery.Ajax.Options
            dataType : 'json'
        },
        saveUrl : '',                      // do save Url
        deleteUrl : ''                     // do delete Url
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
        var o = $.extend(this.settings, options);
        
        // Setup
        this.element = $(o.target);
        this.bodyElem = $(o.bodyElem);
        this.titleElem = $(o.titleElem);
        
        // Cann't init the editor, Missing DOM element
        if (! this.checkIsReady()) { return; }
        
        this.initPlugins(); // Init all plugins
        this.setupAjax();   // Setup Ajax
        
        this.isReady = true;
        return this;
    },
    
    // Check if all DOM elements exist
    checkIsReady: function() {
        var t = this;
        if (t.element.length + t.titleElem.length + t.bodyElem.length !== 3) {
            console.error('editor/title/body missing. ');
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
        $.each(this.plugins, function() {
            this.delayInit();
        });
    },
    
    // shortcut for events.addListener
    addListener: function(name, listener) {
        this.events.addListener(name, listener);
    },
    
    /**
     * Set DOM elements' values
     * 
     * @param Object{title, content} values
     */
    setElementsValues: function(values) {
        this.setTitle(values.title);
        this.setContent(values.content);
    },
    
    /**
     * Get All values, such as title, content
     * 
     * @return Object{title, content}
     */
    getElementsValues: function() {
        return {
            title : this.getTitle(),
            content : this.getContent()
        };
    },
    
    doSave: function() {
        console.log('do save');
        
        var that = this,
            data = this.getElementsValues();
               
        $.ajax({
            url: 'http://localhost',
            type: 'POST',
            //dataType: 'json',
            data: data,
            success: function(data, textStatus, jqXHR) {
                E.Notice.showMessage('notice, save success');
                //that.events.callListener('onSaveSuccess', arguments);
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
                }
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
        this.bodyElem.val(content);
    },
    getContent: function() {
        return this.bodyElem.val();
    },
    
    // destory the editor
    destory : function() {
        //console.log('destory editor');
        
        // destory all elements
        this.element = null;
        this.titleElem = null;
        this.bodyElem = null;
        
        // destory all plugins
        $.each(this.plugins, function() {
            this.destory();
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
    
    destory: function() {}, 
});
E.Plugin = Plugin; // NAMESPACE

/**
 * Class SaveButton extends Plugin
 * 保存按钮 - 插件
 */
var SaveButton = Plugin.extend({
    options: {
        element: '#editor-btn-sava'
    },
    
    init: function() {
        this._super();
    },
    
    delayInit: function() {
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
        Editor.doSave();
    },
    
    destory : function() {
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
    
    destory: function() {
        
    }
};
// NAMESPACE
E.extend('Pad', Pad);
        
})(jQuery, Ediary, window);
    
