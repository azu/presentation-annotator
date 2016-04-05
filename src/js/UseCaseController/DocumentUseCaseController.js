// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import CompleteLoadingDocumentUseCase from "../UseCase/CompleteLoadingDocumentUseCase";
import NewDocumentUseCase from "../UseCase/NewDocumentUseCase";
export default class DocumentUseCaseController {
    static CompleteLoadingDocumentUseCase(totalPageNumber) {
        var useCase = new CompleteLoadingDocumentUseCase({documentRepository});
        return useCase.execute(totalPageNumber);
    }

    /**
     * @param {string} pdfURL
     * @returns {function()}
     */
    static NewDocumentUseCase(pdfURL) {
        var useCase = new NewDocumentUseCase({documentRepository});
        return useCase.execute(pdfURL);
    }
}