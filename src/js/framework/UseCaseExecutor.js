// LICENSE : MIT
"use strict";
const assert = require("assert");
import {WILL_EXECUTE_USECASE, DID_EXECUTE_USECASE} from "./Dispatcher";
import UseCase from "./UseCase";
export default class UseCaseExecutor {
    /**
     * @param {UseCase} useCase
     * @param {*} dispatcher
     */
    constructor(useCase, dispatcher) {
        // execute and finish =>
        const useCaseName = useCase.constructor.name;
        assert(typeof useCaseName !== "undefined" && typeof useCaseName === "string", "UseCase instance should have constructor.name " + useCase);
        assert(typeof useCase.execute === "function", `UseCase instance should have #execute function: ${useCaseName}`);
        this.useCaseName = useCaseName;
        this.useCase = useCase;
        // UseCase => UseCaseExecutor => Dispatcher
        // delegate System event to dispatch
        this.useCase.on(WILL_EXECUTE_USECASE, (useCase) => {
            dispatcher.emit(WILL_EXECUTE_USECASE, useCase);
        });
        this.useCase.on(DID_EXECUTE_USECASE, (useCase) => {
            dispatcher.emit(DID_EXECUTE_USECASE, useCase);
        });
        // delegate userCase#onDispatch to central dispatcher
        this.useCase.onDispatch((key, ...args) => {
            dispatcher.dispatch(key, ...args);
        });
    }

    /**
     * execute UseCase instance.
     * UseCase is a executable object. it means that has `execute` method.
     * @param args
     */
    execute(...args) {
        this.useCase.willExecute();
        return Promise.resolve(this.useCase.execute(...args)).then(() => {
            this.useCase.didExecute();
        }).catch(error => {
            this.useCase.throwError(error);
            return Promise.reject(error);
        });
    }
}