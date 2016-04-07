// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import NewDocumentUseCase from "./NewDocumentUseCase";
export default class NewDocumentUseCaseFactory {
    /**
     * @param pdfURL
     * @returns {function()}
     */
    static create(pdfURL) {
        const useCase = new NewDocumentUseCase({documentRepository});
        return useCase.execute(pdfURL);
    }
}