if (! window.console ) {
    window.console = {
        log:   function() {}, warn:  function() {},
        error: function() {}, fatal: function() {},
        debug: function() {}, dir:   function() {}
    }
}

/**
 * Application
 * 
 * @author lds
 */
;(function($){
    
// Application
var Ediary = {
    
    debug: false,
    
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
        $.ajaxSetup({ cache : true });
        $('head').append(js);
        //$.getScript(jsurl);
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

// Date Formator
Ediary.extend('Date', function(E){
    E.Date = {
        dayNames : ['星期天', '星期一', '星期二', '星期三',
                    '星期四', '星期五', '星期六'],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月",
                     "七月","八月","九月","十月","十一月","十二月"],
        init: function() {
        },
        getDateAndWeek: function(date) {
            var date = new Date();
            return date.getFullYear() + "年"
                   + (date.getMonth()+1) + "月"
                   + date.getDate() + "日 "
                   + this.dayNames[date.getDay()];
        }
    };
});

})(jQuery);
