// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import Document from "../domain/Document/Document";
export default class NewDocumentUseCase {
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

    /**
     * @param {string} pdfURL
     * @returns {function()}
     */
    execute(pdfURL) {
        return dispatch => {
            const document = new Document({pdfURL});
            this.documentRepository.addDocument(document);
            dispatch(this.constructor.name, document);
        };
    }
}