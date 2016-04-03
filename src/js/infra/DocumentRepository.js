// LICENSE : MIT
"use strict";
import Document from "../domain/Document/Document";
/*
 Ref http://thinkinginobjects.com/2012/08/26/dont-use-dao-use-repository/
 */
export class DocumentRepository {
    constructor() {
        this._documents = [];
        this._currentDocument = null;
    }

    /**
     * @returns {Document}
     */
    findLatest() {
        return this._currentDocument;
    }

    addDocument(document) {
        this._documents.push(document);
        this._currentDocument = document;
    }

    removeDocument(id) {
        const documentForRemove = this._documents.filter(document => {
            return document.id === id;
        });
        documentForRemove.forEach(document => {
            this._documents.splice(document.id, 1);
        });
    }
}
// singleton
export default new DocumentRepository();