// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
const CHANGE_STORE_GROUP = "CHANGE_STORE_GROUP";
import Store from "./Store";
export function validateStore(store) {
    assert(store instanceof Store, "store should be instance of Store");
    assert(store.getState === "function", "Store#getState() should be implemented.\n" +
        "StoreGroup merge values of store*s*.");
}

/**
 * StoreGroup is a **UI** parts of Store.
 * StoreGroup has event queue system.
 * It means that StoreGroup thin out change events of stores.
 * If you want to know all change events, and directly listen {@link Store.onChange}.
 */
export default class StoreGroup extends CoreEventEmitter {
    /**
     * Create StoreGroup
     * @param {Store[]} stores stores are instance of MaterialStore
     */
    constructor(stores) {
        super();
        stores.forEach(validateStore);
        this._onChangeQueue = Promise.resolve();
        /**
         * callable release handlers
         * @type {Function[]}
         * @private
         */
        this._releaseHandlers = [];

        /**
         * array of store that emit change in now!
         * this array is weak-able set.
         * @type {Store[]}
         * @private
         */
        this._currentChangingStores = [];
        /**
         * @type {Store[]}
         */
        this.stores = stores;
        // listen onChange of each store.
        this.stores.forEach(store => this.registerStore(store));
    }

    getState() {
        return Object.assign({}, ...this.stores.map(store => {
            const state = store.getState();
            assert(typeof state == "object", `${store.name}.getState() should return Object`);
            return state;
        }));
    }

    /**
     * register store and listen onChange.
     * If you release store, and do call {@link release} method.
     * @param {Store} store
     */
    registerStore(store) {
        // if anyone store is changed, will call `emitChange()`.
        const releaseHandler = store.onChange(() => {
            this._isAnyOneStoreChanged = true;
            // add change store list in now
            // it is released by `StoreGroup#emitChange`
            this._currentChangingStores.push(store);
            this._onChangeQueue = this._onChangeQueue.then(() => {
                // `requestEmitChange()` is for pushing `emitChange()` to queue.
                this.requestEmitChange();
            }).catch(function onChangeQueueError(error) {
                setTimeout(() => {
                    throw error;
                }, 0);
            });
        });
        this._releaseHandlers.push(releaseHandler);
    }

    /**
     * emitChange if its needed.
     * Implementation Note:
     * - Anyone registered store emitChange, then set `this._isChangedStore` true.
     * - if `this._isChangedStore === true`, then {@link emitChange}().
     */
    requestEmitChange() {
        if (!this._isAnyOneStoreChanged) {
            return;
        }
        this.emitChange();
        this._isAnyOneStoreChanged = false; // reset changed state
    }

    emitChange() {
        // transfer ownership of changingStores to other
        this.emit(CHANGE_STORE_GROUP, this._currentChangingStores.slice());
        // release ownership  of changingStores from StoreGroup
        this._currentChangingStores.length = 0;
    }

    onChange(handler) {
        this.on(CHANGE_STORE_GROUP, handler);
        const releaseHandler = this.removeListener.bind(this, CHANGE_STORE_GROUP, handler);
        this._releaseHandlers.push(releaseHandler);
        return releaseHandler;
    }

    /**
     * release all events handler.
     * You can call this when no more call event handler
     */
    release() {
        this._releaseHandlers.forEach(releaseHandler => releaseHandler());
        this._releaseHandlers.length = 0;
    }
}