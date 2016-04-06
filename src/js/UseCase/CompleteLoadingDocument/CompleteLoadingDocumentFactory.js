// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import CompleteLoadingDocumentUseCase from "./CompleteLoadingDocumentUseCase";
export default class CompleteLoadingDocumentFactory {
    /**
     * @param totalPageNumber
     * @returns {*}
     */
    static create(totalPageNumber) {
        const useCase = new CompleteLoadingDocumentUseCase({documentRepository});
        return useCase.execute(totalPageNumber);
    }
}