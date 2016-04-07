// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import ShowExportDialogUseCase from "../../src/js/UseCase/ShowExportDialog/ShowExportDialogUseCase";
import Document from "../../src/js/domain/Document/Document";
import DocumentService from "../../src/js/domain/Document/DocumentService";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
describe("ShowExportDialogUseCase", function () {
    context("execute", function () {
        it("should dispatch with output", function (done) {
            const documentRepository = new DocumentRepository();
            const document = new Document();
            const expectedOutput = DocumentService.stringify(document);
            documentRepository.findLatest = () => {
                return document;
            };
            const dispatch = (key, output) => {
                assert.equal(key, ShowExportDialogUseCase.name);
                assert.equal(output, expectedOutput);
                done();
            };
            const useCase = new ShowExportDialogUseCase({documentRepository});
            useCase.execute()(dispatch);
        });
    });
});