// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import ShowExportDialogUseCase from "../../src/js/UseCase/ShowExportDialogUseCase";
import Document from "../../src/js/domain/Document/Document";
import DocumentService from "../../src/js/domain/Document/DocumentService";
import {DocumentRepository} from "../../src/js/infra/DocumentRepository";
import DomainEventEmitter from "../../src/js/framework/domain/DomainEventEmitter";
import DomainEventAggregator from "../../src/js/framework/domain/DomainEventAggregator";
describe("ShowExportDialogUseCase", function () {
    context("execute", function () {
        it("should dispatch with output", function () {
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
    });
});