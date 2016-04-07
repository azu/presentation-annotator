// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Document from "../../src/js/domain/Document/Document";
import {DomainEventBus} from "../../src/js/domain/DomainEventBus";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import DocumentStateStore from "../../src/js/read-store/document/DocumentStateStore";
describe("DocumentStateStore", function () {
    context("when create new document", function () {
        it("emit change and return new document", function () {
            const document = new Document();
            const domainEventBus = new DomainEventBus();
            const documentRepository = new DocumentRepository();
            document.domainEventBus = domainEventBus;// mock
            documentRepository.add(document);
            const store = new DocumentStateStore({domainEventBus, documentRepository});
            store.onChange(()=> {
                const expectedState = {
                    document: document
                };
                assert.deepEqual(store.getState(), expectedState);
            });
            document.emitChange();
        });
    })
});