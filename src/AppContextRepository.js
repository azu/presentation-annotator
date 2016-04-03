// LICENSE : MIT
"use strict";
export class AppContextRepository {
    constructor() {
        /**
         * @type {Context}
         * @private
         */
        this._context = null;
    }

    get context() {
        return this._context;
    }

    set context(newContext) {
        this._context = newContext;
    }
}

export default new AppContextRepository();