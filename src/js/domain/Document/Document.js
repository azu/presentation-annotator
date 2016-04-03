// LICENSE : MIT
"use strict";
import DocumentPage from "./DocumentPage";
import Range from "lodash.range";
let DocumentID = 1;
/**
 * Document Entity
 */
export default class Document {
    constructor({pdfURL} = {}) {
        this.id = `Document${DocumentID++}`;
        this.pages = [];
        this.isLoaded = false;
        this.pdfURL = pdfURL;
    }

    getAllPages() {
        return this.pages;
    }

    getTotalPageNumber() {
        return this.pages.length;
    }

    /**
     * Update pages with empty Page instances.
     * @param {Number} number number is total page number
     */
    updateTotalPageNumber(number) {
        this.pages = Range(number).map(index => {
            return new DocumentPage({pageNumber: index + 1});
        });
        this.isLoaded = true;
    }
}