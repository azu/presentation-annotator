// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import DocumentStore from "./document/DocumentStore";
import ExportingStore from "./exporting/ExportingStore";
import {QueuedStoreGroup} from "almin";
export default class AppStoreGroup {
    /**
     * return a StoreGroup
     * @returns {QueuedStoreGroup}
     */
    static create() {
        return new QueuedStoreGroup([
            new DocumentStore({documentRepository}),
            new ExportingStore({documentRepository})
        ]);
    }
}
