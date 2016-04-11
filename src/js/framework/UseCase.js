// LICENSE : MIT
"use strict";
const assert = require("assert");
import {WILL_EXECUTE_USECASE, DID_EXECUTE_USECASE} from "./Dispatcher";
export default class UseCase {
    constructor() {
        /**
         * @type {string} UseCase name
         */
        this.name = this.displayName || this.constructor.name;
        /**
         * @private
         */
        this._dispatcher = function () {
            throw new Error("should be overwrite by framework. it is unreached code.");
        };
        /**
         * dispatch event key with args.
         * @param {string} key
         * @param args
         */
        this.dispatch = function (key, ...args) {
            throw new Error("should be overwrite by framework. It is unreached code.");
        };

        /**
         * @type {string}
         */
        this.useCaseName = this.constructor.name;
    }

    execute() {
        throw new Error(`should be overwrite ${this.constructor.name}#execute()`);
    }

    willExecute() {
        this._dispatcher.emit(WILL_EXECUTE_USECASE, this);
        this._dispatcher.emit(`${this.useCaseName}:will`);
    }

    didExecute() {
        this._dispatcher.emit(`${this.useCaseName}:did`);
        this._dispatcher.emit(DID_EXECUTE_USECASE, this);
    }

    throwError(error) {
        this._dispatcher.emit(`${this.useCaseName}:error`);
    }
}