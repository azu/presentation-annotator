// MIT © 2017 azu
"use strict";
const assert = require("assert");
export const ZipFileType = {
    Text: "Text",
    Image: "Image"
};
export class ZipFile {
    /**
     *
     * @param {string} name
     * @param {string} content
     * @param {string} type
     */
    constructor({ name, content, type }) {
        this.name = name;
        this.content = content;
        assert(ZipFileType[type] !== undefined, "type should be ZipFileType");
        this.type = type;
    }
}
