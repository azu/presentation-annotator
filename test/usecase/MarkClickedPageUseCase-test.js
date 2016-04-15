// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {MarkClickedPageUseCase} from "../../src/js/UseCase/MarkClickedPageUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("MarkClickedPageUseCase", function () {
    context("when exist document filled total page", function () {
        it("should mark at page", function () {
            // Given
            const expectedPdfURL = "test.pdf";
            const existedTotalNumber = 10;
            const markPageNumber = 10;
            const documentRepository = new DocumentRepository();
            const document = new Document({
                pdfURL: expectedPdfURL,
                totalPageNumber: existedTotalNumber
            });
            documentRepository.save(document);
            // Then
            documentRepository.onChange(() => {
                const targetDocument = documentRepository.lastUsed();
                assert(targetDocument.isMarkedAtPage(markPageNumber));
            });
            // When
            const useCase = new MarkClickedPageUseCase({documentRepository});
            return useCase.execute(markPageNumber);
        });
    });
});