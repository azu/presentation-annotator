// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
export default class UpdatePageNoteUseCase {
    static create() {
        return new this({documentRepository});
    }

    constructor({documentRepository}) {
        this.documentRepository = documentRepository;
    }

    /**
     * @param note
     * @param pageNumber
     * @returns {function()}
     */
    execute({note, pageNumber}) {
        return dispatch => {
            const document = this.documentRepository.findLatest();
            document.updateNodeAtPage(note, pageNumber);
            dispatch(UpdatePageNoteUseCase.name, {note, pageNumber});
        };
    }
}