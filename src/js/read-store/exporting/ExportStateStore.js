// LICENSE : MIT
"use strict";
import Store from "../../framework/Store";
import {ShowExportDialogUseCase} from "../../UseCase/ShowExportDialogUseCase"
import DocumentService from "../../domain/Document/DocumentService";
/*
 StateStore has change condition
 */
export default class ExportStateStore extends Store {
    constructor({documentRepository}) {
        super();
        this.isShowing = false;
        this.documentRepository = documentRepository;
        this.onDispatch(payload => {
            if (payload.type === ShowExportDialogUseCase.name) {
                this.isShowing = true;
                this.emitChange();
            }
        });
    }

    getState() {
        const document = this.documentRepository.lastUsed();
        return {
            exporting: {
                isShowing: this.isShowing,
                output: DocumentService.stringify(document)
            }
        };
    }
}