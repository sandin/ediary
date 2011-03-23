/*
$(window).load(function(){
    Ediary.Editor.init();
});
*/
Ediary.baseUrl = '/test/yiriji/tests/javascript';

module("Module Editor", {
    setup: function() {
        var options = {
             ajaxSetup: {                          
                dataType : null
            },
            saveUrl: Ediary.baseUrl + '/data/diary.php', 
         };
        this.obj = Ediary.Editor.init(options); // 初始化对象
    },
    teardown: function() {
        this.obj.destroy(); 
        this.obj = null;
    }
});

test("init", function() {
    //console.dir(this.obj);
    ok("OK");
});

test('testSetTitle', function() {
    var title = 'title234';
    
    // set title
    this.obj.setTitle(title);
    equals(title, this.obj.getTitle());
});

test('testSetContent', function() {
    var content = 'content12312';
    
    // set content
    this.obj.setContent(content);
    equals(content, this.obj.getContent());
});

test('testUpdateValues', function() {
    
    // test data
    var values = {
        title : 'test-title',
        content: 'test-body'
        },
        obj = this.obj;
    
    // TinyMCE will add <p> around
    if (obj.getRTEditor()) {
        values.content = '<p>' + values.content + '</p>';
    }
    
    // set elements values
    obj.updateValues(values);
    equals(obj.getTitle(), values.title);
    equals(obj.getContent(), values.content);
    
    // test getElementsValues();
    var newValues = obj.getValues();
    for (var key in values) {
        equals(newValues[key], values[key]);
    }
});

test('testGetContent', function() {
    var obj = this.obj,
        tinyMCE = this.obj.editor;
        
    if (! tinyMCE) { return; } // no tinyMCE mode
    
    var tinyBody = tinyMCE.getBody(),
        old_content = obj.getContent(),
        content = "<p>new line</p>";
        
    ok(tinyMCE, 'tinyMCE is not null');
    ok(tinyBody, 'tinyHTML is not null');
    ok(old_content, 'old content is not null');
    
    // mock action, write a new line
    $(tinyBody).append(content);
    
    equals(obj.getContent(), old_content + "\n" + content);
});

test('testDoSave', function() {
    stop();
    
    var obj = this.obj,
        newContent = "<p>new content</p>";
    
//    obj.setContent(newContent);
    
    // trigger do save action
    obj.doSave();
    
    setTimeout(function(){
        console.log(obj.getContent());
        
        start();
    }, 500);
    // check request
    
});

//TODO: 因为tinyMCE无法destroy干净, 所以导致同一页面出现了多个残留DOM元素, resize无法进行测试
// iframe>body读取不到height
test('testAutoResize', function() {
    
    var obj = this.obj,
        mce = obj.getRTEditor(),
        oldContent = mce.getContent(),
        newContent = '<p>Hello</p>',
        oldHeight = obj.bodyElem.height();
   
   for (var i = 0; i < 8; i++) {
       newContent += newContent;
   }
   
   //console.log(oldHeight);
   mce.setContent(newContent);
   //console.log(obj.bodyElem.height());
    
    //equals(mce.getContent(), newContent);
    //console.log(mce.getContent());
});

module("Module Pad", {
    setup: function() {
        var options = {
            editor : {
                ajaxSetup : {
                    dataType : null // 此测试没有AJAX的服务器端支持
                }
            }
        }
        // 初始化对象
        this.obj = Ediary.Pad.init(options);
        
    },
    teardown: function() {
        this.obj.destroy();
        this.obj = null;
    }
});

test('testInit', function() {
    
    ok("ok");
    
});
