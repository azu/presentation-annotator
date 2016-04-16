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

class ThrowUseCase extends UseCase {
    execute() {
        this.dispatch({
            type: "update",
            value: "value"
        });
        this.throwError(new Error("test"));
    }
}
describe("Context", function () {
    describe("dispatch in UseCase", function () {
        it("should dispatch Store", function (done) {
            const dispatcher = new Dispatcher();
            const DISPATCHED_EVENT = {
                type: "update",
                value: "value"
            };
            // then
            class DispatchUseCase extends UseCase {
                execute() {
                    this.dispatch(DISPATCHED_EVENT);
                }
            }
            class ReceiveStore extends Store {
                constructor() {
                    super();
                    this.onDispatch(payload => {
                        assert.deepEqual(payload, DISPATCHED_EVENT);
                        done();
                    });
                }
            }
            // when
            const stores = [new ReceiveStore()];
            const appContext = new Context({
                dispatcher,
                stores: stores
            });
            appContext.useCase(new DispatchUseCase()).execute();
        });
    });
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
            const useCaseExecutor = appContext.useCase(new ThrowUseCase());
            assert(useCaseExecutor instanceof UseCaseExecutor);
            useCaseExecutor.execute();
        });
    });
});
