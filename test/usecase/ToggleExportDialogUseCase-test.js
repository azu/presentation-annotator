// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {ToggleExportDialogUseCase} from "../../src/js/UseCase/ToggleExportDialogUseCase";
import Document from "../../src/js/domain/Document/Document";
import DocumentService from "../../src/js/domain/Document/DocumentService";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import ExportStateStore from "../../src/js/read-store/exporting/ExportStateStore";
describe("ToggleExportDialogUseCase", function () {
    context("when execute", function () {
        it("UseCase dispatch with output", function (done) {
            // mock event emitter
            const documentRepository = new DocumentRepository();
            const document = new Document();
            documentRepository.save(document);
            const useCase = new ToggleExportDialogUseCase({documentRepository});
            useCase.onDispatch(({type}) => {
                assert.equal(type, ToggleExportDialogUseCase.name);
                done();
            });
            return useCase.execute();
        });
        it("State receive dispatched output", function (done) {
            // Given
            const documentRepository = new DocumentRepository();
            const document = new Document();
            const expectedOutput = DocumentService.stringify(document);
            documentRepository.save(document);
            const store = new ExportStateStore({documentRepository});
            const useCase = new ToggleExportDialogUseCase({documentRepository});
            // delegate event
            useCase.onDispatch(store.dispatch.bind(store));
            // then
            const previousState = store.getState();
            assert.equal(previousState.exporting.isShowing, false);
            store.onChange(() => {
                const state = store.getState();
                assert.strictEqual(state.exporting.isShowing, true);
                assert.strictEqual(state.exporting.output, expectedOutput);
                done();
            });
            // when
            useCase.execute();
        });
    });
});