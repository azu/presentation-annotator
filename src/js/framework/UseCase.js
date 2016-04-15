// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
export default class UseCase extends CoreEventEmitter {
    constructor() {
        super();
        /**
         * @type {string} default: UseCase name
         */
        this.name = this.displayName || this.constructor.name;
        /**
         * @type {string} UseCase name
         */
        this.useCaseName = this.constructor.name;
    }

    execute() {
        throw new TypeError(`should be overwrite ${this.constructor.name}#execute()`);
    }


    /**
     * dispatch with payload
     * @param {DispatcherPayload} payload
     */
    dispatch(payload) {
        this.emit("INTERNAL_DISPATCH", payload);
    }

    /**
     *
     * @param {function(payload: DispatcherPayload)} handler
     * @returns {function} un listen event handler function
     */
    onDispatch(handler) {
        // delegate dispatch
        this.on("INTERNAL_DISPATCH", handler);
        return () => {
            this.removeListener("INTERNAL_DISPATCH", handler);
        }
    }

    /**
     * throw error event
     * you can use it instead of `throw new Error()`
     * this error event is caught by dispatcher.
     * @param {Error} error
     */
    throwError(error) {
        this.dispatch({
            type: `${this.useCaseName}:error`,
            error: error
        });
    }
}