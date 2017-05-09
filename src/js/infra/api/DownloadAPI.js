// MIT © 2017 azu
"use strict";
const JSZip = require("jszip");
const FileSaver = require('file-saver');
import { ZipFileType } from "../../domain/zip/ZipFile";
export class DownloadAPI {
    /**
     * @param {Zip} zipData
     * @param {string} zipName
     */
    static download(zipData, zipName) {
        const zip = new JSZip();
        zipData.collection.forEach(directory => {
            const folder = directory.isRootDir ? zip : zip.folder(directory.dirPath);
            directory.files.forEach(file => {
                if (file.type === ZipFileType.Image) {
                    folder.file(file.name, file.content, { base64: true });
                } else {
                    folder.file(file.name, file.content);
                }
            });
        });
        return zip.generateAsync({ type: "blob" })
        .then(function(content) {
            // see FileSaver.js
            FileSaver.saveAs(content, zipName);
        });
    }
}