// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppLocator from "./AppLocator";
// store
import AppStoreGroup from "./js/read-store/AppStoreGroup";
// context
import {Context, Dispatcher}  from "almin";
import AlminLogger from "almin-logger";
// instances
const appStore = AppStoreGroup.create();
const dispatcher = new Dispatcher();
// context connect dispatch with stores
const appContext = new Context({
    dispatcher,
    store: appStore
});
const logger = new AlminLogger();
logger.startLogging(appContext);
// Singleton
AppLocator.context = appContext;
// entry point
ReactDOM.render(<App appContext={appContext}/>, document.getElementById("js-app"));
