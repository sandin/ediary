/**
 * Console
 */
if (! window.console ) {
    window.console = {
        log:   function() {},
        warn:  function() {},
        error: function() {},
        fatal: function() {},
        debug: function() {},
        dir:   function() {}
    }
}

/**
 * Application
 * @author lds
 */
(function($){
    
// NAMESPACE
var Ediary = {};
window.Ediary = Ediary;

// i18n 
var cn = {
    USERNAME_INVALID: "用户名只能输入字符, 数字和空格",
    EMAIL_IS_NULL : "请输入您的邮箱地址",
    EMAIL_INVALID : "请输入正确的邮箱格式",
    PASSWORD_IS_NULL : "请输入您的密码",
    PASSWORD_INVALID : "密码只允许数字,字母和下划线",
    PASSWORD_TOO_SHORT : "密码至少8位数"
};
Ediary.i18n = cn;

// jQuery Validate Plugin
if (jQuery.validator) {
    
    // Allow [0-9a-zA-Z_]
    jQuery.validator.addMethod("alnum", function(value, element) { 
        return this.optional(element) || /^[\w]+$/.test(value); 
    });
    
    // Regex
    jQuery.validator.addMethod("regex", function(value, element, param) { 
        return this.optional(element) || param.test(value); 
    });
    
}
    
})(jQuery);


/** 
 * Class Notice
 * @author lds
 */
(function($){
    
var Notice = {
    
    // DOM element(jQuery Object)
    element: null,
    
    isReady: false,
    
    // Options
    options: {},
    
    // hide timer
    timer : null,
    
    // construct
    init : function(options) {
        $.extend(this.options, options);
        var t = this, o = t.options;
        
        // setup
        t.element = $(o.element);
        
        // DOM element Missing
        if (t.element.length == 0) {
            console.error("The Notice Element is Missing. It shout be : " + o.element);
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
        this._setMessage(message);
        
        if (typeof delay !== undefined) {
            this._hide(delay);
        }
    },
    
    /**
     * Set Dom Element's html
     * 
     * @private
     * @param String message
     */
    _setMessage : function(message) {
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
        this.timer = setTimeout(function(){
            this._resetMessage();
            this.element.hide();
        }, delay);
    },
    
    // destory
    destory: function() {
        this._resetMessage();
        this.element = null;
    }
};
Ediary.Notice = Notice;

})(jQuery);


/**
 * Class Events & Class Listener
 * 
 * Example: 
 * ------------------------
 * var obj = {
 *    events : new Events(),
 * 
 *    click : function() {
 *      this.events.callListener("onClick");
 *    }
 * }
 * 
 * obj.addListener('onClick', new Listener() {
 *    // Handler click event
 * });
 * ------------------------
 * 
 * @author lds
 */
(function(E) {
    
var Events = function() {
    // A list of listeners
    this.listeners = {};
}
Events.prototype = {
    // add listener
    addListener: function(name, listener) {
        if (typeof this.listeners[name] == 'undefined') {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    },
    // call listener
    callListener: function(name) {
        var listeners = this.listeners[name];
        if (listeners) {
            for (var listener in listeners) {
                listeners[listener].handleEvent();
            }
        }
    }
};

var Listener = function(handler) {
    this.handler = handler;
};
Listener.prototype = {
    handleEvent : function() {
        this.handler();
    }
};

// NAMESPACE
E.Events = Events;
E.Listener = Listener;

})(Ediary);
