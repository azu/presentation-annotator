// LICENSE : MIT
"use strict";
import StateStore from "../../flux/StateStore";
import Document from "../../domain/Document/Document";
import NewDocumentUseCase from "../../UseCase/NewDocument/NewDocumentUseCase";
import eventAggregator from "../../domain/DomainEventAggregator";
const initialState ={
    document: null,
    markedPageNumbers:[]
};
export default class DocumentFormStateStore extends StateStore {
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
        eventAggregator.subscribe(Document.name, () => {
            this.emitChange();
        });
    }

    getState() {
        const document = this.documentRepository.findFirst();
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

    [NewDocumentUseCase.name]() {
        this.emitChange();
    }
}