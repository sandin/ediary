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
            if (this.isReady) {
                return; // 单例
            }
            this.isReady = true;
            
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
