// LICENSE : MIT
"use strict";
export default class DocumentService {
    static stringify(document) {
        if (!document) {
            return "";
        }
        if (!document.pages) {
            return "";
        }
        return JSON.stringify(document.pages, null, 4);
    }
}
