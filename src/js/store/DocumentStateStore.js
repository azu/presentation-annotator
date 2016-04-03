// LICENSE : MIT
"use strict";
import StateStore from "../flux/StateStore";
import NewDocumentUseCase from "../usecase/NewDocumentUseCase"
import Document from "../domain/Document/Document"
export default class CurrentVideoStore extends StateStore {
    constructor() {
        super();
        this.document = new Document();
    }

    getState() {
        return {
            document: this.document
        }
    }

    [NewDocumentUseCase.name](document) {
        this.document = document;
        this.emitChange();
    }
}