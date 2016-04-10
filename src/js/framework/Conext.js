// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const assert = require("assert");
import UseCase from "./UseCase";
import UseCaseExecutor  from "./UseCaseExecutor";
const CONTEXT_ON_CHANGE = "CONTEXT_ON_CHANGE";
export default class Context extends EventEmitter {
    constructor({dispatcher, states}) {
        super();
        // state change flag
        this._isChangedStore = false;
        this._dispatcher = dispatcher;
        this.states = states;
        this._registerDispatcher(dispatcher);
        this.states.forEach(state => this._registerState(state));
    }

    /**
     * if any store is changed, then call onChangeHandler
     * @param {Function} onChangeHandler
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

    // overwrite point for extension
    // 何かデバッグの時に上書きしやすいような仕組みがあるといいとか
    contextOnDispatch(eventKey, ...args) {
        assert(this._dispatcher.hasEvent(eventKey), `Not found registered handler for "${eventKey}". You should register handler at least one`);
        // if change any store, emit context on change event
        console.log("contextOnDispatch");
        if (this._isChangedStore) {
            this.emit(CONTEXT_ON_CHANGE);
        }
        this._isChangedStore = false;
    }

    _registerDispatcher(dispatcher) {
        dispatcher.onDispatch(this.contextOnDispatch.bind(this));
    }

    /**
     * @param {State} state
     */
    _registerState(state) {
        // overwrite private dispatcher for communication with UseCase
        state._dispatcher = this._dispatcher;
        // dirty flag
        // this flag is collected on `contextOnDispatch`
        state.onChange(() => {
            this._isChangedStore = true;
            this.emit(CONTEXT_ON_CHANGE);
        });
    }

}