// LICENSE : MIT
"use strict";
import Document from "./Document";
import DocumentPage from "./DocumentPage";
import Range from "lodash.range";
export default class DocumentFactory {
    /**
     * create `Document` filled pages
     * @param {string} pdfURL
     * @param {number} totalPageNumber
     * @returns {DocumentModel}
     */
    static create({ pdfURL, totalPageNumber }) {
        const pages = Range(totalPageNumber).map(index => {
            return new DocumentPage({ pageNumber: index + 1 });
        });
        return new Document({
            pdfURL,
            pages
        });
    }
}
