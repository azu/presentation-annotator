// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import UseCase from "../framework/UseCase";

export class ShowExportDialogFactory {
    static create() {
        return new ShowExportDialogUseCase({
            documentRepository
        });
    }
}

export class ShowExportDialogUseCase extends UseCase {
    constructor({documentRepository}) {
        super();
        /**
         * @type {DocumentRepository}
         */
        this.documentRepository = documentRepository;
    }

    execute() {
        this.dispatch({
            type: ShowExportDialogUseCase.name
        });
    }
}