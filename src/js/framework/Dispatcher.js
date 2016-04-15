// LICENSE : MIT
"use strict";
const assert = require("assert");
const EventEmitter = require("events");
export const ON_DISPATCH = "__DISPATCH_ACTION__";
export const ON_WILL_EXECUTE_EACH_USECASE = "ON_WILL_EXECUTE_EACH_USECASE";
export const ON_DID_EXECUTE_EACH_USECASE = "DISPATCH_DID_EXECUTE_USECASE";

/**
 * payload The payload object that must have `type` property.
 * @typedef {Object} DispatcherPayload
 * @property {String} type The event type to dispatch.
 */
/**
 * Dispatcher is the central event bus system.
 * All framework's event pass the `Dispatcher`.
 *
 * These are Core API.
 *
 * onDispatch
 * dispatch
 *
 * all event pass the (on)dispatch.
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
        this.onDispatch(({type, useCase}) => {
            if (type === ON_DID_EXECUTE_EACH_USECASE) {
                handler(useCase);
            }
        });
    }

    /**
     * @param {function(useCase: UseCase)} handler
     */
    onDidExecuteEachUseCase(handler) {
        this.onDispatch(({type, useCase}) => {
            if (type === ON_DID_EXECUTE_EACH_USECASE) {
                handler(useCase);
            }
        });
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
        this.dispatch({
            type: ON_WILL_EXECUTE_EACH_USECASE,
            useCase
        });

    }

    dispatchDidExecuteUseCase(useCase) {
        this.dispatch({
            type: ON_DID_EXECUTE_EACH_USECASE,
            useCase
        });
    }
}