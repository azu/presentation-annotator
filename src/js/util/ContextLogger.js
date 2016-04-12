// LICENSE : MIT
"use strict";
export default class ContextLogger {
    static logDispatch(key, ...args) {
        console.info(`Dispatch:${key}`, ...args);
    }

    /**
     * @param {Store[]} stores
     */
    static logOnChange(stores) {
        stores.forEach(state => {
            if (!state.isChanging) {
                return;
            }
            console.groupCollapsed(`Store:${state.name} is Changed`);
            console.info(state.getState());
            console.groupEnd()
        })
    }
}