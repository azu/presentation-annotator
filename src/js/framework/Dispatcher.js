// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
export const DISPATCH_ACTION = "__DISPATCH_ACTION__";
export const DISPATCH_ACTION_BEFORE = "__DISPATCH_ACTION_BEFORE__";
export const DISPATCH_ACTION_AFTER = "__DISPATCH_ACTION_AFTER__";
export default class Dispatcher extends EventEmitter {
    /**
     * has event of type at least one
     * @param type
     * @returns {boolean}
     */
    hasEvent(type) {
        const listenerCount = (typeof this.listenerCount !== "undefined")
            ? this.listenerCount.bind(this) // Node 4.x >=
            : EventEmitter.listenerCount.bind(EventEmitter, this);// Node 0.12
        return listenerCount(type) > 0;
    }

    /**
     * add onAction handler and return unbind function
     * @param {Function} cb
     * @returns {Function} return unbind function
     */
    onDispatch(cb) {
        this.on(DISPATCH_ACTION, cb);
        return this.removeListener.bind(this, DISPATCH_ACTION, cb);
    }

    /**
     * dispatch action object.
     * StoreGroups receive this action and reduce state.
     */
    dispatch(eventKey, ...args) {
        this.emit(DISPATCH_ACTION_BEFORE, eventKey, ...args);
        this.emit(DISPATCH_ACTION, eventKey, ...args);
        this.emit(DISPATCH_ACTION_AFTER, eventKey, ...args);
    }
}