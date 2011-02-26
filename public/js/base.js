/** 
 * jquery-inputDefaultValue.js {{{ 
 * focus时自动清空input内容
 * 
 * @author lds <lds2012@gmail.com>
 * @version $Id
 * @date 2010-08-14
 */
 (function($) {
 
   $.fn.inputDefaultValue = function(settings) {
     var config = {};
 
     if (settings) $.extend(config, settings);

     this.each(function() {
        var $inputDefault = '';
        $(this).addClass('default');

         $(this).bind('focus',function(){
             $(this).addClass('highlight');
             //删除默认值和样式
             if ($(this).hasClass('default')) {
                 $(this).removeClass('default');
                 $inputDefault = $(this).attr('value');
                 $(this).attr('value','');
             }        
         })
         .bind('blur',function(){
             $(this).removeClass('highlight');
             //值为空时重新设置为默认值和样式
             if ('' == $(this).attr('value')) {
                 $(this).attr('value',$inputDefault)
                 .addClass('default');
             }
         })
     });

     return this;

 };

 })(jQuery);
 /*}}}*/

/** 
 * base.js
 * 
 * @author lds <lds2012@gmail.com>
 * @version $Id
 * @date 2010-08-06
 */

jQuery.noConflict();
(function($){

    $(window).load(function(){

        var page = $('body').attr('id');

        // 首页
        if ('indexPage' === page) {

        }//fi


    });//end of window.load

    $(document).ready(function(){
        // 自动清除input value
        $('#addInput').inputDefaultValue();
    
    });


})(jQuery);

// vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 enc=utf-8 :
