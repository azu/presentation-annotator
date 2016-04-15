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
         * @private
         */
        this._dispatcher = function () {
            throw new Error("should be overwrite by framework. it is unreached code.");
        };
    }

    /**
     * return state object
     * @return {Object}
     */
    getState() {
        throw new Error("should be implemented Store#getState(): Object");
    }

    /**
     * A UseCase `dispatch` {@link key} with {@link args} and receive the {@link key} with {@link args}
     * @example
     *
     * abcUseCase
     *  .dispatch({
     *      type: "ABC",
     *      value: "value"
     *  })
     *
     * abcStore
     *  .onDispatch(({ type, value }) => {
     *      console.log(type);  // "ABC"
     *      console.log(value); // 42
     *  });
     *
     */
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
     * @returns {function} un-listen event function
     */
    onDispatch(handler) {
        // delegate dispatch
        this.on("INTERNAL_DISPATCH", handler);
        return () => {
            this.removeListener("INTERNAL_DISPATCH", handler);
        }
    }

    /**
     * invoke {@link handler} if the {@link UseCase} throw error.
     * @param {UseCase} useCase
     * @param {Function} handler
     * @returns {Function} return un-listen function
     */
    onError(useCase, handler) {
        assert(useCase instanceof useCase, "useCase should be instance of UseCase: " + useCase);
        this.onDispatch(({type, error}) => {
            if (type === `${this.useCaseName}:error`) {
                handler(error);
            }
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
        this.emit(STATE_CHANGE_EVENT);
    }
};