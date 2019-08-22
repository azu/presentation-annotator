// MIT © 2017 azu
"use strict";
import { ZipDirectory } from "./ZipDirectory";
import { ZipFile, ZipFileType } from "./ZipFile";
export class Zip {
    name;

    textDirectory = new ZipDirectory("text", "./");
    imageDirectory = new ZipDirectory("images", "./images");

    /**
     *
     * @type {Array.<ZipDirectory>}
     */
    collection = [this.textDirectory, this.imageDirectory];

    constructor(name) {
        this.name = name;
    }

    addContent(fileName, content) {
        const file = new ZipFile({
            name: fileName,
            content,
            type: ZipFileType.Text
        });
        this.textDirectory.addFile(file);
    }

    /**
     * add image as  /img/*.png
     * @param {string}  fileName
     * @param {string} base64Content base64 content
     */
    addImage(fileName, base64Content) {
        const file = new ZipFile({
            name: fileName,
            content: base64Content,
            type: ZipFileType.Image
        });
        this.imageDirectory.addFile(file);
    }
}
