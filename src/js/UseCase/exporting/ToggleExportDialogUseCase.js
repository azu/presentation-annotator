// LICENSE : MIT
"use strict";
import {UseCase} from "almin";
export class ToggleExportDialogFactory {
    static create() {
        return new ToggleExportDialogUseCase();
    }
}

export class ToggleExportDialogUseCase extends UseCase {
    /**
     * @return {string}
     */
    static get Event() {
        return "ToggleExportDialogUseCase";
    }

    constructor() {
        super();
    }

    execute() {
        this.dispatch({
            type: ToggleExportDialogUseCase.Event
        });
    }
}
