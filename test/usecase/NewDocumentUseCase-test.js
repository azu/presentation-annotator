// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import NewDocumentUseCase from "../../src/js/UseCase/NewDocument/NewDocumentUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("NewDocumentUseCase", function () {
    context("execute", function () {
        it("should dispatch with document", function (done) {
            const pdfURL = "test.pdf";
            const documentRepository = new DocumentRepository();
            documentRepository.add = (document) => {
                assert(document instanceof Document);
                assert.equal(document.pdfURL, pdfURL);
            };
            const dispatch = (key, document) => {
                assert.equal(key, NewDocumentUseCase.name);
                assert(document instanceof Document);
                done();
            };
            const useCase = new NewDocumentUseCase({documentRepository});
            useCase.execute(pdfURL)(dispatch);
        });
    });
});