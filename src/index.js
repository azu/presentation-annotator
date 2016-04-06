// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppContextRepository from "./AppContextRepository";
// store
import DocumentStateStore from "./js/store/DocumentFormStateStore";
import ExportStateStore from "./js/store/ExportStateStore";
import PageListStateStore from "./js/store/PageListStateStore";
// context
import AppContext  from "./js/flux/Conext";
import Dispatcher from "./js/flux/Dispatcher";
import ContextLogger from "./js/util/ContextLogger";
// instances
const documentStateStore = new DocumentStateStore();
const exportStateStore = new ExportStateStore();
const pageListStateStore = new PageListStateStore();
const dispatcher = new Dispatcher();
// context connect dispatch with stores
const stores = [documentStateStore, exportStateStore, pageListStateStore];
const appContext = new AppContext({
    dispatcher,
    stores: stores
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
ReactDOM.render(<App stores={stores} />, document.getElementById("js-app"));