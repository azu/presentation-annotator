// LICENSE : MIT
"use strict";
import UseCaseLocator from "../UseCase/UseCaseLocator";
export default class ReplayRecorder {
    constructor() {
        this.logs = [];
    }

    log(payload) {
        this.logs.push(payload);
    }

    getLogs() {
        return this.logs;
    }

    replay(payloadList) {
        payloadList.reduce((promise, payload) => {
            return promise.then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const Factory = UseCaseLocator.getFactory(payload.type);
                        const useCase = Factory.create();
                        console.log(...payload.args);
                        appContext.useCase(useCase).execute(...payload.args);
                        resolve();
                    }, 10);
                });
            });
        }, Promise.resolve());
    }
}