// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import ShowExportDialogUseCase from "../UseCase/ShowExportDialogUseCase";
export default class ExportUseCaseController {
    static ShowExportDialogUseCase() {
        var useCase = new ShowExportDialogUseCase({documentRepository});
        return useCase.execute();
    }
}