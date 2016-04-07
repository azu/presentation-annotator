// LICENSE : MIT
"use strict";
import domainEventBus from "../domain/DomainEventBus";
import documentRepository from "../infra/DocumentRepository";
import DocumentStateStore from "./document/DocumentStateStore";
import ExportStateStore from "./exporting/ExportStateStore";
export default class ReadAggregate {
    constructor() {
        /**
         * StateStore array
         * @type {StateStore[]}
         */
        this.stores = [
            new DocumentStateStore({domainEventBus, documentRepository}),
            new ExportStateStore({domainEventBus, documentRepository})
        ];
    }

    /**
     * Return collection of stores's state
     * @returns {Object}
     */
    getState() {
        return Object.assign({}, ...this.stores.map(store => store.getState()));
    }
}