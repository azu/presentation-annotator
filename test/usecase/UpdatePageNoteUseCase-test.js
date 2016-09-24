// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {UpdatePageNoteUseCase} from "../../src/js/UseCase/document/UpdatePageNoteUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("UpdatePageNoteUseCase", function () {
    it("should update page at pageNumber of document", function () {
        const documentRepository = new DocumentRepository();
        const document = new Document();
        document.updateTotalPageNumber(10);
        const input = {note: "description of page", pageNumber: 1};
        documentRepository.save(document);
        documentRepository.onChange(() => {
            const targetDocument = documentRepository.lastUsed();
            assert.equal(targetDocument.pages[input.pageNumber - 1].note, input.note);
        });
        const useCase = new UpdatePageNoteUseCase({documentRepository});
        return useCase.execute(input);
    });
    context("when that page is out of range", function () {
        it("should throw error", function () {
            const documentRepository = new DocumentRepository();
            const document = new Document();
            document.updateTotalPageNumber(10);
            const outOfRange = 20;
            const input = {note: "description of page", pageNumber: outOfRange};
            documentRepository.save(document);
            // when
            const useCase = new UpdatePageNoteUseCase({documentRepository});
            try {
                useCase.execute(input);
            } catch (error) {
                assert(error instanceof Error);
            }
        });
    })
});