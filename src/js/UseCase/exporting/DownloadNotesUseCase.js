// MIT © 2017 azu
"use strict";
import {UseCase} from "almin";
import {Zip} from "../../domain/zip/Zip";
import documentRepository from "../../infra/DocumentRepository";
import {DownloadAPI} from "../../infra/api/DownloadAPI";
import DocumentService from "../../domain/document/DocumentService";
import {DocumentPageCapture} from "../../domain/document/DocumentPageCapture";

export class DownloadNotesUseCaseFactory {
    static create() {
        return new DownloadNotesUseCase({
            documentRepository
        });
    }
}

export const DownloadNotesUseCaseEvents = {
    StartDownloadNotesUseCase: "StartDownloadNotesUseCase",
    FinishDownloadNotesUseCase: "FinishDownloadNotesUseCase"
};
export default class DownloadNotesUseCase extends UseCase {
    constructor({documentRepository}) {
        super();
        this.documentRepository = documentRepository;
    }

    execute() {
        const document = this.documentRepository.lastUsed();
        if (!document) {
            return;
        }
        this.dispatch({
            type: DownloadNotesUseCaseEvents.StartDownloadNotesUseCase
        });
        // defer render
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const zip = new Zip();
                zip.addContent("index.md", DocumentService.toMarkdown(document));
                document.getAllPages().forEach(page => {
                    const base64Image = DocumentPageCapture.createCapture(page);
                    zip.addImage(`${page.pageNumber}.png`, base64Image);
                });
                DownloadAPI.download(zip, "slide.zip").then((() => {
                    this.dispatch({
                        type: DownloadNotesUseCaseEvents.FinishDownloadNotesUseCase
                    });
                    resolve();
                })).catch(error => {
                    reject(error);
                    this.dispatch({
                        type: Events.FinishDownloadNotesUseCase
                    });
                });
            }, 500);

        });
    }
}
