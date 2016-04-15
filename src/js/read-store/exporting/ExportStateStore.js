// LICENSE : MIT
"use strict";
import Store from "../../framework/Store";
import ShowExportDialogUseCase from "../../UseCase/ShowExportDialogUseCase"
/*
 StateStore has change condition
 */
export default class ExportStateStore extends Store {
    constructor({documentRepository}) {
        super();
        this.isShowing = false;
        this.output = "";
        this.onDispatch(payload => {
            if(payload.type === ShowExportDialogUseCase.name) {
                this.output = payload.output;
                this.isShowing = true;
                this.emitChange();
            }
        });
    }

    getState() {
        return {
            exporting: {
                isShowing: this.isShowing,
                output: this.output
            }
        }
    }
}