// LICENSE : MIT
"use strict";
const assert = require("assert");
import DocumentPage from "./DocumentPage";
import Range from "lodash.range";
import DomainModel from "../DomainModel";
let DocumentID = 1;
/**
 * Document Entity
 */
export default class Document extends DomainModel {
    constructor({pdfURL, totalPageNumber} = {}) {
        super();
        this.id = `Document${DocumentID++}`;
        /**
         * @type {DocumentPage[]}
         * @private
         */
        this.pages = [];
        /**
         * @type {number[]}
         * @private
         */
        this.markedPages = [];
        if (totalPageNumber > 0) {
            this.updateTotalPageNumber(totalPageNumber);
        }
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
     * @param pageNumber
     * @returns {DocumentPage}
     */
    getPage(pageNumber) {
        const page = this.pages[pageNumber - 1];
        assert(page, "page should exist");
        return page;
    }

    isMarkedAtPage(pageNumber) {
        const page = this.getPage(pageNumber);
        return this.markedPages.indexOf(page) !== -1;
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
        const page = this.getPage(pageNumber);
        page.note = note;
    }

    markAtPage(pageNumber) {
        if (this.isMarkedAtPage(pageNumber)) {
            return;
        }
        const page = this.getPage(pageNumber);
        this.markedPages.push(page);
    }
}