// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
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
export default class Dispatcher extends CoreEventEmitter {
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

    dispatchWillExecuteUseCase(useCase) {
        this.emit(ON_WILL_EXECUTE_EACH_USECASE, useCase);

    }

    dispatchDidExecuteUseCase(useCase) {
        this.emit(ON_DID_EXECUTE_EACH_USECASE, useCase);
    }
}