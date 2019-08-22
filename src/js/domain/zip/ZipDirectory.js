// MIT © 2017 azu
"use strict";
import {ZipFile} from "./ZipFile";
export class ZipDirectory {
    /**
     *
     * @type {Array.<ZipFile>}
     */
    files = [];

    name;
    dirPath;

    /**
     *
     * @param {string} dirName directory name
     * @param {string} dirPath directory path
     */
    constructor(dirName, dirPath) {
        this.name = dirName;
        this.dirPath = dirPath;
    }

    /**
     *
     * @param {ZipFile} file
     */
    addFile(file) {
        this.files = this.files.concat(file);
    }

    /**
     * @returns {boolean}
     */
    get isRootDir() {
        return this.dirPath === "./" || this.dirPath === ".";
    }
}
