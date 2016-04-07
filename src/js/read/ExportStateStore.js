// LICENSE : MIT
"use strict";
import StateStore from "../flux/StateStore";
import ShowExportDialogUseCase from "../UseCase/ShowExportDialog/ShowExportDialogUseCase"
/*
 StateStore has change condition
 */
export default class ExportStateStore extends StateStore {
    constructor() {
        super();
        this.isShowing = false;
        this.output = "";
    }

    getState() {
        return {
            exporting: {
                isShowing: this.isShowing,
                output: this.output
            }
        }
    }

    [ShowExportDialogUseCase.name](output) {
        this.output = output;
        this.isShowing = true;
        this.emitChange();
    }
}