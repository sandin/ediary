
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

