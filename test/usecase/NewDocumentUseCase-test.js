// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {NewDocumentUseCase} from "../../src/js/UseCase/document/NewDocumentUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("NewDocumentUseCase", function () {
    context("when execute", function () {
        it("should dispatch with document", function () {
            const pdfURL = "test.pdf";
            const documentRepository = new DocumentRepository();
            documentRepository.onChange(() => {
                const targetDocument = documentRepository.lastUsed();
                assert(targetDocument instanceof Document);
            });
            const useCase = new NewDocumentUseCase({documentRepository});
            return useCase.execute(pdfURL);
        });
    });
});