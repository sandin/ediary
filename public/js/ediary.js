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
 * 
 * @author lds
 */
(function($){
    
// NAMESPACE
var Ediary = {
    /**
     * Registers a module
     * 
     * @param String module name 
     * @param Object module object
     * @param Object options
     */
    extend: function(name, object, options) {
        if (typeof this[name] !== 'undefined') {
            console.error("Duplication Module, The " + name + " module is exsits.");
            return;
        } 
        
        switch (typeof object) {
            case 'object': 
                this[name] = object;
                break;
            case 'function':
                //TODO: 匿名函数的this指针是否应该指向 Ediary ?
                object.call(this, this, options); // inside Function 'this' point Ediary
                break;
            default:
                return; //do nothing
        }
    }
};
window.Ediary = Ediary;

// i18n module
Ediary.extend('i18n', function(E) {
    var cn = {
        USERNAME_INVALID: "用户名只能输入字符, 数字和空格",
        EMAIL_IS_NULL : "请输入您的邮箱地址",
        EMAIL_INVALID : "请输入正确的邮箱格式",
        EMAIL_IS_EXISTS : "该电子邮件已经被注册",
        PASSWORD_IS_NULL : "请输入您的密码",
        PASSWORD_INVALID : "密码只允许数字,字母和下划线",
        PASSWORD_TOO_SHORT : "密码至少8位数",
        PASSWORD_NOT_SAME : "两次输入的密码不一样"
    };
    
    E.i18n = cn; // set language 
});

// validator module
Ediary.extend('validator', function(){
    
    // Need jQuery Validate Plugin
    if (! jQuery.validator) {
        return;
    }
    
    // Allow [0-9a-zA-Z_]
    jQuery.validator.addMethod("alnum", function(value, element) { 
        return this.optional(element) || /^[\w]+$/.test(value); 
    });
    
        // Regex
    jQuery.validator.addMethod("regex", function(value, element, param) { 
        return this.optional(element) || param.test(value); 
    });
    
});

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
Ediary.extend('Events', function(E) {

    var Events = function() {
        // A list of listeners
        this.listeners = {};
    }
    Events.prototype = {
        
        /**
         * add listener
         */
        addListener: function(name, listener) {
            if (typeof this.listeners[name] == 'undefined') {
                this.listeners[name] = [];
            }
            this.listeners[name].push(listener);
        },
        
        /**
         * call listener
         * 
         * @param String handler name
         * @param Object event
         */
        callListener: function(name, args) {
            var listeners = this.listeners[name];
            if (listeners) {
                for (var i in listeners) {
                    listeners[i].handleEvent(args);
                }
            }
        }, 
        
        /** @deprecated */
        prepareArguments: function(args) {
        }
    };

    var Listener = function(handler) {
        this.handler = handler;
    };
    Listener.prototype = {
        /**
         * Event Handler
         * @param Object event
         */
        handleEvent : function(args) {
            this.handler.apply(this, args);
        }
    };

    // NAMESPACE
    E.Events = Events;
    E.Listener = Listener;

});

    
})(jQuery);


/** 
 * Class Notice
 * 消息通知器, 提示用户相关信息
 * 
 * @author lds
 */
(function($){
    
var Notice = {
    
    // DOM element(jQuery Object)
    element: null,
    
    isReady: false,
    
    // Options
    options: {
        element: '#notice'
    },
    
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
        
        if (typeof delay !== 'undefined') {
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
        var that = this;
        this.timer = setTimeout(function(){
            that._resetMessage();
            that.element.hide();
        }, delay);
    },
    
    // destory
    destory: function() {
        this._resetMessage();
        this.element = null;
    }
};
Ediary.extend('Notice', Notice);

})(jQuery);




/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(window){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" && 
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);        
                    //this._super = tmp;
                    delete this['_super']; // _super is temp, no need

                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
            this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };

    // GLOBEL
    if (! window.Class) {
        window.Class = Class;
    }
})(window);


