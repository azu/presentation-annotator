// LICENSE : MIT
"use strict";
import {
    CompleteLoadingDocumentFactory,
    CompleteLoadingDocumentUseCase
} from "./CompleteLoadingDocumentUseCase";
import {MarkClickedPageFactory, MarkClickedPageUseCase} from "./MarkClickedPageUseCase";
import {NewDocumentFactory, NewDocumentUseCase} from "./NewDocumentUseCase";
import {ToggleExportDialogFactory, ToggleExportDialogUseCase} from "./ToggleExportDialogUseCase";
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
            case ToggleExportDialogUseCase.name:
                return ToggleExportDialogFactory;
            case UpdatePageNoteUseCase.name:
                return UpdatePageNoteFactory;
        }
    }
}