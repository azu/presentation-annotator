// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
const CHANGE_STORE_GROUP = "CHANGE_STORE_GROUP";
export default class StoreGroup extends CoreEventEmitter {
    /**
     * Create StoreGroup
     * @param {Store[]} stores stores are instance of MaterialStore
     */
    constructor(stores) {
        // dirty flag
        this._isChangedStore = false;
        this._onChangeQueue = Promise.resolve();
        this._releaseHandlers = [];
    }

    registerStore(store) {
        // if anyone store is changed, will call `emitChange()`.
        const releaseHandler = state.onChange(() => {
            this._isChangedStore = true;
            // `requestEmitChange()` is for pushing `emitChange()` to queue.
            this._onChangeQueue = this._onChangeQueue.then(() => {
                this.requestEmitChange();
            });
        });
        this._releaseHandlers.push(releaseHandler);
    }

    requestEmitChange() {
        if (!this._isChangedStore) {
            return;
        }
        this.emitChange();
        this._isChangedStore = false; // reset changed state
    }

    emitChange() {
        this.emit(CHANGE_STORE_GROUP);
    }

    onChange(handler) {
        this.on(CHANGE_STORE_GROUP, handler);
        const releaseHandler = this.removeListener.bind(this, CHANGE_STORE_GROUP, cb);
        this._releaseHandlers.push(releaseHandler);
    }

    release() {
        this._releaseHandlers.forEach(releaseHandler => releaseHandler());
        this._releaseHandlers.length = 0;
    }
}