// MIT © 2017 azu
"use strict";
import DocumentFactory from "../../src/js/domain/document/DocumentFactory";
import DocumentService from "../../src/js/domain/document/DocumentService";
const path = require("path");
const assert = require("assert");
const fs = require("fs");
describe("DocumentService", () => {
    describe("toMarkdown", function() {
        it("should return Markdown", () => {
            const document = DocumentFactory.create({
                pdfURL: "test.pdf",
                totalPageNumber: 10
            });
            const actual = require("./fixtures/download-format/actual.json");
            actual.forEach(({ pageNumber, note }) => {
                document.updateNodeAtPage(note, pageNumber);
            });
            const expected = fs.readFileSync(path.join(__dirname, "fixtures/download-format/expected.md"), "utf-8");
            assert.equal(DocumentService.toMarkdown(document), expected);
        });
    });
});