// LICENSE : MIT
"use strict";
import StateStore from "../../flux/StateStore";
import Document from "../../domain/Document/Document";
import NewDocumentUseCase from "../../UseCase/NewDocument/NewDocumentUseCase";
export default class DocumentFormStateStore extends StateStore {
    constructor({domainEventBus, documentRepository}) {
        super();
        this.documentRepository = documentRepository;
        domainEventBus.on(Document.name, () => {
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