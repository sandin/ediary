Ediary.baseUrl = '/test/yiriji/tests/javascript';

module("Module Notice", {
    setup: function() {
        this.obj = Ediary.Notice.init({element: '#notice'});
    },
    teardown: function() {
        this.obj.destroy();
        this.obj = null;
    }
});

test('testShowMessage', function() {
    var obj = this.obj,
        message = "someMessage";
    
    obj.showMessage(message);
    equals(message, obj.element.html());
});


module("Module Ediary", {
    setup: function() {
    },
    teardown: function() {
        Ediary.destroy();
    }
});

test('testLoadModule', function() {
    ok(!Ediary.modules['Validator'].load); // hasn't load yet
    
    Ediary.loadModule("Validator");
    ok(Ediary.modules['Validator'].load); // already loaded now
    
    equals('object', typeof Ediary.Validator);
    ok( Ediary.Validator.getLoginForm() !== null );
});

test('textInclude', function() {
    js_files_count = $('script').length;
    Ediary.include("js/tiny_mce/jquery.tinymce.js");
    
    console.log(jQuery.fn.tinymce);
    equals(js_files_count, $('script').length);
});
