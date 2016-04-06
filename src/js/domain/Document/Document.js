// LICENSE : MIT
"use strict";
const assert = require("assert");
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
     * @param {Number} pageNumber number is total page number
     * start with >=1
     */
    updateTotalPageNumber(pageNumber) {
        this.pages = Range(pageNumber).map(index => {
            return new DocumentPage({pageNumber: index + 1});
        });
        this.isLoaded = true;
    }

    updateNodeAtPage(note, pageNumber) {
        const page = this.pages[pageNumber - 1];
        assert(page !== undefined, "page should exist");
        page.note = note;
    }
}