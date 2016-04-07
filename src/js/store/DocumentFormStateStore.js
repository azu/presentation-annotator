// LICENSE : MIT
"use strict";
import StateStore from "../flux/StateStore";
import NewDocumentUseCase from "../UseCase/NewDocument/NewDocumentUseCase"
import Document from "../domain/Document/Document"
export default class DocumentFormStateStore extends StateStore {
    constructor() {
        super();
        this.document = new Document();
    }

    getState() {
        return {
            formDocument: this.document
        }
    }

    [NewDocumentUseCase.name](document) {
        this.document = document;
        this.emitChange();
    }
}