// LICENSE : MIT
"use strict";
import Document from "../document/Document";
import {DocumentPageCapture} from "./DocumentPageCapture";

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
        const createTable = (pageNumber, img, text) => {
            return `<!-- Page ${pageNumber} -->
${img}

${text}
`;
        };
        const createImage = (pageNumber, pageText) => {
            const markdownLiteral = /[\\`*_{}[\]]/g;
            const escapedForAlt = pageText
                .replace(markdownLiteral, "\\$&")
                .replace(/\n/g, "");
            return `![${escapedForAlt}](./images/${pageNumber}.png)`;
        };
        const pageNotes = document.getAllPages().map(page => {
            const pageText = DocumentPageCapture.captureText(page);
            return createTable(page.pageNumber, createImage(page.pageNumber, pageText), page.note);
        });
        return pageNotes.join("\n\n----\n\n");
    }
}
