// LICENSE : MIT
"use strict";
import DocumentRepository from "../infra/DocumentRepository";
import CompleteLoadingDocumentUseCase from "../usecase/CompleteLoadingDocumentUseCase";
import NewDocumentUseCase from "../usecase/NewDocumentUseCase";
export default class DocumentUseCaseController {
    static CompleteLoadingDocumentUseCase(totalPageNumber) {
        var useCase = new CompleteLoadingDocumentUseCase({DocumentRepository});
        return useCase.execute(totalPageNumber);
    }

    static NewDocumentUseCase(pdfURL) {
        var useCase = new NewDocumentUseCase({DocumentRepository});
        return useCase.execute(pdfURL);
    }
}