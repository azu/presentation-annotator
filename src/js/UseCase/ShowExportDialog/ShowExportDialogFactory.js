// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import ShowExportDialogUseCase from "./ShowExportDialogUseCase";
export default class ShowExportDialogUseCaseFactory {
    static create() {
        const useCase = new ShowExportDialogUseCase({documentRepository});
        return useCase.execute();
    }
}