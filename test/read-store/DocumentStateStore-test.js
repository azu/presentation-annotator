// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import DomainEventEmitter from "../../src/js/domain/DomainEventEmitter";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import DocumentStateStore from "../../src/js/read-store/document/DocumentStateStore";
describe("DocumentStateStore", function () {
    context("when create new document", function () {
        it("emit change and return new document", function () {
            // stub document
            const stubEvents = new DomainEventEmitter();
            const document = new Document();
            document.eventAggregator.eventEmitter = stubEvents;
            // add document to repository
            const documentRepository = new DocumentRepository();
            documentRepository.add(document);
            // create store
            const store = new DocumentStateStore({documentRepository});
            stubEvents.subscribe(payload => {
                assert.equal(payload.type, Document.name);
            });
            store.onChange(()=> {
                assert.deepEqual(store.getState().document, document);
            });
            document.emitChange();
        });
    });
    context("when mark a page", function () {
        it("return markedPageNumbers", function () {
            // stub document
            const document = new Document();
            document.updateTotalPageNumber(10);
            const markedPageNumber = 5;
            document.markAtPage(markedPageNumber);
            // add document to repository
            const documentRepository = new DocumentRepository();
            documentRepository.add(document);
            // create store
            const store = new DocumentStateStore({documentRepository});
            assert.deepEqual(store.getState().markedPageNumbers, [markedPageNumber]);
        });
    });
});