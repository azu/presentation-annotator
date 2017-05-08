// LICENSE : MIT
"use strict";
import Document from "../document/Document";
export default class DocumentService {
    static stringify(document) {
        if (!document) {
            return "";
        }
        if (!document.pages) {
            return "";
        }
        return JSON.stringify(document.pages, null, 4);
    }

    /**
     * @param {Document} document
     * @returns {string}
     */
    static toMarkdown(document) {
        if (!document) {
            return "";
        }
        if (!document.pages) {
            return "";
        }
        const createTable = (pageNumber, left, right) => {
            return `Page ${pageNumber} | Annotation
------------ | -------------
${left} | ${right.replace(/\n/g, "")}`;
        };
        const createImage = (pageNumber) => {
            return `![Page ${pageNumber}](./images/${pageNumber}.png)`
        };
        const pageNotes = document.getModifiedPages().map(page => {
            return createTable(page.pageNumber, createImage(page.pageNumber), page.note);
        });
        return pageNotes.join("\n\n----\n\n");
    }
}
