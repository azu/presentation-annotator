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
        // delegate userCase#onDispatch to central dispatcher
        this.useCase.onDispatch((key, ...args) => {
            this.dispatcher.dispatch(key, ...args);
        });
    }

    willExecute() {
        // emit event for System
        this.dispatcher.dispatch(ON_WILL_EXECUTE_EACH_USECASE, this.useCase);
        // emit event for Store
        this.dispatcher.dispatch(`${this.useCaseName}:will`);
    }

    didExecute() {
        // emit event for System
        this.dispatcher.dispatch(`${this.useCaseName}:did`);
        // emit event for Store
        this.dispatcher.dispatch(ON_DID_EXECUTE_EACH_USECASE, this.useCase);
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
        }).catch(error => {
            this.useCase.throwError(error);
            return Promise.reject(error);
        });
    }
}