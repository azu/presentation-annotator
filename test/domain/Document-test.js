// LICENSE : MIT
"use strict";
const assert = require("assert");
import DocumentFactory from "../../src/js/domain/document/DocumentFactory";
describe("Document", () => {
    context("when mark a page", function() {
        it("return markedPageNumbers", function() {
            const document = DocumentFactory.create({
                pdfURL: "test.pdf",
                totalPageNumber: 10
            });
            const clickedPageNumber = 5;
            document.markAtPage(clickedPageNumber);
            const page = document.getPage(clickedPageNumber);
            assert(page.marked);
        });
    });
});