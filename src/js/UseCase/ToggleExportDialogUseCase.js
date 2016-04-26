// LICENSE : MIT
"use strict";
import {UseCase} from "almin";
export class ToggleExportDialogFactory {
    static create() {
        return new ToggleExportDialogUseCase();
    }
}

export class ToggleExportDialogUseCase extends UseCase {
    constructor() {
        super();
    }

    execute() {
        this.dispatch({
            type: ToggleExportDialogUseCase.name
        });
    }
}