(function($, E) {
    
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

module("Module Tooltip", {
    setup: function() {
        this.obj = Ediary.Tooltip.init();
    },
    teardown: function() {
        //this.obj.destroy();
        this.obj = null;
    }
});

test('testShowTip', function() {
    this.obj.showMessage("message").setType(Ediary.Tooltip.OK);
    
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

test('testI18n', function() {
    
    var pgk = {
        NAME: '名字',
        AGE: '年龄'
    };
    E.i18n.extend('pgk', pgk);
    
    var lang = E.i18n.get('pgk');
    
    ok(typeof lang != 'undefined' && lang != null);
    equals(lang.NAME, pgk.NAME);
    equals(lang.AGE, pgk.AGE);
    
});

test('textInclude', function() {
    var js_files_count = $('script').length;
    expect(1);
    stop();
    
    Ediary.include("js/tiny_mce/tiny_mce.js");
    
    //TODO: 无法延时到js加载 
    setTimeout(function(){
        equals(js_files_count, $('script').length);
        start();
    }, 50);
});

})(jQuery, Ediary);