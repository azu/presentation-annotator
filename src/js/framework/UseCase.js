// LICENSE : MIT
"use strict";
const assert = require("assert");
export default class UseCase {
    constructor() {
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
        this._dispatcher.emit(`${this.useCaseName}:will`);
    }

    didExecute() {
        this._dispatcher.emit(`${this.useCaseName}:did`);
    }

    throwError(error) {
        this._dispatcher.emit(`${this.useCaseName}:error`);
    }
}