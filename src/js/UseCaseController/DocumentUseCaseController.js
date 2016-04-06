// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import CompleteLoadingDocumentUseCase from "../UseCase/CompleteLoadingDocumentUseCase";
import NewDocumentUseCase from "../UseCase/NewDocumentUseCase";
import UpdatePageNoteUseCase from "../UseCase/UpdatePageNoteUseCase";
export default class DocumentUseCaseController {
    static CompleteLoadingDocumentUseCase(totalPageNumber) {
        const useCase = new CompleteLoadingDocumentUseCase({documentRepository});
        return useCase.execute(totalPageNumber);
    }

    /**
     * @param {string} pdfURL
     * @returns {function()}
     */
    static NewDocumentUseCase(pdfURL) {
        const useCase = new NewDocumentUseCase({documentRepository});
        return useCase.execute(pdfURL);
    }

    /**
     * @param note
     * @param pageNumber
     * @returns {function()}
     */
    static UpdatePageNoteUseCase({note, pageNumber}) {
        const useCase = new UpdatePageNoteUseCase({documentRepository});
        return useCase.execute({note, pageNumber})
    }
}