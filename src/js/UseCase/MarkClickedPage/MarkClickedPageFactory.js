// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import MarkClickedPageUseCase from "./MarkClickedPageUseCase";
export default class MarkClickedPageFactory {
    static create(pageNumber) {
        const useCase = new MarkClickedPageUseCase({documentRepository});
        return useCase.execute(pageNumber);
    }
}