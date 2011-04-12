/**
 * Validator Module
 * 
 * Require: jQuery.Validator 
 */
;(function($, E, window) {

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
    
    var formOptions =  {
        'form_settings' : {
            rules : {
                username : {
                    regex: /^[\w\ ]+$/
                }
            },
            messages : {
                username : {
                    regex: E.i18n.USERNAME_INVALID
                }
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
        },
        getFormOptions: function(formName) {
            if (formOptions[formName] != null) {
                return $.extend({}, this.options, formOptions[formName])
            }
        }
    };
    E.Validator = Validator;

}, {autoLoad: false});

})(jQuery, Ediary, window);
