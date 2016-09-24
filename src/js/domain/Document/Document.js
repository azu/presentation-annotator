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


    /**
     * return index of same pageNumber
     * not exist, return -1
     * @param {number} pageNumber
     * @return {number}
     */
    indexOfPageNumber(pageNumber) {
        return this.pages.findIndex(page => {
            return page.pageNumber === pageNumber
        });
    }

    /**
     * update `page` at `index`
     * @param {DocumentPage} page
     */
    updatePageAtIndex(page) {
        const index = this.indexOfPageNumber(page.pageNumber);
        this.pages = [
            ...this.pages.slice(0, index),
            page,
            ...this.pages.slice(index + 1)
        ];
    }

    /**
     * update note at `pageNumber`.
     * @param {string} note
     * @param {number} pageNumber
     */
    updateNodeAtPage(note, pageNumber) {
        const page = this.getPage(pageNumber);
        this.updatePageAtIndex(page.updateNote(note));
    }

    /**
     * @param {number} pageNumber
     */
    markAtPage(pageNumber) {
        const page = this.getPage(pageNumber);
        this.updatePageAtIndex(page.mark());
    }
}