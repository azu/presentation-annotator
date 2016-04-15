// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import DocumentStateStore from "./document/DocumentStateStore";
import ExportStateStore from "./exporting/ExportStateStore";
export default class ReadAggregate {
    constructor() {
        /**
         * StateStore array
         * @type {Store[]}
         */
        this.stores = [
            new DocumentStateStore({documentRepository}),
            new ExportStateStore({documentRepository})
        ];
    }
}