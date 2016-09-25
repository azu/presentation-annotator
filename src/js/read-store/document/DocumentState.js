// LICENSE : MIT
"use strict";
import {ReduceState} from "almin-reduce-store";
import Document from "../../domain/document/Document";
export default class DocumentState extends ReduceState {
    constructor({
        isLoaded = false,
        pdfURL = null,
        pages = []
    } = {}) {
        super();
        this.isLoaded = isLoaded;
        this.pdfURL = pdfURL;
        this.pages = pages;
    }

    /**
     * @returns {boolean}
     */
    get exist() {
        return this.pdfURL !== undefined;
    }

    update({document}) {
        return new DocumentState(Object.assign({}, this, {
            isLoaded: document instanceof Document,
            pdfURL: document.pdfURL,
            pages: document.getAllPages()
        }));
    }
}
