// LICENSE : MIT
"use strict";
import Store from "../../framework/Store";
import {ToggleExportDialogUseCase} from "../../UseCase/ToggleExportDialogUseCase"
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
            if (payload.type === ToggleExportDialogUseCase.name) {
                this.isShowing = !this.isShowing;
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