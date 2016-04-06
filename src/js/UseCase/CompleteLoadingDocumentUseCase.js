// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
export default class CompleteLoadingDocumentUseCase {
    static create() {
        return new this({documentRepository});
    }

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