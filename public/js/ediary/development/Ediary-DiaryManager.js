/**
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
            
        $(o.tableElem).data('last', {}); // default value
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

})(jQuery, Ediary, window);