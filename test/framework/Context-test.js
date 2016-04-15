// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Context from "../../src/js/framework/Context";
import Dispatcher from "../../src/js/framework/Dispatcher";
import Store from "../../src/js/framework/Store";
import UseCase from "../../src/js/framework/UseCase";
import UseCaseExecutor from "../../src/js/framework/UseCaseExecutor";

class TestStore extends Store {
    constructor(echo) {
        super();
        this.echo = echo;
    }

    getState() {
        return this.echo;
    }
}

class TestUseCase extends UseCase {
    execute() {
        this.dispatch({
            type: "update",
            value: "value"
        });
        this.throwError(new Error("test"));
        return Promise.resolve().then(() => {
        });
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
        it("should called when change some State", function (done) {
            const dispatcher = new Dispatcher();
            const testStore = new TestStore({"1": 1});
            const appContext = new Context({
                dispatcher,
                stores: [testStore]
            });
            appContext.onChange((stores) => {
                assert.equal(stores.length, 1);
                assert(stores[0] === testStore);
                done();
            });
            testStore.emitChange();
        });
        it("should thin change events are happened at same time", function (done) {
            const dispatcher = new Dispatcher();
            const aStore = new TestStore({"1": 1});
            const bStore = new TestStore({"1": 1});
            const appContext = new Context({
                dispatcher,
                stores: [aStore, bStore]
            });
            appContext.onChange((stores) => {
                assert(stores.length, 2);
                done();
            });
            // multiple change event at same time.
            aStore.emitChange();
            bStore.emitChange();
        });
    });
    describe("#useCase", function () {
        it("should return UseCaseExecutor", function () {
            const dispatcher = new Dispatcher();
            const appContext = new Context({
                dispatcher,
                stores: []
            });
            const useCaseExecutor = appContext.useCase(new TestUseCase());
            assert(useCaseExecutor instanceof UseCaseExecutor);
            useCaseExecutor.execute();
        });
    });
});
