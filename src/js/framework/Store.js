// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
import UseCase from "./UseCase";
const STATE_CHANGE_EVENT = "STATE_CHANGE_EVENT";
export default class Store extends CoreEventEmitter {
    constructor() {
        super();
        /**
         * @type {string} Store name
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

    /**
     * A UseCase `dispatch` {@link key} with {@link args} and receive the {@link key} with {@link args}
     * @example
     *
     * abcUseCase
     *  .dispatch("ABC", 42)
     *
     * abcStore
     *  .onDispatch("ABC", (value) => {
     *      console.log(value); // 42
     *  });
     *
     * @param {string} key key is specified event key. it is defined in A UseCase
     * @param {function(...args)} handler
     */
    onDispatch(key, handler) {
        assert(typeof key === "string");
        assert(typeof handler === "function");
        this.on(key, handler);
    }

    /**
     * invoke {@link handler} before will execute the {@link useCase}
     * @param {UseCase} useCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onWillExecute(useCase, handler) {
        assert(useCase instanceof UseCase, "useCase should be instance of UseCase: " + useCase);
        return this._dispatcher.on(`${useCase.name}:will`, handler);
    }


    /**
     * invoke {@link handler} after did execute the {@link useCase}
     * @param {UseCase} useCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onDidExecute(useCase, handler) {
        assert(useCase instanceof useCase, "useCase should be instance of UseCase: " + useCase)
        this.queue = this.queue.then(() => {
            this._dispatcher.on(`${useCase.name}:did`, handler)
        });
    }

    /**
     * invoke {@link handler} if the {@link UseCase} throw error.
     * @param {UseCase} useCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onError(useCase, handler) {
        assert(useCase instanceof useCase, "useCase should be instance of UseCase: " + useCase)
        this.queue = this.queue.then(() => {
            this._dispatcher.on(`${useCase.name}:error`, handler)
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