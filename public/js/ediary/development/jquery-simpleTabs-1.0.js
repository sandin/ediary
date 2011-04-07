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
