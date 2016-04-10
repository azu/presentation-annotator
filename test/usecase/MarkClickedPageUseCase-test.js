// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {MarkClickedPageUseCase} from "../../src/js/UseCase/MarkClickedPageUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("MarkClickedPageUseCase", function () {
    context("when exist document filled total page", function () {
        it("should overwrite", function (done) {
            const expectedPdfURL = "test.pdf";
            const existedTotalNumber = 10;
            const markPageNumber = 10;
            const documentRepository = new DocumentRepository();
            const document = new Document({
                pdfURL: expectedPdfURL
            });
            document.updateTotalPageNumber(existedTotalNumber);
            documentRepository.findFirst = () => {
                return document;
            };
            // after change
            document.onChange(() => {
                assert(document.isMarkedAtPage(markPageNumber));
            });
            const dispatch = (key, pageNumber) => {
                assert.equal(key, MarkClickedPageUseCase.name);
                assert.equal(pageNumber, pageNumber);
                done();
            };
            const useCase = new MarkClickedPageUseCase({documentRepository});
            useCase.execute(markPageNumber);
        });
    });
});