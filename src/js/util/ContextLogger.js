// LICENSE : MIT
"use strict";
export default class ContextLogger {
    static logDispatch(key, ...args) {
        console.info(`Dispatch:${key}`, ...args);
    }
    static logOnChange(stores) {
        stores.forEach(store => {
            if(typeof store.getState !== "function"){
                return;
            }
            console.info(`Store:${store.constructor.name} is Changed`);
            console.info(store.getState());
        })
    }
}