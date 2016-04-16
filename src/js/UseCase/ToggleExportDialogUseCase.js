// LICENSE : MIT
"use strict";
import UseCase from "../framework/UseCase";
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