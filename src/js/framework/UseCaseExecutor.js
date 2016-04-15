// LICENSE : MIT
"use strict";
const assert = require("assert");
import Dispatcher, {ON_WILL_EXECUTE_EACH_USECASE, ON_DID_EXECUTE_EACH_USECASE} from "./Dispatcher";
import UseCase from "./UseCase";
export default class UseCaseExecutor {
    /**
     * @param {UseCase} useCase
     * @param {Dispatcher} dispatcher
     */
    constructor(useCase, dispatcher) {
        // execute and finish =>
        const useCaseName = useCase.constructor.name;
        assert(typeof useCaseName !== "undefined" && typeof useCaseName === "string", "UseCase instance should have constructor.name " + useCase);
        assert(typeof useCase.execute === "function", `UseCase instance should have #execute function: ${useCaseName}`);
        /**
         * @type {string} useCase name
         */
        this.useCaseName = useCaseName;
        /**
         * @type {UseCase} executable useCase
         */
        this.useCase = useCase;
        /**
         * @type {Dispatcher}
         */
        this.dispatcher = dispatcher;
        /**
         * callable release handlers that are called in release()
         * @type {Function[]}
         * @private
         */
        this._releaseHandlers = [];
        // delegate userCase#onDispatch to central dispatcher
        const unListenHandler = this.useCase.onDispatch(payload => {
            this.dispatcher.dispatch(payload);
        });
        this._releaseHandlers.push(unListenHandler);
    }

    willExecute() {
        // emit event for System
        this.dispatcher.dispatchWillExecuteUseCase(this.useCase);
    }

    didExecute() {
        // emit event for Store
        this.dispatcher.dispatchDidExecuteUseCase(this.useCase);
    }

    /**
     * execute UseCase instance.
     * UseCase is a executable object. it means that has `execute` method.
     * @param args
     */
    execute(...args) {
        this.willExecute();
        return Promise.resolve(this.useCase.execute(...args)).then(() => {
            this.didExecute();
            this.release();
        }).catch(error => {
            this.useCase.throwError(error);
            this.didExecute();
            this.release();
            return Promise.reject(error);
        });
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