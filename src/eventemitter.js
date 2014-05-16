/**
 * Base class of an event emitter.
 * @constructor
 */
function EventEmitter() {
    this.listeners_ = {};
}


/**
 * Returns array of registered callbacks for the given event.
 * @param {string} event
 * @private
 */
EventEmitter.prototype.getListeners_ = function(event) {
    if (!(event in this.listeners_)) {
        this.listeners_[event] = [];
    }

    return this.listeners_[event];
};


/**
 * Registers callback to event.
 * @param {string} event
 * @param {function} callback
 */
EventEmitter.prototype.on = function(event, callback) {
    this.getListeners_(event).push(callback);
};


/**
 * Registers callback to event. Callback should only be fired once.
 * @param {string} event
 * @param {function} callback
 */
EventEmitter.prototype.once = function(event, callback) {
    // Wrap callback in a function that removes this listener when fired.
    var wrapped = function() {
        this.off(event, wrapped);
        return callback.apply(null, arguments);
    }.bind(this);
    wrapped.func = callback;

    this.getListeners_(event).push(wrapped);
};


/**
 * Remove callback for event.
 * @param {string} event
 * @param {function} callback
 */
EventEmitter.prototype.off = function(event, callback) {
    var callbacks = this.getListeners_(event);
    for (var i = 0; i < callbacks.length; i++) {
        var cb = callbacks[i];
        if (cb == callback || cb.func == callback) {
            callbacks.splice(i, 1);
            break;
        }
    }
};


/**
 * Remove all callbacks for event.
 * @param {string} event
 */
EventEmitter.prototype.offAll = function(event) {
    var callbacks = this.getListeners_(event);
    while (callbacks.length) {
        callbacks.pop();
    }
};


/**
 * Emit event.
 * Calls all registered callbacks with the provided arguments
 * @param {string} event
 * @param {...} args Arguments to pass on to the callback.
 */
EventEmitter.prototype.emit = function(event) {
    var callbacks = this.getListeners_(event).slice(0);
    for (var i = 0; i < callbacks.length; i++) {
        var cb = callbacks[i];
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};


/** Aliases for methods. */
EventEmitter.prototype.listen = EventEmitter.prototype.on;
EventEmitter.prototype.listenOnce = EventEmitter.prototype.once;
EventEmitter.prototype.unlisten = EventEmitter.prototype.off;
EventEmitter.prototype.unlistenAll = EventEmitter.prototype.offAll;
EventEmitter.prototype.trigger = EventEmitter.prototype.emit;
