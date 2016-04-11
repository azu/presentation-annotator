// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import ShowExportDialogUseCase from "../../src/js/UseCase/ShowExportDialogUseCase";
import Document from "../../src/js/domain/Document/Document";
import DocumentService from "../../src/js/domain/Document/DocumentService";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import DomainEventEmitter from "../../src/js/framework/domain/DomainEventEmitter";
import DomainEventAggregator from "../../src/js/framework/domain/DomainEventAggregator";
import ExportStateStore from "../../src/js/read-store/exporting/ExportStateStore";
import eventDelegate from "../utils/EventDelegate"
describe("ShowExportDialogUseCase", function () {
    context("when execute", function () {
        it("UseCase dispatch with output", function () {
            // mock event emitter
            const domainEventEmitter = new DomainEventEmitter();
            DomainEventAggregator.setEventEmitterForTesting(domainEventEmitter);
            const documentRepository = new DocumentRepository();
            const document = new Document();
            const expectedOutput = DocumentService.stringify(document);
            documentRepository.save(document);
            const useCase = new ShowExportDialogUseCase({documentRepository});
            useCase.onDispatch((key, output) => {
                assert(ShowExportDialogUseCase.name);
                assert.equal(expectedOutput, output);
            });
            return useCase.execute();
        });
        it("State receive dispatched output", function (done) {
            // Given
            const domainEventEmitter = new DomainEventEmitter();
            DomainEventAggregator.setEventEmitterForTesting(domainEventEmitter);
            const documentRepository = new DocumentRepository();
            const document = new Document();
            const expectedOutput = DocumentService.stringify(document);
            documentRepository.save(document);
            const store = new ExportStateStore({documentRepository});
            // then
            const useCase = new ShowExportDialogUseCase({documentRepository});
            eventDelegate(useCase, store);
            store.onChange(() => {
                const state = store.getState();
                assert.strictEqual(state.exporting.output, expectedOutput);
                done();
            });
            // when
            return useCase.execute();
        });
    });
});