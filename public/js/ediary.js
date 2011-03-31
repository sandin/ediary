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
    
    baseUrl : '',
    
    // default options
    options: {
        autoLoad : true             // auto load module immediately
    },
    
    // modules list
    modules: {},
    
    // base url helper
    url: function(url) {
        return this.baseUrl + url;
    },
    
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
    
    include: function (jsurl) {
        if (jsurl == null || typeof(jsurl) != 'string') return;
        var js = document.createElement('script');
        js.type = 'text/javascript';
        js.charset = 'utf-8';
        js.src = jsurl;
        $('head').append(js);
    },
    
    destroy: function() {
    }
};
window.Ediary = Ediary;

// i18n module
Ediary.extend('i18n', function(E) {
    var i18n = {
        languages: {},
        
        /**
         * @param String key language package name
         * @param Object value language package object, like { NAME : '中文翻译'}
         */
        extend: function(key, value) {
            if (typeof this.languages[key] == 'undefined') {
                this.languages[key] = value;
            }
            return value;
        },
        
        /**
         *@param String key language package name
         */
        get: function(key) {
            if (typeof this.languages[key] !== 'undefined') {
                return this.languages[key];
            }
        }
    };
    E.i18n = i18n;
});


// validator module
Ediary.extend('Validator', function(E){
    
    E.i18n.extend('Validator', {
        USERNAME_INVALID: "用户名只能输入字符, 数字和空格",
        EMAIL_IS_NULL : "请输入您的邮箱地址",
        EMAIL_INVALID : "请输入正确的邮箱格式",
        EMAIL_IS_EXISTS : "该电子邮件已经被注册",
        PASSWORD_IS_NULL : "请输入您的密码",
        PASSWORD_INVALID : "密码只允许数字,字母和下划线",
        PASSWORD_TOO_SHORT : "密码至少8位数",
        PASSWORD_NOT_SAME : "两次输入的密码不一样"
        
    });
    var i18n = E.i18n.get('Validator');

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
                equalTo : "#password"
            }
        },
        messages : {
            email : {
                required : i18n.EMAIL_IS_NULL,
                email    : i18n.EMAIL_INVALID,
                remote   : i18n.EMAIL_IS_EXISTS
            },
            password : {
                required  : i18n.PASSWORD_IS_NULL,
                alnum     : i18n.PASSWORD_INVALID,
                minlength : i18n.PASSWORD_TOO_SHORT
            },
            rePassword: {
                required  : i18n.PASSWORD_IS_NULL,
                equalTo   : i18n.PASSWORD_NOT_SAME 
            }
        }
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

// extend jquery
jQuery.extend({
   
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
    },
    
    getMessage: function() {
        return this.element.html();
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

/**
 * tipsy - Facebook-style tooltip plugin for jQuery
 * (c) 2008-2009 Jason Frame (jason@onehackoranother.com)
 * Released under The MIT License.
 */
(function($) {
    $.fn.tipsy = function(options) {

        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        return this.each(function() {
            
            var opts = $.fn.tipsy.elementOptions(this, options);
            
            $(this).hover(function() {

                $.data(this, 'cancel.tipsy', true);

                var tip = $.data(this, 'active.tipsy');
                if (!tip) {
                    tip = $('<div class="tipsy"><div class="tipsy-inner"/></div>');
                    tip.css({position: 'absolute', zIndex: 100000});
                    $.data(this, 'active.tipsy', tip);
                }

                if ($(this).attr('title') || typeof($(this).attr('original-title')) != 'string') {
                    $(this).attr('original-title', $(this).attr('title') || '').removeAttr('title');
                }

                var title;
                if (typeof opts.title == 'string') {
                    title = $(this).attr(opts.title == 'title' ? 'original-title' : opts.title);
                } else if (typeof opts.title == 'function') {
                    title = opts.title.call(this);
                }

                tip.find('.tipsy-inner')[opts.html ? 'html' : 'text'](title || opts.fallback);

                var pos = $.extend({}, $(this).offset(), {width: this.offsetWidth, height: this.offsetHeight});
                tip.get(0).className = 'tipsy'; // reset classname in case of dynamic gravity
                tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
                var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
                var gravity = (typeof opts.gravity == 'function') ? opts.gravity.call(this) : opts.gravity;

                switch (gravity.charAt(0)) {
                    case 'n':
                        tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-north');
                        break;
                    case 's':
                        tip.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
                        break;
                    case 'e':
                        tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}).addClass('tipsy-east');
                        break;
                    case 'w':
                        tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}).addClass('tipsy-west');
                        break;
                }

                if (opts.fade) {
                    tip.css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: 0.8});
                } else {
                    tip.css({visibility: 'visible'});
                }

            }, function() {
                $.data(this, 'cancel.tipsy', false);
                var self = this;
                setTimeout(function() {
                    if ($.data(this, 'cancel.tipsy')) return;
                    var tip = $.data(self, 'active.tipsy');
                    if (opts.fade) {
                        tip.stop().fadeOut(function() { $(this).remove(); });
                    } else {
                        tip.remove();
                    }
                }, 100);

            });
            
        });
        
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.defaults = {
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        title: 'title'
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
})(jQuery);
