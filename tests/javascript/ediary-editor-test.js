//Ediary.Editor.init();

module("Module Basic", {
    setup: function() {
        var options = {
            ajaxSetup : {
                dataType : null // 此测试没有AJAX的服务器端支持
            }
        }
        // 初始化对象
        this.obj = Ediary.Editor.init(options);
        
    },
    teardown: function() {
        this.obj.destory();
        this.obj = null;
    }
});

test("init", function() {
    console.log(this.obj);
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

test('testSetElementsValues', function() {
    
    // test data
    var values = {
        title : 'test-title',
        content: 'test-body'
        },
        obj = this.obj;
    
    // set elements values
    obj.setElementsValues(values);
    equals(values.content, obj.getContent());
    equals(values.title, obj.getTitle());
    
    // test getElementsValues();
    var newValues = obj.getElementsValues();
    for (var key in values) {
        equals(values[key], newValues[key]);
    }
});

test('testDoSave', function(){
    var obj = this.obj;
    
    // save it
    obj.doSave();
});


test('test', function() {
});

