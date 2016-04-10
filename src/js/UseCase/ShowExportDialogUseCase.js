// LICENSE : MIT
"use strict";
import DocumentService from "../domain/Document/DocumentService";
import documentRepository from "../infra/DocumentRepository";
import UseCase from "../framework/UseCase";
export class ShowExportDialogFactory {
    static create() {
        return new ShowExportDialogUseCase({
            documentRepository
        });
    }
}

export default class ShowExportDialogUseCase extends UseCase{
    constructor({documentRepository}) {
        super();
        /**
         * @type {DocumentRepository}
         */
        this.documentRepository = documentRepository;
    }

    execute() {
        const document = this.documentRepository.lastUsed();
        const output = DocumentService.stringify(document);
        this.dispatch(ShowExportDialogUseCase.name, output);
    }
}