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
        // central dispatcher
        this._dispatcher = dispatcher;
        this.states = states;
        this.states.forEach(state => this._registerState(state));
    }

    /**
     * return registered array of state
     * @returns {State[]}
     */
    getStates() {
        return this.states;
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

    /**
     * @param {State} state
     */
    _registerState(state) {
        // overwrite private dispatcher for communication with UseCase
        state._dispatcher = this._dispatcher;
        // dirty flag
        let _isChangedStore = false;
        // this flag is collected on `contextOnDispatch`
        state.onChange(() => {
            if (_isChangedStore) {
                return;
            }
            _isChangedStore = true;
            this.emit(CONTEXT_ON_CHANGE);
            _isChangedStore = false;
        });
    }

}