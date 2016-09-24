// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import {UseCase} from "almin";
export class UpdatePageNoteFactory {
    static create() {
        return new UpdatePageNoteUseCase({
            documentRepository
        });
    }
}

export class UpdatePageNoteUseCase extends UseCase {
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
    }

    /**
     * @param note
     * @param pageNumber
     * @returns {function()}
     */
    execute({note, pageNumber}) {
        const document = this.documentRepository.lastUsed();
        document.updateNodeAtPage(note, pageNumber);
        this.documentRepository.save(document);
    }
}
