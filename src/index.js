// LICENSE : MIT
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/container/App";
import AppContextRepository from "./AppContextRepository";
// store
import DocumentStateStore from "./js/store/DocumentStateStore";
// context
import AppContext  from "./js/flux/Conext";
import Dispatcher from "./js/flux/Dispatcher";
// instances
const documentStateStore = new DocumentStateStore();
const dispatcher = new Dispatcher();
// dispatcherとstoresを紐つけるContext
const appContext = new AppContext({
    dispatcher,
    stores: [documentStateStore]
});
// Singleton
AppContextRepository.context = appContext;
// entry point
ReactDOM.render(<App documentStateStore={documentStateStore}/>, document.getElementById("js-app"));