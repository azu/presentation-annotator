// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
import {WILL_EXECUTE_USECASE, DID_EXECUTE_USECASE} from "./Dispatcher";
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

    onDispatch(handler) {
        // delegate dispatch
        this.on("INTERNAL_DISPATCH", ({type, args}) => {
            handler(type, ...args);
        });
    }

    willExecute() {
        this.dispatch(WILL_EXECUTE_USECASE, this);
        this.dispatch(`${this.useCaseName}:will`);
    }

    didExecute() {
        this.dispatch(`${this.useCaseName}:did`);
        this.dispatch(DID_EXECUTE_USECASE, this);
    }

    throwError(error) {
        this.dispatch(`${this.useCaseName}:error`);
    }
}