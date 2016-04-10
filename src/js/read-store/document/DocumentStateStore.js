// LICENSE : MIT
"use strict";
import State from "../../framework/State";
import Document from "../../domain/Document/Document";
import {NewDocumentUseCase} from "../../UseCase/NewDocumentUseCase";
import eventAggregator from "../../domain/DomainEventAggregator";
const initialState = {
    document: null,
    markedPageNumbers: []
};
export default class DocumentFormStateStore extends State {
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
        eventAggregator.subscribe(Document.name, () => {
            this.emitChange();
        });
        this.documentRepository.onChange(() => {
            console.log("ONCHANGE")
            this.emitChange();
        });
    }

    getState() {
        const document = this.documentRepository.lastUsed();
        if (!document) {
            return initialState;
        }
        const markedPageNumbers = document.getAllPages().filter(page => {
            return document.isMarkedAtPage(page.pageNumber);
        }).map(page => page.pageNumber);
        return {
            document,
            markedPageNumbers
        }
    }
}