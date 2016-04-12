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
// instances
const readAggregate = new ReadAggregate();
const dispatcher = new Dispatcher();
// context connect dispatch with stores
const appContext = new AppContext({
    dispatcher,
    states: readAggregate.states
});
// LOG
const logMap = {};
dispatcher.onWillExecuteEachUseCase(useCase => {
    const startTimeStamp = performance.now();
    console.group(useCase.name, startTimeStamp);
    logMap[useCase.name] = startTimeStamp;
});
dispatcher.onDispatch((key, ...args) => {
    ContextLogger.logDispatch(key, ...args);
});
appContext.onChange(() => {
    ContextLogger.logOnChange(appContext.states);
});
dispatcher.onDidExecuteEachUseCase(useCase => {
    const startTimeStamp = logMap[useCase.name];
    const takenTime = performance.now() - startTimeStamp;
    console.info("Take time(ms): " + takenTime);
    console.groupEnd(useCase.name);
});

// Singleton
AppContextRepository.context = appContext;
// entry point
ReactDOM.render(<App readAggregate={readAggregate}/>, document.getElementById("js-app"));