// LICENSE : MIT
"use strict";
export default class UpdatePageNoteUseCase {
    constructor({documentRepository}) {
        this.documentRepository = documentRepository;
    }

    execute({note, pageNumber}) {
        return dispatch => {
            /**
             * @type {Document}
             */
            const document = this.documentRepository.findLatest();
            document.updateNodeAtPage(note, pageNumber);
            dispatch(UpdatePageNoteUseCase.name, {note, pageNumber});
        };
    }
}