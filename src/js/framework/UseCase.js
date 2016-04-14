// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
import {ON_WILL_EXECUTE_EACH_USECASE, ON_DID_EXECUTE_EACH_USECASE} from "./Dispatcher";
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
        throw new Error(`should be overwrite ${this.constructor.name}#execute()`);
    }

    /**
     * dispatch event key with args.
     * @param {string} key
     * @param args
     */
    dispatch(key, ...args) {
        this.emit("INTERNAL_DISPATCH", {
            type: key,
            args
        });
    }

    /**
     * throw error event
     * you can use it instead of `throw new Error()`
     * this error event is caught by dispatcher.
     * @param {Error} error
     */
    throwError(error) {
        this.dispatch(`${this.useCaseName}:error`);
    }


    onDispatch(handler) {
        // delegate dispatch
        this.on("INTERNAL_DISPATCH", ({type, args}) => {
            handler(type, ...args);
        });
    }
}