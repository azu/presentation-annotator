// LICENSE : MIT
"use strict";
const assert = require("assert");
import DocumentPage from "./DocumentPage";
let DocumentID = 1;
/**
 * Document Entity
 * @alias DocumentModel
 * avoid to conflict DOM document
 */
export default class Document {
    /**
     * @param {string} pdfURL
     * @param {DocumentPage[]} pages
     */
    constructor({ pdfURL, pages } = {}) {
        this.id = `Document${DocumentID++}`;
        /**
         * @type {DocumentPage[]}
         * @private
         */
        this.pages = pages;
        /**
         * @type {string}
         */
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
     * return modified pages
     * @returns {DocumentPage[]}
     */
    getModifiedPages() {
        return this.getAllPages().filter(page => page.isModified);
    }

    /**
     * return index of same pageNumber
     * not exist, return -1
     * @param {number} pageNumber
     * @return {number}
     */
    indexOfPageNumber(pageNumber) {
        return this.pages.findIndex((page) => {
            return page.pageNumber === pageNumber;
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
