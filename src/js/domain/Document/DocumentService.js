// LICENSE : MIT
"use strict";
export default class DocumentService {
    static stringify(document) {
        return JSON.stringify(document.pages, null, 4);
    }
}