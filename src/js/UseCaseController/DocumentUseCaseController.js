// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import CompleteLoadingDocumentUseCase from "../usecase/CompleteLoadingDocumentUseCase";
import NewDocumentUseCase from "../usecase/NewDocumentUseCase";
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