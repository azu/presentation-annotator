// LICENSE : MIT
"use strict";
export default class DocumentPage {
    /**
     * @param {{pageNumber: number, [note]: string}} [object]
     */
    constructor(object = {}) {
        this.pageNumber = object.pageNumber;
        this.note = object.note || "";
    }
}