/**
 * Class Events & Class Listener
 * 
 * Example: 
 * ------------------------
 * var obj = {
 *    events : new Events(),
 * 
 *    click : function() {
 *      this.events.callListener("onClick");
 *    }
 * }
 * 
 * obj.addListener('onClick', new Listener() {
 *    // Handler click event
 * });
 * ------------------------
 * 
 * @author lds
 */
;(function($, E, window) {
    
Ediary.extend('Events', function(E) {

    var Events = function() {
        // A list of listeners
        this.listeners = {};
    }
    Events.prototype = {
        
        /**
         * add listener
         */
        addListener: function(name, listener) {
            if (typeof this.listeners[name] == 'undefined') {
                this.listeners[name] = [];
            }
            this.listeners[name].push(listener);
        },
        
        /**
         * call listener
         * 
         * @param String handler name
         * @param Object event
         */
        callListener: function(name, args) {
            var listeners = this.listeners[name];
            if (listeners) {
                for (var i in listeners) {
                    listeners[i].handleEvent(args);
                }
            }
        }, 
        
        /** @deprecated */
        prepareArguments: function(args) {
        }
    };

    var Listener = function(handler) {
        this.handler = handler;
    };
    Listener.prototype = {
        /**
         * Event Handler
         * @param Object event
         */
        handleEvent : function(args) {
            this.handler.apply(this, args);
        },
        
        makeArgs: function(obj) {
            
        }
    };

    // NAMESPACE
    E.Events = Events;
    E.Listener = Listener;

});

})(jQuery, Ediary, window);