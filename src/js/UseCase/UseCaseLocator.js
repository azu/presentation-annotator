// LICENSE : MIT
"use strict";
import {
    CompleteLoadingDocumentFactory,
    CompleteLoadingDocumentUseCase
} from "./CompleteLoadingDocumentUseCase";
import {MarkClickedPageFactory, MarkClickedPageUseCase} from "./MarkClickedPageUseCase";
import {NewDocumentFactory, NewDocumentUseCase} from "./NewDocumentUseCase";
import {ShowExportDialogFactory, ShowExportDialogUseCase} from "./ShowExportDialogUseCase";
import {UpdatePageNoteFactory, UpdatePageNoteUseCase} from "./UpdatePageNoteUseCase";
export default class UseCaseLocator {
    static getFactory(useCaseName) {
        switch (useCaseName) {
            case CompleteLoadingDocumentUseCase.name:
                return CompleteLoadingDocumentFactory;
            case MarkClickedPageUseCase.name:
                return MarkClickedPageFactory;
            case NewDocumentUseCase.name:
                return NewDocumentFactory;
            case ShowExportDialogUseCase.name:
                return ShowExportDialogFactory;
            case UpdatePageNoteUseCase.name:
                return UpdatePageNoteFactory;
        }
    }
}