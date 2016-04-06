// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import DocumentService from "../domain/Document/DocumentService";
export default class ShowExportDialogUseCase {
    static create() {
        return new this({documentRepository});
    }

    constructor({documentRepository}) {
        /**
         * @type {DocumentRepository}
         */
        this.documentRepository = documentRepository;
    }

    execute() {
        return dispatch => {
            const document = this.documentRepository.findLatest();
            const output = DocumentService.stringify(document);
            dispatch(ShowExportDialogUseCase.name, output);
        }
    }
}