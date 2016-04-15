// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
import StoreGroup from "./StoreGroup";
import UseCase from "./UseCase";
import UseCaseExecutor  from "./UseCaseExecutor";
const CONTEXT_ON_CHANGE = "CONTEXT_ON_CHANGE";
export default class Context extends CoreEventEmitter {
    /**
     * @param {Dispatcher} dispatcher
     * @param {Store[]} stores
     */
    constructor({dispatcher, stores}) {
        super();
        // central dispatcher
        this._dispatcher = dispatcher;
        /**
         * @type {Store[]}
         */
        this.stores = stores;
        this.storeGroup = new StoreGroup(this.stores);
        // Note: StoreGroup thin out change events of stores.
        // When Multiple stores are change at same time, call change handler at once.
        this.storeGroup.onChange(changingStores => {
            this.emit(CONTEXT_ON_CHANGE, changingStores);
        });
    }

    /**
     * return state value of StoreGroup.
     * @returns {*} states object of stores
     */
    getState() {
        return this.storeGroup.getState();
    }

    /**
     * if anyone store is changed, then call onChangeHandler
     * @param {function(changingStores: Store[])} onChangeHandler
     */
    onChange(onChangeHandler) {
        this.on(CONTEXT_ON_CHANGE, onChangeHandler);
    }

    /**
     * @param {UseCase} useCase
     * @returns {UseCaseExecutor}
     * @example
     *
     * context.useCase(UseCaseFactory.create()).execute(args);
     */
    useCase(useCase) {
        assert(useCase instanceof UseCase, `It should instance of UseCase: ${useCase}`);
        return new UseCaseExecutor(useCase, this._dispatcher);
    }

    /**
     * release all events handler.
     * You can call this when no more call event handler
     */
    release() {
        this.storeGroup.release();
    }
}