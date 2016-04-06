// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import UpdatePageNoteUseCase from "../../src/js/UseCase/UpdatePageNote/UpdatePageNoteUseCase";
import Document from "../../src/js/domain/Document/Document";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("UpdatePageNoteUseCase", function () {
    it("should update page at pageNumber of document", function (done) {
        const documentRepository = new DocumentRepository();
        const document = new Document();
        document.updateTotalPageNumber(10);
        const input = {note: "description of page", pageNumber: 1};
        documentRepository.findLatest = () => {
            return document;
        };
        const dispatch = (key, value) => {
            assert.deepEqual(key, UpdatePageNoteUseCase.name);
            assert.deepEqual(value, input);
            assert.equal(document.pages[input.pageNumber - 1].note, input.note);
            done();
        };
        const useCase = new UpdatePageNoteUseCase({documentRepository});
        useCase.execute(input)(dispatch);
    });
    context("when that page is out of range", function () {
        it("should throw error", function () {
            const documentRepository = new DocumentRepository();
            const document = new Document();
            document.updateTotalPageNumber(10);
            const outOfRange = 20;
            const input = {note: "description of page", pageNumber: outOfRange};
            documentRepository.findLatest = () => {
                return document;
            };
            const useCase = new UpdatePageNoteUseCase({documentRepository});
            try {
                useCase.execute(input)(dispatch);
            } catch (error) {
                assert(error instanceof Error);
            }
        });
    })
});