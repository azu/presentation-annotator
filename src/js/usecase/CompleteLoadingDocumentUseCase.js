// LICENSE : MIT
"use strict";
import DocumentRepository from "../infra/DocumentRepository";
export default class CompleteLoadingDocumentUseCase {
    constructor({totalPageNumber} = {}) {
        this.totalPageNumber = totalPageNumber;
    }

    /**
     * @param {ContextInUseCase} context
     */
    execute(context) {
        const currentDocument = DocumentRepository.document;
        if (!currentDocument) {
            throw new Error("currentDocument is not found");
        }
        currentDocument.updateTotalPageNumber(this.totalPageNumber);
        context.dispatch(this.constructor.name, this.totalPageNumber);
    }
}