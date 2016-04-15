// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Store from "../../src/js/framework/Store";
import UseCase from "../../src/js/framework/UseCase";
describe("UseCase", function () {
    context("when not implemented execute()", function () {
        it("should assert error on constructor", function () {
            class TestUseCase extends UseCase {
            }
            try {
                const useCase = new TestUseCase();
                useCase.execute();
                throw new Error("unreachable");
            } catch (error) {
                assert(error.name === "TypeError");
            }
        });
    });
    describe("#throwError", function () {
        it("should dispatch thought onDispatch event", function (done) {
            class TestUseCase extends UseCase {
                execute() {
                    this.throwError(new Error("error"));
                }
            }
            const testUseCase = new TestUseCase();
            // then
            testUseCase.onDispatch(({type, error}) => {
                assert(error instanceof Error);
                done();
            });
            // when
            testUseCase.execute();
        });
    });
});