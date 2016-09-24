// LICENSE : MIT
"use strict";
const assert = require("assert");
import Document from "../../src/js/domain/Document/Document";
describe("Document", () => {
    context("when mark a page", function() {
        it("return markedPageNumbers", function() {
            const document = new Document();
            document.updateTotalPageNumber(10);
            const clickedPageNumber = 5;
            document.markAtPage(clickedPageNumber);
            const page = document.getPage(clickedPageNumber);
            assert(page.marked);
        });
    });
});