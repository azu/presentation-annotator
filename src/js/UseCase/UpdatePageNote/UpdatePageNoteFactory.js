// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import UpdatePageNoteUseCase from "./UpdatePageNoteUseCase";
export default class UpdatePageNoteUseCaseFactory {
    /**
     * @param note
     * @param pageNumber
     */
    static create({note, pageNumber}) {
        const useCase = new UpdatePageNoteUseCase({documentRepository});
        return useCase.execute({note, pageNumber});
    }
}