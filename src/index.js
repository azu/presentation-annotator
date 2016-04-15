// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppContextRepository from "./AppContextRepository";
// store
import ReadAggregate from "./js/read-store/ReadAggregate";
// context
import AppContext  from "./js/framework/Context";
import Dispatcher from "./js/framework/Dispatcher";
import ContextLogger from "./js/util/ContextLogger";
import UseCaseLocator from "./js/UseCase/UseCaseLocator";
// instances
const readAggregate = new ReadAggregate();
const dispatcher = new Dispatcher();
// context connect dispatch with stores
const appContext = new AppContext({
    dispatcher,
    stores: readAggregate.stores
});
// LOG
const logMap = {};
dispatcher.onWillExecuteEachUseCase(useCase => {
    const startTimeStamp = performance.now();
    console.groupCollapsed(useCase.name, startTimeStamp);
    logMap[useCase.name] = startTimeStamp;
    console.log(`${useCase.name} will execute`);
});
dispatcher.onDispatch(payload => {
    ContextLogger.logDispatch(payload);
});
appContext.onChange(() => {
    ContextLogger.logOnChange(appContext.stores);
});
dispatcher.onDidExecuteEachUseCase(useCase => {
    const startTimeStamp = logMap[useCase.name];
    const takenTime = performance.now() - startTimeStamp;
    console.log(`${useCase.name} did executed`);
    console.info("Take time(ms): " + takenTime);
    console.groupEnd(useCase.name);
});
// Singleton
AppContextRepository.context = appContext;
// entry point
ReactDOM.render(<App appContext={appContext}/>, document.getElementById("js-app"));