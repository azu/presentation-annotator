// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import UseCaseExecutor from "../../src/js/framework/UseCaseExecutor";
import UseCase from "../../src/js/framework/UseCase";
import Dispatcher from "../../src/js/framework/Dispatcher";
describe("UseCaseExecutor", function () {
    describe("#execute", function () {
        context("when UseCase is sync", function () {
            it("execute is called", function (done) {
                // given
                class SyncUseCase extends UseCase {
                    execute(value) {
                        this.dispatch({
                            type: SyncUseCase.name,
                            value
                        });
                    }
                }
                const dispatcher = new Dispatcher();
                const expectedValue = "value";
                // then
                dispatcher.onDispatch(({type, value}) => {
                    if (type === SyncUseCase.name) {
                        assert.equal(value, expectedValue);
                        done();
                    }
                });
                // when
                const executor = new UseCaseExecutor(new SyncUseCase(), dispatcher);
                executor.execute(expectedValue);
            });
        });
        context("when UseCase is async", function () {
            it("execute is called", function (done) {
                // given
                class AsyncUseCase extends UseCase {
                    execute(value) {
                        return Promise.resolve().then(() => {
                            this.dispatch({
                                type: AsyncUseCase.name,
                                value
                            });
                        });
                    }
                }
                const dispatcher = new Dispatcher();
                const expectedValue = "value";
                // then
                let isCalledUseCase = false;
                dispatcher.onDispatch(({type, value}) => {
                    if (type === AsyncUseCase.name) {
                        assert.equal(value, expectedValue);
                        isCalledUseCase = true;
                    }
                });
                dispatcher.onDidExecuteEachUseCase(useCase => {
                    if (useCase instanceof AsyncUseCase) {
                        assert(isCalledUseCase);
                        done();
                    }
                });
                // when
                const executor = new UseCaseExecutor(new AsyncUseCase(), dispatcher);
                executor.execute(expectedValue);
            });
        });
    });
});