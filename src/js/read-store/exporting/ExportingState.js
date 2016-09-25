// LICENSE : MIT
"use strict";
import {ReduceState} from "almin-reduce-store";
import DocumentService from "../../domain/document/DocumentService";
import {ToggleExportDialogUseCase} from "../../UseCase/exporting/ToggleExportDialogUseCase";
export default class ExportingState extends ReduceState {
    constructor({
        output = "",
        isShowing = false
    } = {}) {
        super();
        this.output = output;
        this.isShowing = isShowing;
    }

    /**
     * @param {*} document
     * @returns {ExportingState}
     */
    update({document}) {
        return new ExportingState(Object.assign({}, this, {
            output: DocumentService.stringify(document)
        }));
    }

    reduce(payload) {
        switch (payload.type) {
            case ToggleExportDialogUseCase.Event:
                return new ExportingState(Object.assign({}, this, {
                    isShowing: !this.isShowing
                }));
            default:
                return this;
        }
    }
}
