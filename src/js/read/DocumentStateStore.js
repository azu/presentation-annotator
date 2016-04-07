// LICENSE : MIT
"use strict";
import StateStore from "../flux/StateStore";
import Document from "../domain/Document/Document";
import NewDocumentUseCase from "../UseCase/NewDocument/NewDocumentUseCase";
import DomainEventBus from "../domain/DomainEventBus";
import documentRepository from "../infra/DocumentRepository";
export default class DocumentFormStateStore extends StateStore {
    constructor() {
        super();
        DomainEventBus.on(Document.name, () => {
            this.emitChange();
        })
    }

    getState() {
        return {
            document: documentRepository.findFirst()
        }
    }

    [NewDocumentUseCase.name](){
        this.emitChange();
    }
}