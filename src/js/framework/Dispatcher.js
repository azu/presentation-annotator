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
 * Dispatcher is the **central** event bus system.
 *
 * also have these method.
 *
 * - onDispatch(payloadHandler): Function
 * - dispatch(payload): void
 *
 * Almost event pass the (on)dispatch.
 *
 * ## FAQ
 *
 * Q. Why use payload object instead emit(key, ...args).
 * A. It is for optimization and limitation.
 * If apply emit style, we cast ...args for passing other dispatcher at every time.
 */
export default class Dispatcher extends CoreEventEmitter {
    // Public global hook point
    /**
     * called the {@link handler} with useCase when the useCase will do.
     * @param {function(useCase: UseCase)} handler
     */
    onWillExecuteEachUseCase(handler) {
        this.on(ON_WILL_EXECUTE_EACH_USECASE, handler);
    }

    /**
     * called the {@link handler} with useCase when the useCase is done.
     * @param {function(useCase: UseCase)} handler
     */
    onDidExecuteEachUseCase(handler) {
        this.on(ON_DID_EXECUTE_EACH_USECASE, handler);
    }

    /**
     * dispatch the method when {@link useCase} will do.
     * @param {UseCase} useCase
     */
    dispatchWillExecuteUseCase(useCase) {
        this.emit(ON_WILL_EXECUTE_EACH_USECASE, useCase);

    }

    /**
     * dispatch the method when {@link useCase} is done.
     * @param {UseCase} useCase
     */
    dispatchDidExecuteUseCase(useCase) {
        this.emit(ON_DID_EXECUTE_EACH_USECASE, useCase);
    }
}