/**
 * Base class of an event emitter.
 * @constructor
 */
function EventEmitter() {
    this.listeners_ = {};
    this.onceListeners_ = {};
}


/**
 * Returns array of registered callbacks for the given event.
 * @param {string} event
 * @private
 */
EventEmitter.prototype.getListeners_ = function(event, once) {
    var listeners = once ? this.onceListeners_ : this.listeners_;

    if (!(event in listeners)) {
        listeners[event] = [];
    }

    return listeners[event];
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
    this.getListeners_(event, true /* once */).push(callback);
};


/**
 * Remove callback for event.
 * @param {string} event
 * @param {function} callback
 */
EventEmitter.prototype.off = function(event, callback) {
    var callbacks, idx;

    callbacks = this.getListeners_(event);
    idx = callbacks.indexOf(callback)
    if (idx != -1) {
        callbacks.splice(idx, 1);
    }

    callbacks = this.getListeners_(event, true /* once */);
    idx = callbacks.indexOf(callback)
    if (idx != -1) {
        callbacks.splice(idx, 1);
    }
};


/**
 * Emit event.
 * Calls all registered callbacks with the event as the argument.
 * @param {string} event
 */
EventEmitter.prototype.emit = function(event) {
    var callbacks, callback;

    callbacks = this.getListeners_(event);
    for (var i = 0; i < callbacks.length; i++) {
        callback = callbacks[i];
        callback.call(null, event);
    }

    callbacks = this.getListeners_(event, true /* once */);
    while (callbacks.length) {
        callback = callbacks.pop();
        callback.call(null, event);
    }
};


/** Aliases for methods. */
EventEmitter.prototype.listen = EventEmitter.prototype.on;
EventEmitter.prototype.listenOnce = EventEmitter.prototype.once;
EventEmitter.prototype.unlisten = EventEmitter.prototype.off;
EventEmitter.prototype.trigger = EventEmitter.prototype.emit;
