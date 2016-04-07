// LICENSE : MIT
"use strict";
import {EventEmitter} from "events";
export const DISPATCH_ACTION = "__DISPATCH_ACTION__";
export const DISPATCH_ACTION_BEFORE = "__DISPATCH_ACTION_BEFORE__";
export const DISPATCH_ACTION_AFTER = "__DISPATCH_ACTION_AFTER__";
export default class Dispatcher extends EventEmitter {
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