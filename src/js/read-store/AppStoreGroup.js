// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import DocumentStore from "./document/DocumentStore";
import ExportingStore from "./exporting/ExportingStore";
import { StoreGroup } from "almin";
export default class AppStoreGroup {
    /**
     * return a StoreGroup
     * @returns {StoreGroup}
     */
    static create() {
        return new StoreGroup({
            document: new DocumentStore({ documentRepository }),
            exporting: new ExportingStore({ documentRepository })
        });
    }
}
