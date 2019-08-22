// LICENSE : MIT
"use strict";
import documentRepository from "../../infra/DocumentRepository";
import { UseCase } from "almin";
export class MarkPageUseCaseFactory {
    static create() {
        return new MarkPageUseCase({
            documentRepository
        });
    }
}

export class MarkPageUseCase extends UseCase {
    constructor({ documentRepository }) {
        super();
        this.documentRepository = documentRepository;
    }

    execute(pageNumber) {
        const document = this.documentRepository.lastUsed();
        // mark page => (domain emit change)
        document.markAtPage(pageNumber);
        this.documentRepository.save(document);
    }
}
