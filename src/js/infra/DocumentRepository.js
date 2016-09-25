// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import MemoryDB from "./adpter/MemoryDB";
import Document from "../domain/document/Document";
export class DocumentRepository extends EventEmitter {
    constructor(database = new MemoryDB()) {
        super();
        /**
         * @type {MemoryDB}
         */
        this._database = database;
    }

    /**
     * @param id
     * @private
     */
    _get(id) {
        return this._database.get(`${Document.name}.${id}`);
    }

    find(document) {
        return this._get(document.id);
    }

    /**
     * @returns {Document|undefined}
     */
    lastUsed() {
        const document = this._database.get(`${Document.name}.lastUsed`);
        if (!document) {
            return;
        }
        return this._get(document.id);
    }

    /**
     * @param {DocumentModel} document
     */
    save(document) {
        this._database.set(`${Document.name}.lastUsed`, document);
        this._database.set(`${Document.name}.${document.id}`, document);
        this.emit(REPOSITORY_CHANGE, document);
    }

    /**
     * @param {DocumentModel} document
     */
    remove(document) {
        this._database.delete(`${Document.name}.${document.id}`);
        this.emit(REPOSITORY_CHANGE);
    }

    onChange(handler) {
        this.on(REPOSITORY_CHANGE, handler);
    }
}
// singleton
export default new DocumentRepository();
