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
            if (editor.getId() == '-1') {
                //editor.doSave(true);
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
        
        // hotkey of save 
        //$(document).bind('keydown', 'ctrl+shift+s', function() {
        //    editor.doSave(true);
        //});
    },
    
    destroy: function() {
        
    }
};
// NAMESPACE
E.extend('Pad', Pad);
        
})(jQuery, Ediary, window);
