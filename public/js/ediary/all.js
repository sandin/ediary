/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );if (! window.console ) {
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
;(function($, E, window) {
    
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

})(jQuery, Ediary, window);/**
 * Class DiarysManager extends Plugin
 * 打开按钮 - 日记管理列表 - 插件
 */
;(function($, E, window) {

var DiarysManager = {
    
    data: {
        count: 10,
        page: 1
    },
    
    options: {
        // elements 
        element:       '#editor-btn-open',
        tableElem:     '#table_diary_list', // will cache the repsonse data
        tbodyElem:     '#table_diary_list>tbody',
        editBtnElem:   '#table_diary_list .icon_edit_16',
        delBtnElem:    '#table_diary_list .icon_del_16',
        filterElem:    '#diarys_list_filter',
        startDateElem: '#datepicker-start',
        endDateElem:   '#datepicker-end',
        boxElem:       '#toolbar_extBox_list',
        tabsElem:      '#editor-toolbar',
        flashElem:     '#diarys_list_flash',
        pageElem:      '#diarys_list_pages',
        nextPageElem:  '#diarys_list_next_page',
        prePageElem:   '#diarys_list_pre_page',
        // urls
        listUrl:         E.url('/diary/list/get'),
        getUserDiaryUrl: E.url('/diary/do/user_diarys'),
        delUrl:          E.url('/diary/do/delete')
    },
    
    isReady : false,
    
    init: function() {
        if ( this.isReady ) {
            return this; // 单例
        }
        this.isReady = true;
        
        $.extend(this.options, this.extData);
        var o = this.options, 
            self = this;

        this.element = $(o.element);
        this.bindEvent();
        this.flash();
        
        // debug 
        //this.element.trigger('click');
        return this;
    },
    
    flash: function() {
        this.doGetDiarys(this.data);
    },
    
    bindEvent: function() {
        var self = this,
            o = this.options;
        
        // flash button
        $(o.flashElem).click(function() {
            self.doGetDiarys($.extend(self.data, {
                page : $(o.tableElem).data('last').current_page || 1
            }));
            return false;
        });
        
        // edit button
        $(o.editBtnElem).live('click', function(e) {
            var id = self._findId(this);
            if (id) {
                E.Editor.doGetDiary(id);
                $(o.tabsElem).simpleTabs('hide');
            }
            return false;
        });
        
        // delete button
        $(o.delBtnElem).live('click', function(e) {
            var target = this;
            self.doDelete(self._findId(this), function(){
                $(target).parent().parent().hide(); // hide this row
            });
            return false;
        });
        
        // next page button
        $(o.nextPageElem).click(function() {
            var nextPage = self._nextPage();
            if (nextPage) {
                self.doGetDiarys($.extend(self.data, {
                    page: nextPage
                }));
            }
            return false;
        });
        
        // pre page button
        $(o.prePageElem).click(function() {
            var prePage = self._nextPage(true);
            if (prePage) {
                self.doGetDiarys($.extend(self.data, {
                    page: prePage
                }));
            }
            return false;
        });
        
        // filter date button
        $(o.filterElem).click(function() {
            var start = $(o.startDateElem).val(),
                end = $(o.endDateElem).val(),
                today = new Date(),
                newData = {page: 1, count: self.data.count}; // 每次点击此按钮都希望使用新的参数请求数据 
            
            // 没有初始日期表示不限, 没有结束日期表示到今日止
            if (start) { newData.since = start; }
            newData.max = (!!end) ? end : today.getFullYear() 
                                  + '-' + (today.getMonth() + 1) 
                                  + '-' + today.getDate();
            if (newData.since && newData.max 
                && Date.parse(newData.since) > Date.parse(newData.max))
            {
                //alert("起始日期不得大于结束日期.", 5000);
                E.Notice.showDialog("起始日期不得大于结束日期.", '警告');
                return false;
            }
            self.doGetDiarys(newData);
            self.data = newData; // reset
            return false;
        });
        
        // datepicker
        var params = { 
            dateFormat: "yy-mm-dd",
            dayNamesMin: E.Date.dayNamesMin,
            monthNames: E.Date.monthNames
        };
        $("#datepicker-start").datepicker(params);
        $("#datepicker-end").datepicker(params);
    },
    
    /**
     * @param pre boolean false: get next page number
     *                    true : get pre page number
     */
    _nextPage: function(pre) {
        var o = this.options, 
            pre = pre || false,
            data = $(o.tableElem).data('last');
        if (data) {
            if (pre) {
                // pre page
                if (data.current_page !== 1) {
                    return parseInt(data.current_page) - 1;
                }
            } else {
                // next page
                if (data.current_page * this.data.count < data.total_diarys) {
                    return parseInt(data.current_page) + 1;
                }
            }
            
        }
        return false;
    },
    
    // find current row diary id
    _findId: function(obj) {
        $tr = $(obj).parent().parent();
        if ($tr.length > 0) {
            return parseInt($tr.attr('id').replace('diarys_item_id_', ''));
        }
    },
    
    // delete a diary
    doDelete: function(id, callback) {
        var self = this,
            o = this.options,
            data = {id : id};
        $.ajax({
            url: o.delUrl,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (data && data.result) {
                    console.log(data);
                    callback();
                }
                E.Notice.showMessage("成功", 1000);
            }
        });
    },
    
    // request a list of diarys
    doGetDiarys: function(data) {
        var self = this, 
            o = this.options,
            post = data ||  {count: 10, page: 1};
        $.ajax({
            url: o.getUserDiaryUrl,
            type: 'post',
            dataType: 'json',
            data: post,
            beforeSendMessage: '正在请求服务器',
            success: function(data) {
                console.log(data);
                if (data && data.diarys) {
                    self.updateTable(data, post);
                    E.Notice.showMessage("成功", 1000);
                    // save response except diarys list
                    delete data.diarys;
                    $(o.tableElem).data('last', data);
                }
            }
        });
    },
    
    // update Table Dom 
    updateTable: function(data, post) {
        var o = this.options, 
            tbody = $(o.tbodyElem).empty(),
            pagebar = $(o.pageElem).empty(),
            diarys = data.diarys;
        
        for ( var i in diarys ) {
            var diary = diarys[i],
                html = '<td>' + diary.title + '</td>'
                     + '<td>' + diary.content + '</td>'
                     + '<td>' + diary.saved_at + '</td>'
                     + '<td><a class="icon_edit_16" href="/diary/' + diary.id + '"></a>'
                     + '<td><a class="icon_del_16" href="/diary/del/' + diary.id + '"></a>',
                tr = $('<tr></tr>')
                     .attr('id', 'diarys_item_id_' + diary.id)
                     .html(html)
                     .appendTo(tbody);
        }
        if (0 == diarys.length) {
            tbody.html('<tr><td>无日记</td></tr>');
        }
        
        var start = (data.current_page * post.count) - post.count + 1,
            end = start + diarys.length - 1,
            pageHtml = start + " - " + end + " of " + data.total_diarys;
        pagebar.html(pageHtml);
        
        if (this.data.since) {
            $(o.startDateElem).val(this.data.since);
        }
        if (this.data.max) {
            $(o.endDateElem).val(this.data.max);
        }
    },
    
    /** @deprecated */
    getList: function(page) {
        var self = this,
            o = this.options
            page = page || 1;
        $.ajax({
            url: o.listUrl,
            type: 'post',
            dataType: 'html',
            data: {page: page},
            success: function(data) {
                $(o.boxElem).html(data);
                E.Notice.showMessage("成功", 1000);
            }
        });
    },
    
    destroy : function() {
    }
};
E.DiarysManager = DiarysManager; // NAMESPACE

})(jQuery, Ediary, window);/**
 * Editor Package
 * @author lds
 */
;(function($, E, window){
    
var i18n = {
    SAVE_SUCCESS : '保存成功.',
    SAVE_FAIL : '保存失败.',
    SAVING : '正在保存...',
    JSON_PARSE_ERROR : '无法解析服务器返回的数据',
    NOT_SAVED: '日记没有保存, 确定离开?',
    GETING_DIARYS : '正在获取日记.',
    SUCCESS: '成功'
};
E.i18n.extend('Editor', i18n);

/**
 * Class Editor
 * 主编辑器
 */
var Editor = {
    
    TAG : 'Editor -> ',
    
    AUTO_SAVE_INTERVAL : 5*60*1000, // 5 min 
    
    isReady : false, 
    
    // The Editor DOM Element(jQuery Object)
    element : null,
    
    // Title Element(jQuery Object)
    titleElem : null,
    
    // Body Element(jQuery Object)
    bodyElem : null, // <textarae>
    
    // auto resize task(Interval)
    resizer: null,
    
    // auto save task(Interval)
    updater: null,
    
    // is isSaving now
    isSaving: false,
    
    // title length on last save
    titleLength: -1,
    
    // content length on last save
    contentLength: -1,
    
    // Default Settings
    settings : {
        element:       '#diary',              // editor target selector
        formElem:      '#form_diary',         // editor form selector
        titleElem:     '#diary_title',        // diary title selector
        idElem:        '#diary_id',           // diary id selector
        bodyElem:      '#diary_content',      // diary content selector
        containerElem: '.diary_container',    // diary content wrapper
        updateElem:    '#diary_last_update',  // diary last update time selector  
        ajaxSetup: {                          // jQuery.Ajax.Options
           // dataType : 'json'
        },
        saveUrl: Ediary.baseUrl + '/diary/do/save',  // save action Url
        getDiaryUrl:  E.url('/diary/do/get'),
        deleteUrl: ''                     // delete action Url
    },
    
    // Handle All events
    events: new Ediary.Events(), 
    
    /**
     * init the editor
     * 
     * @param Object options
     * @return Editor self
     */
    init : function(options) {
        var t = this, o = $.extend(this.settings, options);
        
        // Some DOM elements are requried
        if (! this.checkDOMIsReady()) { return; }
        
        // Init
        this.element = $(o.element);
        this.bodyElem = $(o.bodyElem);
        this.titleElem = $(o.titleElem);
        this.containerElem = $(o.containerElem);
        
        // Settup 
        this.setupAjax();   // Setup Ajax
        this.setupTinyMCE();
        
        this.updateTitleContentLength();
        this.cache('diary', this.getValues());
        
        // Event
        this.bindEvent();
        
        // Tasks FIXME:
        if (! this.isReadonly()) {
            this.resizer = setInterval(function () { t.resize(); }, 500);
            this.startAutoSave(true);
        }
        
        this.isReady = true;
        return this;
    },
    
    bindEvent: function() {
        var self = this;
        
        // Force save when title onChange
        this.titleElem.bind('change', function(){
            console.log(self.TAG, 'on title change');
            self.doSave(true);
        });
        
        $(window).bind('beforeunload', function(e) {
            self.rteSave(true);
            if (self.isChanged()) {
                return i18n.NOT_SAVED;
            }
        });
    },
    
    // 判断 isChanged 时需要上一次保存时标题/内容的快照
    updateTitleContentLength: function() {
        this.titleLength = this.titleElem.val().length;
        this.contentLength = this.bodyElem.val().length;
    },
    
    setupTinyMCE: function() {
        var self = this;
        if (typeof window.tinyMCE == 'undefined') {
            E.include(E.baseUrl + "/js/tiny_mce/tiny_mce.js");
        }
        window.tinyMCE.init({
            mode: 'exact',
            elements: this.bodyElem.attr('id'),
            readonly: this.isReadonly() ? 1 : 0,
            width: this.bodyElem.width(),
            height: this.bodyElem.height(),
            plugins: "safari,paste,inlinepopups,spellchecker,insertdatetime,nonbreaking",
            theme : "advanced",
            skin: 'default',
            content_css : E.baseUrl + "/css/rte.css",
            theme_advanced_buttons1 : "bold,italic,underline,|,fontselect,forecolor,|,justifyleft,justifycenter,justifyright,|,indent,outdent,|,strikethrough,backcolor,|,bullist,numlist,|,spellchecker,insertdate,link,removeformat",
            theme_advanced_buttons2 : "",
            theme_advanced_buttons3 : "",
            theme_advanced_toolbar_location : "docked",
            theme_penzu_toolbar_location_docked_element_id : 'diary_editor_toolbar_docked',
            theme_advanced_toolbar_align : "left",
            theme_advanced_statusbar_location : "none",
            theme_advanced_resizing : true,
            invalid_elements: 'embed,object,script,form',
            entity_encoding: "raw", //All characters will be stored in non-entity form except these XML default entities: &amp; &lt; &gt; &quot;
            paste_convert_middot_lists: true,
            paste_remove_spans: true,
            paste_remove_styles: true,
            paste_strip_class_attributes: true,
            nonbreaking_force_tab: true,
            convert_urls: false,
            setup: function(ed) {
                // IE iframe background trasparent hack
                if ($.browser.msie) {
                    ed.onPostRender.add(function (ed, cm) {
                        if ($.browser.msie) {
                            $('iframe', $(ed.getContentAreaContainer())).attr('allowTransparency', "true");
                            $(ed.getBody()).css('background', 'transparent');
                        }
                    });
                }
                // 内容为空时显示"默认信息"
                ed.onKeyPress.add(function(ed) {
                    //TODO: 检查是否有性能问题
                    self.setDefaultContent(ed);
                });
            },
            template_replace_values : {
            },
            setupcontent_callback: function(editor_id, body, doc) {
                console.log(body, doc);
                console.log($(body));
                $(doc).bind('keydown', 'ctrl+shift+s', function() {
                    //FIXME: 快捷键只能用一次...
                    self.doSave(true);
                });
            }
        });
    },
    
    /**
     * @param ed TinyMCE.Editor
     */
    setDefaultContent: function(ed, force) {
        ed = ed || this.getRTEditor();
        if (force || ed.getContent().length === 0) {
            $(ed.getBody()).addClass("content_is_empty");
        } else {
            $(ed.getBody()).removeClass("content_is_empty");
        }
    },
    
    // 初始化所必须的DOM元素一个都不能少
    checkDOMIsReady: function() {
        var o = this.settings,
            requiredElem = ['element', 'titleElem', 'bodyElem',
                            'containerElem', 'formElem'];
            
        for (var elem in requiredElem) {
            var elem = requiredElem[elem];
            
            if ($(o[elem]).length < 1) {
                console.error(elem + " DOM element is missing, " + " it should be : " + o[elem]);
                return false;
            }
        }
            
        return true;
    },
    
    /**
     * addListener 
     * 
     * @param String event name
     * @param Function callback function
     */
    addListener: function(name, callback) {
        var listener = new E.Listener(callback);
        this.events.addListener(name, listener);
    },
    
    // 通知绑定在某一事件上的监听函数
    hook: function(hookName, args) {
        this.events.callListener(hookName, args);
    },
    
    // 调用服务器返回的callback
    callback: function(callbackName) {
        if (typeof this[callbackName] === 'function') {
            var fn = this[callbackName];
            fn.call(this);
        }
    },

    isReadonly: function() {
        return this.titleElem.attr('readonly') || this.bodyElem.attr('readonly');
    },

    /**
     * Get Rich text editor
     * 
     * @return TinyMCE.Editor rich text editor 
     */ 
    getRTEditor: function() {
        var rte = null;
        try {
            rte = window.tinyMCE.get(this.bodyElem.attr("id"));
        } catch (e) {
            console.error(e);
        }
        return rte;
    },
    
    /**
     * Repaint the panel
     * 
     * @param Object {title, content}, if it's null, will use the cache
     */
    repaint: function(data) {
        // If no data params, then use the cache data
        var data = data || this.getCache('diary');
        
        if (typeof data.title !== 'undefined') {
            this.setTitle(data.title);
        }
        if (typeof data.content !== 'undefined') {
            this.setContent(data.content);
        }
        if (typeof data.id !== 'undefined') {
            this.setId(data.id);
        }
        if (typeof data.saved_at !== 'undefined') {
            $(this.settings.updateElem).html(data.saved_at);
        }
        
        this.setDefaultContent();
        // debug
        console.log(this.TAG, 'repaint with data: ');
        console.dir(data); 
    },
    
    newDiary: function() {
        var data = {
            title: E.Date.getDateAndWeek(),
            content: '',
            id: '-1',
            saved_at: '未保存'
        };
        
        this.repaint(data);
    },
    
    /**
     * Get All values, such as title, content
     * 
     * @return Object{title, content}
     */
    getValues: function() {
        return {
            title : this.getTitle(),
            content : this.getContent(),
            id : this.getId(),
            saved_at :  $(this.settings.updateElem).html()
        };
    },
    
    // update id dom element's value
    updateId: function($id) {
        console.log(this.TAG, 'update Id by Server callback');
        this.setId(this.getCache('diary').id);
    },
    
    // title or body is empty
    isEmpty: function() {
       return ( 0 == this.titleElem.val().length 
             || 0 == this.bodyElem.val().length );
    },
    
    // title or body has been changed
    isChanged: function() {
        //this.rteSave(true); // make sure rte has been saved.
        //console.log(this.bodyElem.val(),  this.contentLength);
        return ( this.titleElem.val().length !== this.titleLength 
              || this.bodyElem.val().length !== this.contentLength ); 
    },
    
    startAutoSave: function() {
        var self = this;
        this.updater = setInterval(function() {
            self.doSave();
        }, self.AUTO_SAVE_INTERVAL);
    },
    stopAutoSave: function() {
        if (!! this.updater) {
            clearInterval(this.updater);
            this.updater = null;
        }
    },
    
    // resize the editor when reach the bottom
    resize: function () {
        var rte = this.getRTEditor(),
            elem, elemHeight, scrollHeight, newHeight,
            settings = {
                minHeight: 815,
                increment: 815,
                margin: 0
        };
        if (rte) {
            elem = $('iframe', $(rte.getContentAreaContainer()));
            elemHeight = elem.height(); // iframe height
            // iframe's body height
            scrollHeight = $.browser.chrome ? $(rte.getBody()).insideHeight() : $(rte.getBody()).height();
            settings.margin = 40;
        } else if (!this.isReadonly()) {
            elem = this.bodyElem;
            elemHeight = elem.height();
            scrollHeight = elem.get(0).scrollHeight;
        }
        if (elem) {
            if ((elemHeight < scrollHeight + settings.margin) || (elemHeight - settings.increment > scrollHeight + settings.margin)) {
                newHeight = Math.ceil((scrollHeight + settings.margin) / settings.increment) * settings.increment;
            }
            //console.log($(rte.getBody()));
            //console.log('scrool', scrollHeight);
            if (newHeight) {
                newHeight = Math.max(settings.minHeight, newHeight);
                elem.css('height', newHeight + "px");
                this.containerElem.css('height', newHeight + "px");
            }
        }
    },
    
    stopResizer: function() {
        if (!! this.resizer) {
            clearInterval(this.resizer);
            this.resizer = null;
        }
    },
    
    // Save the content into the textarea, so isChanged can read it
    rteSave: function(force) {
        console.log(this.TAG, 'rte save.');
        var force = force || false,
            rte = this.getRTEditor();
        if (force || (rte && rte.isDirty()) ) {
            rte.save();
        }
    },
    
    // save diary
    doSave: function(force) {
        try {
            var self = this,
                force = force || false,
                $form = $(this.settings.formElem);

            this.rteSave();
            // 标题和内容都不能为空
            if ( !force && (this.isEmpty() || this.isSaving) ) {
                console.log(this.TAG, 'Content/Title is empty, don\'t Save');
                return; // do nothing
            }
            if ( force || this.isChanged() ) {
                console.log(this.TAG, 'do save');
                $.ajax({
                    url: self.settings.saveUrl,
                    type: 'POST',
                    data: $form.serialize(),
                    dataType: 'json',
                    beforeSend: function(jqXHR, settings) {
                        self.isSaving = true;
                        E.Notice.showMessage(i18n.SAVING);
                        self.updateStatus(false);
                        self.hook('onBeforeSend', arguments);
                    },
                    success: function(data, textStatus, jqXHR) {
                        self.isSaving = false;
                        self.onSaveDone(data);
                        self.updateStatus(true);
                        self.hook('onSaveDone', arguments);
                    }
                });
            }
        } catch (e) {
            console.log(this.TAG, 'error by dosave :' + e);
        }
    },
    // do save success callback
    onSaveDone: function(data) {
        var msg = i18n.SAVE_FAIL;
        if ( this.checkData(data) && data.diary) {
            this.repaint({'saved_at' : data.diary.saved_at});
            this.updateTitleContentLength();
            msg = i18n.SAVE_SUCCESS;
        }
        E.Notice.showMessage(msg, 3000);
    },
    
    /**
     * update last time status
     * 
     * @param $isDone true: just start request, show loading icon
     *                false: request done, remove loading icon
     */
    updateStatus: function(isDone) {
        var isDone = isDone || false,
            $status = $(this.settings.updateElem).prev();
        if (isDone) {
            $status.removeClass('icon_loading_16');
            $status.addClass('icon_ok_16');
        } else {
            $status.removeClass('icon_ok_16');
            $status.addClass('icon_loading_16');
        }
    },
    
    /**
     * Check if has a error message in response data
     * if no error, when cache response, call callback
     * 
     * @param json data 
     * @return boolan false only when has a error
     */ 
    checkData: function(data) {
        console.log(this.TAG, "Get data form server : " + data);
        console.dir(data);
        if (null == data) {
            return false;
        }
        if ( data.error) {
            E.Notice.showMessage(data.error);
            return false;
        }
        // cache server response
        if (data.diary) {
            this.cache('diary', data.diary);
        }
        // call server callback
        if (data.callback) {
            this.callback(data.callback);
        }
        return true;
    },
    
    // get a diary from server 
    doGetDiary: function(id) {
        var self = this;
        $.ajax({
            url: self.settings.getDiaryUrl,
            data: {id : id},
            type: 'POST',
            dataType: 'json',
            beforeSendMessage: i18n.GET_DIARYS,
            success: function(data, textStatus, jqXHR) {
                self.onGetDiaryDone(data);
                self.hook('onGetDiaryDone', arguments);
            }
        });
    },
    onGetDiaryDone: function(data) {
        if (! this.checkData(data)) { return; }
        
        if (data.diary) {
            this.repaint(); // use server response data
            E.Notice.showMessage(i18n.SUCCESS, 1000);
        }
    },

    doDelete: function() {
        console.log(this.TAG, 'do delete');
    },
    
    setupAjax: function() {
        var self = this, 
            options = {
                error: function(jqXHR, textStatus, errorThrown) {
                    if('parsererror' == textStatus) {
                        console.warn("Response is not a valid JSON Object," + " Cann't parse it. Response is: \n" ,jqXHR.responseText);
                        E.Notice.showMessage(i18n.JSON_PARSE_ERROR);
                    }
                    self.hook('onError', arguments);
                },
                beforeSend: function(jqXHR, settings) {
                    var msg = settings.beforeSendMessage;
                    if (msg) {
                        E.Notice.showMessage(msg);
                    }
                    self.hook('onBeforeSend', arguments);
                }
            };
        
        $.extend(this.settings.ajaxSetup, options);
        $.ajaxSetup(this.settings.ajaxSetup);
    },
    
    // set/get Cache
    cache: function(key, value) {
        //console.log(this.TAG, 'cache data ' + key + ' :');
        //console.dir(value);
        this.element.data(key, value);
    },
    getCache: function(key) {
        return this.element.data(key);
    },
    
    // set/get Title
    setTitle: function(title) {
        this.titleElem.val(title);
    },
    getTitle: function() {
        return this.titleElem.val();
    },
    
    // set/get Content
    setContent: function(content) {
        if ( this.getRTEditor() ) {
            this.getRTEditor().setContent(content);
        } else {
            this.bodyElem.val(content);
        }
        
    },
    getContent: function() {
        if ( this.getRTEditor() ) {
            return this.getRTEditor().getContent();
        } else {
            return this.bodyElem.val();
        }
    },
    
    // set/get ID
    setId: function(id) {
        $(this.settings.idElem).val(id);
    },
    getId: function(id) {
        return $(this.settings.idElem).val();
    },
    
    // destroy the editor
    destroy : function() {
        //console.log('destroy editor');
        
        this.stopAutoSave();
        this.stopResizer();
        
        //TODO: tinyMCE 生成的元素无法完全destroy, 生成的元素只是被hide,而非删除
        if ( this.getRTEditor() ) {
            //this.getRTEditor().remove();
        }
        
        this.element = null;
        this.titleElem = null;
        this.bodyElem = null;
        
    }
};
E.extend('Editor', Editor); // NAMESPACE

})(jQuery, Ediary, window);
/** 
 * Class Notice
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

})(jQuery, Ediary, window);
/**
 * class Pad
 * 写字板 - 含 Editor, Notice, Button...
 * 
 * Call Pad.init() after DOM ready
 */
;(function($, E, window) {

var Pad = {
    
    options: {
        editor: {},
        notice: {}
    },
    
    init: function(options) {
        this.initEditor(options);
        return this;
    },
    
    initEditor: function(options) {
        $.extend(this.options, options);
        
        var editor = E.Editor.init(this.options.editor);
            //notice = E.Notice.init(this.options.notice),
        
        // add listeners
        editor.addListener("onSaveSuccess", function(data, textStatus, jqXHR){
        });
        
        // Toolbar 
        $("#editor-toolbar").simpleTabs({
            select: null,
            useId: true,
            cache: true,
            noCache: ['editor-btn-upload']
        });
        
        $('#editor-btn-open').click(function() {
            E.DiarysManager.init();
        });
        
        $('#editor-btn-save').click(function() {
            editor.doSave(true); // force save
        })
        
        $('#editor-btn-create').click(function() {
            editor.newDiary();
        });
        
        $('#editor-btn-upload').click(function() {
            console.log(editor.getId());
            if (editor.getId() == '-1') {
                E.Notice.showDialog("日记尚未被创建, 请先点击保存!", "友情提示");
                return false;
            }
        });
        
        $('.toolbar-close-btn').live('click', function() {
            $('#editor-toolbar').simpleTabs('hide');
            return false;
        });
        
        // buttons tooltip
        $("#menu>li>a").tipsy({gravity: "s", fake: true});
        
        // hotkey of force save 
        /*
        $(document).bind('keydown', 'ctrl+shift+s', function() {
            editor.doSave(true);
        });
        */
    },
    
    destroy: function() {
        
    }
};
// NAMESPACE
E.extend('Pad', Pad);
        
})(jQuery, Ediary, window);
/**
 * Class SaveButton extends Plugin
 * 保存按钮 - 插件
 */
;(function($, E, window) {

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
                
                $(o.themeLinkElem).attr('href', themeCSS);
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
/**
 * 文件上传模块
 */
;(function($, E, window){

E.extend('upload', function(){
    var TAG = 'Upload -> ';
    
    var Upload = {
        element: null,
        settings : {
            element : '#diary_file_upload', // TODO: 没有此元素
            idElem  : '#diary_id', // <input name="diary_id" value="0000000" />
            targetElem : '#diary_file_list', // 需要将服务器响应结果刷新到的元素
            deleteElem : '#diary_file_list .delete',
            titleElem  : '#diary_file_list>li>p',
            deleteUrl : '/upload/index/delete?id=',
            js : ['/js/uploadify/swfobject.js', 
                  '/js/uploadify/jquery.uploadify.v2.1.4.js',
                  '/js/fancybox/jquery.fancybox-1.3.4.js'],
            loadJs : true,
            previewSize : [160, 120],
            uploadify : {
                'uploader'  : '/js/uploadify/uploadify.swf',
                'script'    : '/upload/index/images',
                'buttonText': 'Upload',
                'cancelImg' : '/js/uploadify/cancel.png',
                'folder'    : '/uploads',
                'auto'      : true,
                'multi'     : true,
                'fileExt'   : '*.jpg;*.gif;*.png',
                'fileDesc'  : 'Image Files (.JPG, .GIF, .PNG)',
                'queueID'   : 'diary-upload-queue',
                'wmode'     : 'transparent'
                //'removeCompleted': false
            },
            fancybox : {
                //'transitionIn'  :   'elastic',
                //'transitionOut' :   'elastic',
                //'speedIn'       :   600, 
                //'speedOut'      :   200, 
                //'overlayShow'   :   false
                'titlePosition'     : 'over',
                'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
                    return '<span id="fancybox-title-over">Image ' +  (currentIndex + 1) + ' / ' + currentArray.length + ' ' + title + '</span>';
                }
            },
            fancyboxGroup : 'group1'
        },
        isReady: false,

        init: function(options) {
            /* FIXME: 是不是应该把AJAX刷新的区域缩小的主题列表, 而上传按钮就可以复用了
            if (this.isReady) {
                return; // 单例
            }
            this.isReady = true;
            */
            
            var self = this, o = this.settings; 
            if (options) {
                $.extend(o, options);
            }

            this.element = $(o.element);
            if (o.loadJs) {
                this.loadJs();
            }
            this.initUploadify();
            
            $('a.lightbox', o.targetElem).fancybox(o.fancybox);
            
            $(o.deleteElem).live('click', function() {
                self.doDelete($(this));
                return false;
            });
            
            $(o.titleElem).live('mouseenter mouseleave', function(event){
                if ('mouseenter' == event.type) {
                    $(this).children('a').show();
                } else if ('mouseleave' == event.type) {
                    $(this).children('a').hide();
                }
            });
        },
        
        /**
         * @param jQuery-Object click event target
         */
        doDelete: function(target) {
            var self = this, o = this.settings,
                url = target.attr('href') ;
            $.getJSON(url, function(data) {
                console.log("delete file -> url " + url);
                console.log(data);
                if (data && data.status) {
                    target.parent().parent().hide();
                }
            });
            
        },
        
        loadJs: function() {
            if (typeof jQuery.fn.uploadify === 'undefined') {
                for (var i in this.settings.js) {
                    E.include(this.settings.js[i]);
                }
            }
        },

        initUploadify: function() {
            var self = this, o = this.settings;

            var params = {
                //'scriptData': {'diary_id' : null},
                'onSelectOnce': function(event, data) {
                    self.onSelectOnce.apply(self, arguments);
                },
                'onAllComplete': function() {
                    self.onAllComplete.apply(self, arguments);
                },
                'coCancel': function() {
                    self.onCancel.apply(self, arguments);
                },
                'onComplete': function() {
                    self.onComplete.apply(self, arguments);
                },
                'onError': function(event,ID,fileObj,errorObj) {
                    $.error(errorObj);
                }
            };
            this.element.uploadify($.extend(params, o.uploadify));
        },
        
        onSelectOnce: function(event, data) {
            // 每次都从idElem里读取id, 保证在id更改后依然发送正确的数据
            var id = $(this.settings.idElem).val();
            console.log('upload file -> diary_id : ' + id);
            if (id  != '-1') {
                $(event.target).uploadifySettings('scriptData', {'diary_id' : id});
            } 
        },
        
        onCancel: function(event, ID, fileObj, data) {
            // AJAX delete
        },
        onComplete: function(event, ID, fileObj, response, data) {
            var o = this.settings;
            console.log(response);
            if (response) {
                try {
                    var json = $.parseJSON(response);
                    
                    // has error
                    if (json.error) {
                        var msg = '无法上传文件 ', errors = json.error;
                        if ($.inArray('fileMimeTypeFalse', errors) != -1) {
                            msg += '该文件类型不被允许 ';
                        }
                        if ($.inArray('fileSizeTooBig', errors) != -1) {
                            msg += '该文件过大 ';
                        }
                        E.Notice.showMessage(msg, 10000);
                        return;
                    }
                    
                    // Create DOM element, like:
                    // <li>
                    //    <a href="" rel=""><img src="" /></a>
                    //    <p>title<a class="delete"></a></p>
                    // </li>
                    $('<li />').append(
                        $('<a />', {
                            'href': json.origin,
                            'rel' : o.fancyboxGroup
                        })
                        .fancybox(o.fancybox)
                        .append(
                            $('<img />', {
                                'src'  : json.small,
                                'width': o.previewSize[0],
                                'height': o.previewSize[1]
                            })
                        )
                    ).append(
                        $('<p />').text(json.filename).append(
                            $('<a />', {
                                'class' : 'delete',
                                'href'  : o.deleteUrl + json.id,
                                html : '&nbsp'
                            })
                        )
                    ).appendTo($(o.targetElem));
                    
                } catch (e) {
                    $.error(e); // Case by PARSE JSON
                }
            } else {
                E.Notice.showMessage("服务器无法响应, 请稍后再试.", 5000);
            }
        },
        onAllComplete: function() {
            //console.log('all complete');
        }
    };

    E.Upload = Upload;
});

})(jQuery, Ediary, window);
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
/** 
 * jQuery plugin - simpleTabs
 * 
 * HTML: 
 * <div id="tabs">
 *   <ul>
 *       <li><a href="#tabs-1">tabs-1</a></li>
 *       <li><a href="#tabs-2">tabs-2</a></li>
 *       <li><a href="/ajax/request">tabs-2</a></li>
 *   </ul>
 *   <div id="tabs-1"></div>
 *   <div id="tabs-2"></div>
 * </div>
 * 
 * JS: 
 * $('#tabs').simpleTabs();
 * 
 * @author Sam Lau<lds2012@gmail.com>
 * @version 2011-03-30 $Id$
 * 
 */
;(function( $ ){
    

var methods = {
    
    init : function( options ) {
        var sTab = methods,
            settings = {
                select: 0,         // 默认展开的index
                useId: false,      // 是数字索引还是使用ID模式, 如果是则只用每个导航链接的href和box的id绑定
                useCache: true,    // 是否缓存, 开缓存则只在第一次点击做ajax请求
                noCache: []        // 开启缓存的模式下强制不缓存的某个导航id
        };
        return this.each(function(){
            if (options) {
                $.extend(settings, options );
            }

            var self = this, // target element 
                o = settings,
                elem = $(this),
                tabNavs = elem.children('ul').children(),
                tabBoxs = elem.children('div');

            tabBoxs.addClass('simple-tabs-panels').hide();
            if (o.select !== null) {
                tabBoxs.eq(o.select).show().addClass('simple-tabs-select');
            }

            tabNavs.children('a').each(function(i){
                var href = $(this).attr('href');
                if (href.length > 1 && ! /#.+/.test(href) ) {
                    // 创建tab box, 使得DOM元素处理起来和非ajax模式一样
                    var id = 'simple-tabs-' + i,
                        div = $('<div></div>').attr('id', id).hide()
                                              .html("no content")
                                              .addClass('simple-tabs-panels');
                    if (i == 0 || o.useId) {
                        div.insertAfter(tabBoxs.last());
                    } else {
                        div.insertAfter(tabBoxs.eq(i-1));
                    }
                    // 替换href属性, 并将原url储存, 待ajax请求用
                    $(this).attr('href', '#' + id).data('url', href);
                    href = '#' + id;
                }
                
                // <a>
                $(this).click(function(e) {
                    var data = {}, // request data
                        navBtn = $(this),
                        rev = $(navBtn.attr("rev")),  
                        select = (o.useId) ? href : i, // select box
                        url = navBtn.data('url');
                    
                    // open current box and hide the others
                    tabNavs.children('a').removeClass('open');
                    navBtn.addClass("open");
                    methods.show.call(self, select);
                    
                    // 如果<a>存在 "rev" 属性, 则在请求时发送额外数据
                    if ( rev.length > 0 ) {
                        switch (rev[0].nodeName.toLowerCase()) {
                            case 'input':
                            case 'form':
                                data = rev.serialize();
                                break;
                            default:
                                data = {data: rev.text()};
                        }
                    }

                    // 如果含有url数据, 则表示为ajax模式
                    if ( url && !$(select).data('hasCache') ) {
                        $.ajax({
                            url: url,
                            data: data,
                            dataType: 'html',
                            success: function(data, textStatus, jqXHR) {
                                var box = $(select).html(data),
                                    id = navBtn.attr('id');
                                if (o.useCache && -1 === $.inArray(id, o.noCache)) {
                                    box.data('hasCache',true);
                                }
                            },
                            beforeSend: function() {
                                $(select).html("Loading...");
                            }
                        });
                    }
                    return false;
                }); // end of click
            }); // end of each <a>

            console.log('dfsa', this);
            $(this).data('simpleTabs', sTab);
        }); 
    },
    destroy : function( ) {
        return this.each(function(){
        })
    },
    show : function(select) {
        $(this).children('div.simple-tabs-select').hide().remove('simple-tabs-select');
        //console.log($(select));
        
        if (typeof select === 'string' && /#.+/.test(select)) {
            // HANDLE: '#id'
            $(select).show().addClass('simple-tabs-select');
        } else {
            // HANDLE: index
            $(this).children('div').eq(select).show().addClass('simple-tabs-select');
        }

    },
    hide : function(index) {
        if (typeof index !== 'undefined') {
            $(this).children('div').eq(index).hide().removeClass('simple-tabs-select');
        } else {
            // hide all
            $(this).children('div').hide().removeClass('simple-tabs-select');
        }
    },
    reset: function(selector) {
        var url = $(selector).data('url');
        if (url) {
            $(url).data('hasCache', false);
        }
    }
};

$.fn.simpleTabs = function( method ) {
    if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.simpleTabs' );
    }    
};

})( jQuery );
/**
 * tipsy - Facebook-style tooltip plugin for jQuery
 * (c) 2008-2009 Jason Frame (jason@onehackoranother.com)
 * Released under The MIT License.
 */
;(function($) {
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
                    } else if (tip) {
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
