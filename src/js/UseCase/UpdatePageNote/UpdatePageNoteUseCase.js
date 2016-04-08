// LICENSE : MIT
"use strict";
export default class UpdatePageNoteUseCase {
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
            const document = this.documentRepository.findFirst();
            document.updateNodeAtPage(note, pageNumber);
            dispatch(UpdatePageNoteUseCase.name, {note, pageNumber});
        };
    }
}