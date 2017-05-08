// MIT © 2017 azu
import DocumentFactory from "../../src/js/domain/document/DocumentFactory";
"use strict";
describe("DocumentService", () => {
    describe("toMarkdown", function() {
        it("should return Markdown", () => {
            const document = DocumentFactory.create({
                pdfURL: "test.pdf",
                totalPageNumber: 10
            });
            const actual = [
                {
                    pageNumber: 1,
                    note: "Text 1"
                },
                {
                    pageNumber: 2,
                    note: "Text 2"
                },
                {
                    pageNumber: 10,
                    note: "Text 10"
                }
            ];
            const expected = ``
            document.updateNodeAtPage(note, pageNumber);
        });
    });
});