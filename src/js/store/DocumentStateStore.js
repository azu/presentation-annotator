// LICENSE : MIT
"use strict";
import StateStore from "../flux/StateStore";
import NewDocumentUseCase from "../UseCase/NewDocument/NewDocumentUseCase"
import CompleteLoadingDocumentUseCase from "../usecase/CompleteLoadingDocumentUseCase"
import Document from "../domain/Document/Document"
/*
 StateStore has change condition
 */
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

    [CompleteLoadingDocumentUseCase.name](totalPageNumber) {
        if (this.document.getTotalPageNumber !== totalPageNumber) {
            this.emitChange();
        }
    }
}