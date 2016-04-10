// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppContextRepository from "./AppContextRepository";
// store
import ReadAggregate from "./js/read-store/ReadAggregate";
// context
import AppContext  from "./js/framework/Conext";
import Dispatcher, {DISPATCH_ACTION_BEFORE, DISPATCH_ACTION_AFTER} from "./js/framework/Dispatcher";
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
dispatcher.on(DISPATCH_ACTION_BEFORE, (key) => {
    const startTimeStamp = performance.now();
    console.group(key, startTimeStamp);
    logMap[key] = startTimeStamp;
});
dispatcher.onDispatch((key, ...args) => {
    ContextLogger.logDispatch(key, ...args);
});
appContext.onChange(() => {
    ContextLogger.logOnChange(appContext.states);
});
dispatcher.on(DISPATCH_ACTION_AFTER, (key) => {
    const startTimeStamp = logMap[key];
    const takenTime = performance.now() - startTimeStamp;
    console.info("Take time(ms): " + takenTime);
    console.groupEnd();
});

// Singleton
AppContextRepository.context = appContext;
// entry point
ReactDOM.render(<App readAggregate={readAggregate}/>, document.getElementById("js-app"));