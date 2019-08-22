// LICENSE : MIT
"use strict";
import { ReduceState } from "almin-reduce-store";
import EmptyDocument from "../../domain/document/EmptyDocument";
export default class DocumentState extends ReduceState {
    constructor({ isLoaded = false, pdfURL = null, pages = [] } = {}) {
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

    update({ document }) {
        const isEmpty = document instanceof EmptyDocument;
        return new DocumentState(
            Object.assign({}, this, {
                isLoaded: !isEmpty,
                pdfURL: document.pdfURL,
                pages: document.getAllPages()
            })
        );
    }
}
