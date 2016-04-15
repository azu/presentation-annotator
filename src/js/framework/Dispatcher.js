// LICENSE : MIT
"use strict";
const assert = require("assert");
const EventEmitter = require("events");
export const ON_DISPATCH = "__DISPATCH_ACTION__";
export const ON_WILL_EXECUTE_EACH_USECASE = "ON_WILL_EXECUTE_EACH_USECASE";
export const ON_DID_EXECUTE_EACH_USECASE = "ON_DID_EXECUTE_EACH_USECASE";

/**
 * payload The payload object that must have `type` property.
 * @typedef {Object} DispatcherPayload
 * @property {String} type The event type to dispatch.
 */
/**
 * Dispatcher is the central event bus system.
 *
 * onDispatch
 * dispatch
 *
 * Almost event pass the (on)dispatch.
 *
 * ## FAQ
 *
 * Q. Why use payload object instead emit(key, ...args).
 * A. It is for optimization and limitation.
 * If apply emit style, we cast ...args for passing other dispatcher at everytime.
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
        this.on(ON_WILL_EXECUTE_EACH_USECASE, handler);
    }

    /**
     * @param {function(useCase: UseCase)} handler
     */
    onDidExecuteEachUseCase(handler) {
        this.on(ON_DID_EXECUTE_EACH_USECASE, handler);
    }


    /**
     * add onAction handler and return unbind function
     * @param {Function} payloadHandler
     * @returns {Function} return unbind function
     */
    onDispatch(payloadHandler) {
        this.on(ON_DISPATCH, payloadHandler);
        return this.removeListener.bind(this, ON_DISPATCH, payloadHandler);
    }

    /**
     * dispatch action object.
     * StoreGroups receive this action and reduce state.
     * @param {DispatcherPayload} payload
     */
    dispatch(payload) {
        assert(payload !== undefined && payload !== null, "payload should not null or undefined");
        assert(typeof payload.type === "string", "payload's type should be string");
        this.emit(ON_DISPATCH, payload);
    }

    dispatchWillExecuteUseCase(useCase) {
        this.emit(ON_WILL_EXECUTE_EACH_USECASE, useCase);

    }

    dispatchDidExecuteUseCase(useCase) {
        this.emit(ON_DID_EXECUTE_EACH_USECASE, useCase);
    }
}