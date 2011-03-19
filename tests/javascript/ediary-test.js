module("Module Notice", {
    setup: function() {
        this.obj = Ediary.Notice.init({element: '#notice'});
    },
    teardown: function() {
        this.obj.destory();
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
        Ediary.destory();
    }
});

test('testLoadModule', function() {
    ok(!Ediary.modules['Validator'].load); // hasn't load yet
    
    Ediary.loadModule("Validator");
    ok(Ediary.modules['Validator'].load); // already loaded now
    
    equals('object', typeof Ediary.Validator);
    ok( Ediary.Validator.getLoginForm() !== null );
});