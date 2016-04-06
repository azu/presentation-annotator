// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppContextRepository from "./AppContextRepository";
// store
import DocumentStateStore from "./js/store/DocumentStateStore";
import ExportStateStore from "./js/store/ExportStateStore";
// context
import AppContext  from "./js/flux/Conext";
import Dispatcher from "./js/flux/Dispatcher";
import ContextLogger from "./js/util/ContextLogger";
// instances
const documentStateStore = new DocumentStateStore();
const exportStateStore = new ExportStateStore();
const dispatcher = new Dispatcher();
// dispatcherとstoresを紐つけるContext
const appContext = new AppContext({
    dispatcher,
    stores: [documentStateStore, exportStateStore]
});
// LOG
dispatcher.onDispatch((key, ...args) => {
    ContextLogger.logDispatch(key, ...args);
});
appContext.onChange(() => {
    ContextLogger.logOnChange(appContext.stores);
});
// Singleton
AppContextRepository.context = appContext;
// entry point
ReactDOM.render(<App
    exportStateStore={exportStateStore}
    documentStateStore={documentStateStore}
/>, document.getElementById("js-app"));