// LICENSE : MIT
"use strict";
export default class ContextLogger {
    static logDispatch(key, ...args) {
        console.info(`Dispatch:${key}`, ...args);
    }

    /**
     * @param {Store[]} states
     */
    static logOnChange(states) {
        states.forEach(state => {
            if (!state.isChinging) {
                return;
            }
            if (typeof state.getState !== "function") {
                return;
            }
            console.groupCollapsed(`Store:${state.name} is Changed`);
            console.info(state.getState());
            console.groupEnd()
        })
    }
}