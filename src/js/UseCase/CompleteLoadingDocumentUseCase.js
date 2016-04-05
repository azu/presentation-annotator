// LICENSE : MIT
"use strict";
export default class CompleteLoadingDocumentUseCase {
    /**
     * initialized with DI-able object.
     * Not directly use from View/Component
     * Call via UseCaseController
     */
    constructor({documentRepository}) {
        this.documentRepository = documentRepository;
    }

    execute(totalPageNumber) {
        return dispatch => {
            const currentDocument = this.documentRepository.findLatest();
            if (!currentDocument) {
                throw new Error("currentDocument is not found");
            }
            currentDocument.updateTotalPageNumber(totalPageNumber);
            dispatch(this.constructor.name, totalPageNumber);
        };
    }
}