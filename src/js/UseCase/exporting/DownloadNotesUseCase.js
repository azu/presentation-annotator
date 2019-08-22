// MIT © 2017 azu
"use strict";
import { UseCase } from "almin";
import { Zip } from "../../domain/zip/Zip";
import documentRepository from "../../infra/DocumentRepository";
import { DownloadAPI } from "../../infra/api/DownloadAPI";
import DocumentService from "../../domain/document/DocumentService";
import { DocumentPageCapture } from "../../domain/document/DocumentPageCapture";
export class DownloadNotesUseCaseFactory {
    static create() {
        return new DownloadNotesUseCase({
            documentRepository
        });
    }
}

export default class DownloadNotesUseCase extends UseCase {
    constructor({ documentRepository }) {
        super();
        this.documentRepository = documentRepository;
    }

    execute() {
        const document = this.documentRepository.lastUsed();
        if (!document) {
            return;
        }
        const zip = new Zip();
        zip.addContent("index.md", DocumentService.toMarkdown(document));
        document.getModifiedPages().forEach(page => {
            const base64Image = DocumentPageCapture.createCapture(page);
            zip.addImage(`${page.pageNumber}.png`, base64Image);
        });
        return DownloadAPI.download(zip, "example.zip");
    }
}
