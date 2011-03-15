/**
 * 
 */
(function($){
    
var Ediary = {
         
};
 	
// i18n 
$.extend(Ediary, {
    i18n : {
    	USERNAME_INVALID: "用户名只能输入字符, 数字和空格",
        EMAIL_IS_NULL : "请输入您的邮箱地址",
        EMAIL_INVALID : "请输入正确的邮箱格式",
        PASSWORD_IS_NULL : "请输入您的密码",
        PASSWORD_INVALID : "密码只允许数字,字母和下划线",
        PASSWORD_TOO_SHORT : "密码至少8位数"
    }
});
 
// NAMESPACE
window.Ediary = Ediary;


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