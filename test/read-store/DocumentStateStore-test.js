// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import DocumentFactory from "../../src/js/domain/Document/DocumentFactory";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import DocumentStateStore from "../../src/js/read-store/document/DocumentStore";
describe("DocumentStateStore", function() {
    context("when create new document", function() {
        it("emit change and return new document", function() {
            // stub document
            const document = DocumentFactory.create({
                pdfURL: "test.pdf",
                totalPageNumber: 10
            });
            // add document to repository
            const documentRepository = new DocumentRepository();
            // create store
            const store = new DocumentStateStore({documentRepository});
            // then
            store.onChange(() => {
                assert.deepEqual(store.getState().document.pdfURL, document.pdfURL);
            });
            // when
            documentRepository.save(document);
        });
    });
});