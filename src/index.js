// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppContextRepository from "./AppContextRepository";
// store
import ReadAggregate from "./js/read-store/ReadAggregate";
// context
import {Context, Dispatcher}  from "almin";
import AlminLogger from "almin-logger";
// instances
const readAggregate = ReadAggregate.create();
const dispatcher = new Dispatcher();
// context connect dispatch with stores
const appContext = new Context({
    dispatcher,
    store: readAggregate
});
const logger = new AlminLogger();
logger.startLogging(appContext);
// Singleton
AppContextRepository.context = appContext;
// entry point
ReactDOM.render(<App appContext={appContext}/>, document.getElementById("js-app"));