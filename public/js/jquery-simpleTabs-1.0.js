/** 
 * jQuery plugin - simpleTabs
 *
 * @author Sam Lau<lds2012@gmail.com>
 * @version 2011-03-30 $Id$
 * 
 */
(function( $ ){

var methods = {
    init : function( options ) {
        var settings = {
                select: 0,
                useId: false
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
                    var id = 'simple-tabs-' + i,
                        div = $('<div></div>').attr('id', id).hide().html("no content").addClass('simple-tabs-panels');
                    if (i == 0 || o.useId) {
                        div.insertAfter(tabBoxs.last());
                    } else {
                        div.insertAfter(tabBoxs.eq(i-1));
                    }
                    $(this).attr('href', '#' + id).data('url', href);
                    href = '#' + id;
                }
                $(this).click(function(e) {
                    var select = (o.useId) ? href : i;
                    methods.show.call(self, select);

                    var url = $(this).data('url');
                    if ( url ) {
                        $.ajax({
                            url: url,
                            dataType: 'html',
                            success: function(data) {
                                $(select).html(data);
                            }
                        });
                    }
                    return false;
                });
            });

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
            $(select).show().addClass('simple-tabs-select');
        } else {
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
