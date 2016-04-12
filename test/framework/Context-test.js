// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Context from "../../src/js/framework/Context";
import Dispatcher from "../../src/js/framework/Dispatcher";
import Store from "../../src/js/framework/Store";

class TestStore extends Store {
    constructor(echo) {
        super();
        this.echo = echo;
    }

    getState() {
        return this.echo;
    }
}
describe("Context", function () {
    describe("#getStates", function () {
        it("should get a single state from State", function () {
            const dispatcher = new Dispatcher();
            const expectedMergedObject = {
                "1": 1,
                "key": "value"
            };
            const stores = [new TestStore({"1": 1}), new TestStore({"key": "value"})];
            const appContext = new Context({
                dispatcher,
                stores: stores
            });
            const states = appContext.getState();
            assert.deepEqual(states, expectedMergedObject);
        });
    });
    describe("#onChange", function () {
        it("should called when change some State");
    });
    describe("#useCase", function () {
        it("should return UseCaseExecutor")
    });
});
