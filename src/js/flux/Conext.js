// LICENSE : MIT
"use strict";
import {EventEmitter}from "events";
const assert = require("assert");
const CONTEXT_ON_CHANGE = "CONTEXT_ON_CHANGE";
export default class Context extends EventEmitter {
    constructor({dispatcher, stores}) {
        super();
        // state change flag
        this._isChangedStore = false;
        this.dispatcher = dispatcher;
        this.stores = stores;
        this._registerDispatcher(dispatcher);
        stores.forEach(store => this._registerStore(store));
    }

    /**
     * if any store is changed, then call onChangeHandler
     * @param {Function} onChangeHandler
     */
    onChange(onChangeHandler) {
        this.on(CONTEXT_ON_CHANGE, onChangeHandler);
    }

    /**
     * execute UseCase instance.
     * UseCase is a executable object. it means that has `execute` method.
     * @param UseCase
     */
    execute(UseCase, ...args) {
        // debug
        let isCalledAtLeastOne = false;
        const removeDispatchEvent = this.dispatcher.onDispatch(() => {
            isCalledAtLeastOne = true
        });
        assert(typeof UseCase === "function");
        assert(typeof UseCase.create === "function");
        const useCase = UseCase.create();
        // execute and finish =>
        const dispatch = this.dispatcher.dispatch.bind(this.dispatcher);
        const execution = useCase.execute(...args);
        Promise.resolve(execution(dispatch)).then((result) => {
            assert.ok(isCalledAtLeastOne, "should emit at least one action in the UseCase: " + UseCase.name);
            removeDispatchEvent();
        }).catch(error => {
            console.error(error);
        });
    }

    // overwrite point for extension
    // 何かデバッグの時に上書きしやすいような仕組みがあるといいとか
    contextOnDispatch(eventKey, ...args) {
        let isCalledAtLeastOne = false;
        this.stores.forEach(store => {
            if (typeof store[eventKey] === "function") {
                store[eventKey](...args);
                isCalledAtLeastOne = true;
            }
        });
        assert.ok(isCalledAtLeastOne, "should call at least one." + eventKey + " is not registered in anyone stores.");
        // if change any store, emit context on change event
        if (this._isChangedStore) {
            this.emit(CONTEXT_ON_CHANGE);
        }
        this._isChangedStore = false;
    }

    _registerDispatcher(dispatcher) {
        dispatcher.onDispatch(this.contextOnDispatch.bind(this));
    }

    /**
     * @param {StateStore} store
     */
    _registerStore(store) {
        // dirty flag
        // this flag is collected on `contextOnDispatch`
        store.onChange(() => {
            this._isChangedStore = true;
        });
    }

}