/** 
 * class Notice
 * 消息通知器, 提示用户相关信息
 * 
 * @author lds
 */
;(function($, E, window){
    
var Notice = {
    
    // DOM element(jQuery Object)
    element: null,
    
    isReady: false,
    
    // Options
    options: {
        element: '#notice',
        dialogElem: '#dialog-message'
    },
    
    // dialog UI
    dialog: null,
    
    // hide timer
    timer : null,
    
    // construct
    init : function(options) {
        if (this.isReady) { return; } // only init it once
        
        $.extend(this.options, options);
        var t = this, o = t.options;
        
        // setup
        t.element = $(o.element);
        
        // DOM element Missing
        if (t.element.length == 0) {
            console.warn("The Notice Element is Missing. It shout be : " + o.element);
            return;
        }
        
        t.isReady = true;
        return this;
    }, 
    
    /**
     * Show A message 
     * 
     * @param String message to show
     * @param int delay if has this, the message will be hidden after a few second
     */
    showMessage: function(message, delay) {
        if (!this.isReady) { this.init(); }
        this._setMessage(message);
        
        if (typeof delay !== 'undefined') {
            this._hide(delay);
        }
        return this;
    },
    
    getMessage: function() {
        if (this.element) {
            return this.element.html();
        }
    },
    
    showDialog: function(message, title) {
        var t =this, o = this.options,
            title = title || '提示框';
        if (! this.dialog) {
            t.dialog = $(o.dialogElem);
            if (t.dialog.length == 0) {
                t.dialog = $("<div></div>").attr('id', o.dialogElem.slice(1))
                                           .attr('title', title)
                                           .appendTo($('body'));
            }
            t.dialog.dialog({
                    modal: true,
                    buttons: {
                        Ok: function(){$(this).dialog( "close" );}
                    }
                });
        }
        t.dialog.attr('title', title).text(message).dialog('open');
    },
    
    /**
     * Set Dom Element's html
     * 
     * @private
     * @param String message
     */
    _setMessage : function(message) {
        if (!!this.timer) clearTimeout(this.timer);
        this.element.show();
        this.element.html(message);
    },
    
    /**
     * clean the message
     */
    _resetMessage : function() {
        this._setMessage('');
    },
    
    /**
     * Hide the Element after a few second 
     * 
     * @param int delay millisec
     */
    _hide: function(delay) {
        var that = this;
        this.timer = setTimeout(function(){
            that._resetMessage();
            that.element.hide();
        }, delay);
    },
    
    // destroy
    destroy: function() {
        this._resetMessage();
        this.element = null;
    }
};
Ediary.extend('Notice', Notice);

/**
 * class Tooltip extends Notice
 * 全局提示
 */
var Tooltip = $.extend({}, Notice, {
    OK: 'ok',
    ERR: 'error',
    
    options : {
        element: '#gTips'
    },
    _setMessage : function(message) {
        if (!!this.timer) clearTimeout(this.timer);
        this.element.show();
        this.getTextElement().html(message);
    },
    setType: function(className) {
        this.element.removeClass().addClass(className);
    },
    getType: function() {
        this.element.attr('class');
    },
    getTextElement: function() {
        return this.element.children('span');
    },
    // 页面载入后检查/显示是否含有PHP设置的提示信息
    check: function() {
        if (this.getTextElement().text() != '') {
            this.element.show().data("today", false); 
        }
    },
    // 取消显示PHP设置的提示信息
    unCheck: function() {
        if (false === this.element.data('today')) {
            this.showMessage("", 0); //hide 
        }
    }
});
Ediary.extend('Tooltip', Tooltip);



})(jQuery, Ediary, window);
