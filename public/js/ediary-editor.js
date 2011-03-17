/**
 * Console
 */
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
(function($, Ediary, Window){

/**
 * Class Editor
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
        $.extend(this.settings, options);
        
        var t = this,
            o = this.settings;
        
        // Setup
        t.element = $(o.target);
        t.titleElem = $(o.titleElem);
        t.bodyElem = $(o.bodyElem);
        
        // Cann't init the editor, Missing DOM element
        if (! this.checkIsReady) { return; }
        
        this.initPlugins(); // Init all plugins
        this.setupAjax();   // Setup Ajax
        
        t.isReady = true;
        return this;
    },
    
    // Check if all DOM elements exist
    checkIsReady: function() {
        var t = this;
        if (t.element.length + t.titleElem.length + t.bodyElem.length !== 3) {
            console.error('editor/title/body missing. ');
            console.info(t.element);console.info(t.titleElem);console.info(t.bodyElem);
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
        this.plugins[name] = plugin;
        this.plugins[name].addExt(extData);
    },
    
    // Init all plugins
    initPlugins: function() {
        $.each(this.plugins, function() {
            this.delayInit();
        });
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
                console.log('success', textStatus);
                that.events.callListener('onSaveSuccess');
            }
        });
    },
    
    doDelete: function() {
        console.log('do delete');
    },
    
    // call jQuery.ajaxSetup
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

// TODO: delete me
Editor.events.addListener("onSaveSuccess", new Ediary.Listener(function(){
    console.log("listener1");
}));
Editor.events.addListener("onSaveSuccess", new Ediary.Listener(function(){
    console.log("listener2");
}));

/**
 * Class Plugin
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

/**
 * Class SaveButton extends Plugin
 */
var SaveButton = Plugin.extend({
    init: function() {
        this._super();
    },
    
    delayInit: function() {
        var t = this, ext = t.extData;

        this.element = $(ext.element);
        if (this.element.length < 1) {
            console.warn("Save Button is missing, it should be :", ext.element);
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

Editor.addPlugin('SaveButton', new SaveButton(), {element: '#editor-btn-save'});

// NAMESPACE
window.Ediary.Editor = Editor;

})(jQuery, Ediary, window);
