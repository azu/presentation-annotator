// LICENSE : MIT
"use strict";
export default class ShowExportDialogUseCase {
    constructor({documentRepository}) {
        /**
         * @type {DocumentRepository}
         */
        this.documentRepository = documentRepository;
    }

    execute() {
        return dispatch => {
            const document = this.documentRepository.findLatest();
            const output = JSON.stringify(document.pages, null, 4);
            dispatch(ShowExportDialogUseCase.name, output);
        }
    }
}