// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import DocumentFactory from "../../domain/document/DocumentFactory";
import {UseCase} from "almin";
export class CompleteLoadingDocumentFactory {
    static create() {
        return new CompleteLoadingDocumentUseCase({
            documentRepository
        });
    }
}

export class CompleteLoadingDocumentUseCase extends UseCase {
    /**
     * initialized with DI-able object.
     * Not directly use from View/Component
     * Call via UseCaseController
     */
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
    }

    execute(totalPageNumber) {
        const currentDocument = this.documentRepository.lastUsed();
        if (!currentDocument) {
            return new Error("currentDocument is not found");
        }
        const document = DocumentFactory.create({
            pdfURL: currentDocument.pdfURL,
            totalPageNumber: totalPageNumber
        });
        this.documentRepository.save(document);
    }
}
