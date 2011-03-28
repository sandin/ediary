(function($, window) {
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
            saveUrl: Ediary.baseUrl + '/data/diary.php?op=doSave', 
         };
        this.obj = Ediary.Editor.init(options); // 初始化对象
        
        stop();
        setTimeout(function(){ start(); }, 50); // wait for tinyMCE  
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
    expect(1);
    var title = 'title234';
    
    // set title
    this.obj.setTitle(title);
    equals(title, this.obj.getTitle());
});

test('testSetConntent', function() {
    expect(1);
    var content = 'content' + $.now();
    
    // set content
    this.obj.setContent(content);
    equals(this.obj.getContent(), '<p>' + content + '</p>');
});

test('testRepaint', function() {
    expect(4);
    
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
    obj.repaint(values);
    equals(obj.getTitle(), values.title);
    equals(obj.getContent(), values.content);
    
    // test getElementsValues();
    var newValues = obj.getValues();
    for (var key in values) {
        equals(newValues[key], values[key]);
    }
});

test('testSetId', function() {
    expect(2);
    
    var obj = this.obj, id = "123";
    
    obj.setId(id);
    equals($(obj.settings.idElem).val(), id);
    equals(obj.getId(), id);
    
})

test('testGetContent', function() {
    expect(4);
    
    var obj = this.obj,
        rte = obj.getRTEditor(),
        tinyBody = rte.getBody(),
        content = "<p>new line</p>";
        
    rte.save();
    var old_content = obj.bodyElem.val();
    
    ok(rte != null, 'tinyMCE is not null');
    ok(tinyBody != null, 'tinyHTML is not null');
    ok(old_content != null, 'old content is not null');
    
    // mock action, write a new line
    $(tinyBody).append(content);
    
    //TODO: 因为 old_content 总是取不到正确的值 "<p> </p>" , 而是为空, 所以这行无法断言.
    //same(obj.getContent(), old_content + "\n" + content);
    ok(obj.getContent().length >  old_content.length);
});

test('testIsEmpty', function() {
    expect(2);
    
    var obj = this.obj;
    ok(obj.isEmpty(), 'is Empty at first'); 
    
    // mock
    obj.titleElem.val("set title");
    obj.bodyElem.val("set body");
    
    ok(!obj.isEmpty(), 'it\'s not empty now');
});

test('testIsChaned', function() {
    expect(6);
    
    var obj = this.obj;
    
    // reset title/content
    function reset() {
        obj.titleElem.val("");
        obj.setContent('');
    }
    
    equals(obj.titleLength, obj.getTitle().length, 'title length is right');
    equals(obj.contentLength, obj.getContent().length, 'content length is right.');
    
    // setup default value
    obj.titleElem.val("title");
    obj.setContent('content');
    ok(obj.isChanged(), 'title and content both changed.');
    reset();
    
    // just change title
    obj.titleElem.val("title");
    ok(obj.isChanged(), 'just title changed');
    reset();
    
    // reset title
    ok(!obj.isChanged(), 'title reset, seem like no change.');
    
    // just change content
    obj.setContent('content-change');
    obj.rteSave(); // save content into the textarea
    //console.log('d', obj.getContent(), obj.contentLength);
    ok(obj.isChanged(), 'just content changed');
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

test('testCache', function() {
    expect(1);
    
    var obj = this.obj,
        cache = {diary: {content: 'content'}};
    
    obj.cache('diary', cache);
    same(obj.getCache('diary'), cache);
});

// 异步测试:
// 模拟API服务器: "./data/diary.php"
// 测试中的数据来源于模拟API服务器中定义的数据
var response = { // 该测试数据需要和 diary.php 中的数据同步
    diary :  {
        title : 'diary_title',
        content : 'diary_content',
        id : '123'
    },
   callback : 'updateId'
};

test('testDoSave', function() {
    expect(3);
    stop();
    
    var obj = this.obj,
        ajaxCount = 0;
        newContent = "<p>new content</p>";
    
    //obj.doSave(); // will not post data, Case's content is not change.
    
    // trigger do save action
    obj.setContent(newContent);
    obj.doSave();
    
    // test repaint
    /* depend addListener()
    obj.addListener('onSaveSuccess', function() {
        equals(obj.getContent(),  serverResponse);
        start();
    });
    */
    
    setTimeout(function(){
        // check cache flush
        var diaryCache = obj.getCache('diary');
        ok(diaryCache !== null);
        equals(diaryCache.content,  response.diary.content);
        
        // check callback
        equals($(obj.settings.idElem).val(), diaryCache.id + "");
        
        start();
    }, 100);
    
});

test('testDoSaveOnFail', function() {
    expect(1);
    stop();
    
    var E = Ediary, obj = this.obj;
    
    obj.settings.saveUrl = E.baseUrl + '/data/diary.php?op=doSave&haserror=1'; 
    obj.doSave(true);
    
    setTimeout(function() {
        equals(E.Notice.getMessage(), E.i18n.get('Editor').JSON_PARSE_ERROR);
        start();
    }, 100);
    
});

test('testGetDiary', function() {
    expect(3);
    stop();
    
    var E = Ediary, obj = this.obj;
    
    obj.settings.getDiaryUrl = E.baseUrl + '/data/diary.php?op=getDiary'; 
    obj.doGetDiary();
    
    setTimeout(function() {
        equals(obj.getTitle(), response.diary.title);
        equals(obj.getContent(), '<p>' + response.diary.content + '</p>');
        equals(obj.getId(), response.diary.id);
        
        start();
    }, 200);
    
    
});


// MODULE PAD
module("Module Pad", {
    setup: function() {
    },
    teardown: function() {
    }
});

test('testInit', function() {
});

})(jQuery, window);