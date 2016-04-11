// LICENSE : MIT
"use strict";
import {EventEmitter} from "events";
import UseCase from "./UseCase";
const STATE_CHANGE_EVENT = "STATE_CHANGE_EVENT";
export default class State extends EventEmitter {
    constructor() {
        super();
        /**
         * @type {string} State name
         */
        this.name = this.displayName || this.constructor.name;

        /**
         * isChanging flag that is on when emit change
         * @type {boolean}
         */
        this.isChinging = false;
        /**
         * @private
         */
        this._dispatcher = function () {
            throw new Error("should be overwrite by framework. it is unreached code.");
        };
        this.queue = Promise.resolve();
    }

    // Communication with UseCase
    /**
     * invoke {@link handler} before will execute the {@link useCase}
     * @param {UseCase} UseCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onWillExecute(UseCase, handler) {
        return this._dispatcher.on(`${UseCase.name}:will`, handler);
    }

    // TODO: more?
    onExecute(UseCase, handler) {
        this.queue = this.queue.then(() => {
            this._dispatcher.on(`${UseCase.name}`, handler)
        });
    }

    /**
     * invoke {@link handler} after did execute the {@link useCase}
     * @param {UseCase} UseCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onDidExecute(UseCase, handler) {
        this.queue = this.queue.then(() => {
            this._dispatcher.on(`${UseCase.name}:did`, handler)
        });
    }

    /**
     * invoke {@link handler} if the {@link UseCase} throw error.
     * @param {UseCase} UseCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onError(UseCase, handler) {
        this.queue = this.queue.then(() => {
            this._dispatcher.on(`${UseCase.name}:error`, handler)
        });
    }

    /**
     * subscribe change event of the state(own).
     * if emit change event, then call registered event handler function
     * @param {Function} cb
     * @returns {Function} return unbind function
     */
    onChange(cb) {
        this.on(STATE_CHANGE_EVENT, cb);
        return this.removeListener.bind(this, STATE_CHANGE_EVENT, cb);
    }

    /**
     * emit change event to subscribers
     */
    emitChange() {
        this.isChinging = true;
        this.emit(STATE_CHANGE_EVENT);
        this.isChinging = false;
    }
};