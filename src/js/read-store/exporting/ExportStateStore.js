// LICENSE : MIT
"use strict";
import State from "../../framework/State";
import ShowExportDialogUseCase from "../../UseCase/ShowExportDialogUseCase"
/*
 StateStore has change condition
 */
export default class ExportStateStore extends State {
    constructor({documentRepository}) {
        super();
        this.isShowing = false;
        this.output = "";
        this.onDispatch(ShowExportDialogUseCase.name, (output) => {
            this.output = output;
            this.isShowing = true;
            this.emitChange();
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