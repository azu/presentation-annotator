// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import DocumentStateStore from "./document/DocumentStateStore";
import ExportStateStore from "./exporting/ExportStateStore";
import {StoreGroup} from "almin";
export default class ReadAggregate {
    /**
     * return a StoreGroup
     * @returns {StoreGroup}
     */
    static create() {
        return new StoreGroup([
            new DocumentStateStore({documentRepository}),
            new ExportStateStore({documentRepository})
        ]);
    }
}