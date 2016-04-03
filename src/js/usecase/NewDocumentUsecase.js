// LICENSE : MIT
"use strict";
import DocumentRepository from "../infra/DocumentRepository";
import Document from "../domain/Document/Document";
export default class NewDocumentUseCase {
    constructor({pdfURL} = {}) {
        this.pdfURL = pdfURL;
    }

    /**
     * @param {ContextInUseCase} context
     */
    execute(context) {
        const document = new Document({pdfURL: this.pdfURL});
        DocumentRepository.addDocument(document);
        context.dispatch(this.constructor.name, document);
    }
}