// LICENSE : MIT
"use strict";
import documentRepository from "../infra/DocumentRepository";
import UseCase from "../framework/UseCase";
export class MarkClickedPageFactory {
    static create() {
        return new MarkClickedPageUseCase({
            documentRepository
        });
    }
}

export class MarkClickedPageUseCase extends UseCase {
    constructor({documentRepository}) {
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