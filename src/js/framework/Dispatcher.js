// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
export const ON_DISPATCH = "__DISPATCH_ACTION__";
export const WILL_EXECUTE_USECASE = "DISPATCH_WILL_EXECUTE_USECASE";
export const DID_EXECUTE_USECASE = "DISPATCH_DID_EXECUTE_USECASE";
/**
 * Dispatcher is the central event bus system.
 * All framework's event pass the `Dispatcher`.
 */
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

    // Public global hook point
    /**
     * @param {function(useCase: UseCase)} handler
     */
    onWillExecuteEachUseCase(handler) {
        this.on(WILL_EXECUTE_USECASE, handler);
    }

    onDidExecuteEachUseCase(handler) {
        this.on(DID_EXECUTE_USECASE, handler);
    }


    /**
     * add onAction handler and return unbind function
     * @param {Function} cb
     * @returns {Function} return unbind function
     */
    onDispatch(cb) {
        this.on(ON_DISPATCH, cb);
        return this.removeListener.bind(this, ON_DISPATCH, cb);
    }

    /**
     * dispatch action object.
     * StoreGroups receive this action and reduce state.
     */
    dispatch(eventKey, ...args) {
        this.emit(ON_DISPATCH, eventKey, ...args);
    }
}