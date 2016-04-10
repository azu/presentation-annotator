// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import DocumentStateStore from "./document/DocumentStateStore";
import ExportStateStore from "./exporting/ExportStateStore";
export default class ReadAggregate {
    constructor() {
        /**
         * StateStore array
         * @type {StateStore[]}
         */
        this.states = [
            new DocumentStateStore({documentRepository}),
            new ExportStateStore({documentRepository})
        ];
    }

    /**
     * Return collection of stores's state
     * @returns {Object}
     */
    getState() {
        return Object.assign({}, ...this.states.map(state => state.getState()));
    }
}