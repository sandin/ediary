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
    
// Application
var Ediary = {
    
    // default options
    options: {
        autoLoad : true             // auto load module immediately
    },
    
    // modules list
    modules: {},
    
    /**
     * Registers a module
     * 
     * @param String module name 
     * @param mixed module:
     *          Object:   如果提供一个对象, 就被直接附加到命名空间下
     *          Function: 如果提供一个函数, 则被会视作模块代码块, 该函数会在加载模块时执行.
     * @param Object options:
     *          autoLoad: 如果为false, 则模块中的代码不会被立即执行, 而是储存在modules list中
     */
    extend: function(name, object, options) {
        if (typeof this.modules[name] !== 'undefined') {
            console.error("Duplication Module, The " + name + " module is exsits.");
            return;
        } 
        
        var o = $.extend({}, this.options, options);
        
        switch (typeof object) {
            case 'object': 
                this[name] = object;
                break;
            case 'function':
                if (o.autoLoad) {
                    // load immediately
                    this.loadModule(object, options);
                } else {
                    // Save it into this modules list
                    this.modules[name] = {origin: object, load: false};
                }
                break;
            default:
                return; //do nothing
        }
    },
    
    /**
     * Load a module
     * 
     * @param mixed module name 
     *           Function: 如果提供一个匿名函数, 则被立即执行
     *           String:   如果提供一个模块名称, 则会去调用之前注册时存储在模块列表中的模块代码 
     * @param Object options
     */
    loadModule: function(module, options) {
        var fn;
        
        if (typeof module == 'function') {
            // Got a Function
            fn = module;            //TODO: 匿名函数的this指针是否应该指向 Ediary ?
        } else if (typeof module == 'string') {
            // Got a Module Name
            var mod = this.modules[module];
            
            if (typeof mod !== 'undefined') {
                fn = mod['origin']; //TODO: 暂时可加载已经load过的模块
                mod.load = true;
            } else {
                console.warn("The Module %s is not exsits.", module);
                return;
            }
        }
        
        fn.call(this, this, options); // inside Function 'this' point Ediary
    },
    
    destory: function() {
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
Ediary.extend('Validator', function(E){

    // Need jQuery Validate Plugin
    if (typeof jQuery.validator == 'undefined') {
        console.warn("jQuery Validator Plugin is not loaded.");
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
    
    // TODO: user Ediary.require method
    if (typeof E.i18n === 'undefined') {
        console.warn("Validator Module require i18n module.");
        return;
    }

    // Register From Validator options
    var registerForm = {
        rules : {
            email: {
                required: true,
                email: true,
                remote: "/user/account/exists"
            },
            password: {
                required: true,
                minlength: 8,
                alnum : true
            },
            rePassword: {
                required: true,
                equalTo : "#password",
            }
        },
        messages : {
            email : {
                required : E.i18n.EMAIL_IS_NULL,
                email    : E.i18n.EMAIL_INVALID,
                remote   : E.i18n.EMAIL_IS_EXISTS
            },
            password : {
                required  : E.i18n.PASSWORD_IS_NULL,
                alnum     : E.i18n.PASSWORD_INVALID,
                minlength : E.i18n.PASSWORD_TOO_SHORT
            },
            rePassword: {
                required  : E.i18n.PASSWORD_IS_NULL,
                equalTo   : E.i18n.PASSWORD_NOT_SAME 
            }
        },
    };

    // Login From Validator options
    var loginForm = {
        rules : {
            email : {
                required: true,
                email: true
            },
            password : {
                required: true
            }
        },
        messages : {
            email : {
                required : E.i18n.EMAIL_IS_NULL,
                email    : E.i18n.EMAIL_INVALID
            },
            password : {
                required  : E.i18n.PASSWORD_IS_NULL
            }
        }
    };

    var Validator = {
        init: function() {},
        options: {
            //debug : true,     // do not submit the form
            errorElement: "span",
            success: function(label) {
                label.html("Ok!").addClass("valid");
            }
        },
        getRegisterForm: function() {
            return $.extend({}, this.options, registerForm);
        },
        getLoginForm: function() {
            return $.extend({}, this.options, loginForm);
        }
    };
    E.Validator = Validator;

}, {autoLoad: false});


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
        },
        
        makeArgs: function(obj) {
            
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


