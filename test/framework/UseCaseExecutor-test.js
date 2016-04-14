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
                        this.dispatch(SyncUseCase.name, value);
                    }
                }
                const dispatcher = new Dispatcher();
                const expectedValue = "value";
                // then
                dispatcher.onDispatch((key, value) => {
                    if (key === SyncUseCase.name) {
                        assert.equal(value, expectedValue);
                        done();
                    }
                });
                // when
                const executor = new UseCaseExecutor(new SyncUseCase(), dispatcher);
                executor.execute(expectedValue);
            });
        });
    });
});