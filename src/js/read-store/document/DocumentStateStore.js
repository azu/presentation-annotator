// LICENSE : MIT
"use strict";
import StateStore from "../../flux/StateStore";
import Document from "../../domain/Document/Document";
import NewDocumentUseCase from "../../UseCase/NewDocument/NewDocumentUseCase";
import eventAggregator from "../../domain/DomainEventAggregator";
export default class DocumentFormStateStore extends StateStore {
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
        eventAggregator.subscribe(Document.name, () => {
            this.emitChange();
        });
    }

    getState() {
        return {
            document: this.documentRepository.findFirst()
        }
    }

    [NewDocumentUseCase.name]() {
        this.emitChange();
    }
}