// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Context from "../../src/js/framework/Context";
import Dispatcher from "../../src/js/framework/Dispatcher";
describe("Context", function () {
    context("context", function () {
        const dispatcher = new Dispatcher();
        const appContext = new Context({
            dispatcher,
            states: readAggregate.states
        });
    });
    describe("#getStates", function () {
        it("should get a single state from State")
    });
    describe("#onChange", function () {
        it("should called when change some State");
    });
    describe("#useCase", function () {
        it("should return UseCaseExecutor")
    });
});
