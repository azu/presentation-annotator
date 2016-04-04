// LICENSE : MIT
"use strict";
export default class CompleteLoadingDocumentUseCase {
    constructor({DocumentRepository}) {
        this.DocumentRepository = DocumentRepository;
    }

    execute(totalPageNumber) {
        return dispatch => {
            const currentDocument = this.DocumentRepository.findLatest();
            if (!currentDocument) {
                throw new Error("currentDocument is not found");
            }
            currentDocument.updateTotalPageNumber(totalPageNumber);
            dispatch(this.constructor.name, totalPageNumber);
        };
    }
}