// LICENSE : MIT
"use strict";
import Document from "./Document";
import DocumentPage from "./DocumentPage";
export default class DocumentFactory {
    /**
     * @param {Object|Document} object
     * @returns {Document}
     */
    static create(object) {
        const document = new Document();
        document.id = object.id;
        document.markedPages = object.markedPages;
        document.isLoaded = object.isLoaded;
        document.pdfURL = object.pdfURL;
        document.pages = object.pages.map((item) => new DocumentPage(item));
        return document;
    }
}
