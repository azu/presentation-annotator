// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import DocumentStateStore from "../../src/js/read-store/document/DocumentStore";
describe("DocumentStateStore", function() {
    context("when create new document", function() {
        it("emit change and return new document", function() {
            // stub document
            const document = new Document();
            // add document to repository
            const documentRepository = new DocumentRepository();
            documentRepository.save(document);
            // create store
            const store = new DocumentStateStore({documentRepository});
            store.onChange(() => {
                assert.deepEqual(store.getState().document, document);
            });
            document.emitChange();
        });
    });
});