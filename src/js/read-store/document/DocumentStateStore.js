// LICENSE : MIT
"use strict";
import Store from "../../framework/Store";
const initialState = {
    document: null,
    markedPageNumbers: []
};
export default class DocumentFormStateStore extends Store {
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
        this.documentRepository.onChange(() => {
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