// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import CompleteLoadingDocumentUseCase from "../../src/js/usecase/CompleteLoadingDocumentUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("CompleteLoadingDocumentUseCase", function () {
    context("when exist document filled total page", function () {
        it("should overwrite", function (done) {
            const expectedPdfURL = "test.pdf";
            const existedTotalNumber = 10;
            const expectedTotalNumber = 20;
            const documentRepository = new DocumentRepository();
            documentRepository.findLatest = () => {
                const document = new Document({
                    pdfURL: expectedPdfURL
                });
                document.updateTotalPageNumber(existedTotalNumber);
                return document;
            };
            const dispatch = (key, totalNumber) => {
                assert.equal(key, CompleteLoadingDocumentUseCase.name);
                assert.equal(totalNumber, expectedTotalNumber);
                done();
            };
            const useCase = new CompleteLoadingDocumentUseCase({documentRepository});
            useCase.execute(expectedTotalNumber)(dispatch);
        });
    });
    context("execute", function () {
        it("should dispatch with document", function (done) {
            const expectedTotalNumber = 10;
            const documentRepository = new DocumentRepository();
            documentRepository.findLatest = () => {
                return new Document();
            };
            const dispatch = (key, totalNumber) => {
                assert.equal(key, CompleteLoadingDocumentUseCase.name);
                assert.equal(totalNumber, expectedTotalNumber);
                done();
            };
            const useCase = new CompleteLoadingDocumentUseCase({documentRepository});
            useCase.execute(expectedTotalNumber)(dispatch);
        });
    });
});