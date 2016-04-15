// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {CompleteLoadingDocumentUseCase} from "../../src/js/UseCase/CompleteLoadingDocumentUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("CompleteLoadingDocumentUseCase", function () {
    context("when exist document filled total page", function () {
        it("should overwrite totalPageNumber", function (done) {
            // given
            const expectedPdfURL = "test.pdf";
            const existedTotalNumber = 10;
            const expectedTotalNumber = 20;
            const documentRepository = new DocumentRepository();
            const document = new Document({
                pdfURL: expectedPdfURL,
                totalPageNumber: existedTotalNumber
            });
            documentRepository.save(document);
            // then
            documentRepository.onChange(() => {
                const targetDocument = documentRepository.lastUsed();
                assert.equal(targetDocument.getTotalPageNumber(), expectedTotalNumber);
                done();
            });
            // when
            const useCase = new CompleteLoadingDocumentUseCase({documentRepository});
            return useCase.execute(expectedTotalNumber);
        });
    });
    context("when execute with totalPageNumber", function () {
        it("should filled document with totalPageNumber", function () {
            const expectedTotalNumber = 10;
            const documentRepository = new DocumentRepository();
            documentRepository.save(new Document());
            documentRepository.onChange(() => {
                const doc = documentRepository.lastUsed();
                assert.equal(doc.getTotalPageNumber(), expectedTotalNumber);
            });
            const useCase = new CompleteLoadingDocumentUseCase({documentRepository});
            return useCase.execute(expectedTotalNumber);
        });
    });
});