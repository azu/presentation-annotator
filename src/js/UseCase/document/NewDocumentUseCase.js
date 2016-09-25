// LICENSE : MIT
"use strict";
import EmptyDocument from "../../domain/document/EmptyDocument";
import documentRepository from "../../infra/DocumentRepository";
import {UseCase} from "almin";
export class NewDocumentFactory {
    static create() {
        return new NewDocumentUseCase({
            documentRepository
        });
    }
}

export class NewDocumentUseCase extends UseCase {
    /**
     * initialized with DI-able object.
     * Not directly use from View/Component
     * Call via UseCaseController
     */
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
    }

    /**
     * @param {string} pdfURL
     * @returns {function()}
     */
    execute(pdfURL) {
        const emptyDocument = new EmptyDocument({pdfURL});
        this.documentRepository.save(emptyDocument);
    }
}
