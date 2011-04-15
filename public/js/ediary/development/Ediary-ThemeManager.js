/**
 * Class SaveButton extends Plugin
 * 保存按钮 - 插件
 */
;(function($, E, window) {
    
$.fn.switchTheme = function( options ) {
    var settings = {
        file: ''
    };
    
    return this.each(function() {
        if (options) {
            $.extend(settings, options);
        }
        var o = options;
        
        this.disabled = true;
        $(this).attr('href', o.file);
        this.disabled = false;
    });
    
};

var ThemeManager = {
    
    // 选择的主题
    select: null,
    
    options: {
        element: '#toolbar-tabs-theme',
        previewElem: '.preview-theme-btns',
        changeElem: '#change-theme-btn',
        themeLinkElem: '#theme-css',
        
        themeRoot: E.url('/theme/'),
        changeThemeUrl: E.url('/user/settings/save')
    },
    
    init: function() {
        $.extend(this.options, this.extData);
        var o = this.options;

        this.element = $(o.element);
        this.bindEvent();
    },
    
    bindEvent: function() {
        var self = this, o = this.options;
        
        // preview theme buttons, no really change the theme, just preview
        $(o.previewElem).each(function(i) {
            $(this).click(function(e) {
                var themeName = $(this).attr('href'),
                    themeCSS = o.themeRoot + themeName + '/style.css';
                
                $(o.themeLinkElem).switchTheme({file:themeCSS});
                self.select = themeName;
                return false;
            });
        });
        
        // change the theme button
        $(o.changeElem).click(function() {
            if (null == self.select) return;
            
            $.ajax({
                url : o.changeThemeUrl,
                data: {theme: self.select},
                success: function(data) {
                    if (data && data.result) {
                        E.Notice.showMessage("成功更换主题", 2000);
                        console.log(data);
                    }
                }
            });
            
        });
    },
    
    destroy : function() {
    }
};
E.ThemeManager = ThemeManager; // NAMESPACE

})(jQuery, Ediary, window);
