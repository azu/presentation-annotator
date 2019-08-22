// LICENSE : MIT
"use strict";
import {ReduceState} from "almin-reduce-store";
import DocumentService from "../../domain/document/DocumentService";
import {ToggleExportDialogUseCase} from "../../UseCase/exporting/ToggleExportDialogUseCase";
import {DownloadNotesUseCaseEvents} from "../../UseCase/exporting/DownloadNotesUseCase";

export default class ExportingState extends ReduceState {
    constructor({output = "", isShowing = false, isZipping = false} = {}) {
        super();
        this.output = output;
        this.isShowing = isShowing;
        this.isZipping = isZipping;
    }

    /**
     * @param {*} document
     * @returns {ExportingState}
     */
    update({document}) {
        return new ExportingState(
            Object.assign({}, this, {
                output: DocumentService.stringify(document)
            })
        );
    }

    reduce(payload) {
        switch (payload.type) {
            case ToggleExportDialogUseCase.Event:
                return new ExportingState(
                    Object.assign({}, this, {
                        isShowing: !this.isShowing
                    })
                );
            case DownloadNotesUseCaseEvents.StartDownloadNotesUseCase:
                return new ExportingState(
                    Object.assign({}, this, {
                        isZipping: true
                    })
                );
            case DownloadNotesUseCaseEvents.FinishDownloadNotesUseCase:
                return new ExportingState(
                    Object.assign({}, this, {
                        isZipping: false
                    })
                );
            default:
                return this;
        }
    }
}
