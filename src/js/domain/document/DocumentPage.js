// LICENSE : MIT
"use strict";
export default class DocumentPage {
    /**
     *
     * @param {number} pageNumber
     * @param {string} [note]
     * @param {boolean} [marked]
     */
    constructor({ pageNumber, note, marked } = {}) {
        this.pageNumber = pageNumber;
        this.note = note || "";
        this.marked = marked !== undefined ? marked : false;
    }

    /**
     * Return true if
     * - added some note
     * - or marked this page
     * @returns {boolean}
     */
    get isModified() {
        if (this.marked) {
            return true;
        }
        if (this.note.length > 0) {
            return true;
        }
    }

    /**
     * @param {string} note
     * @returns {DocumentPage}
     */
    updateNote(note) {
        return new DocumentPage(
            Object.assign({}, this, {
                note
            })
        );
    }

    /**
     * @returns {DocumentPage}
     */
    mark() {
        return new DocumentPage(
            Object.assign({}, this, {
                marked: true
            })
        );
    }

    /**
     * @returns {DocumentPage}
     */
    unMark() {
        return new DocumentPage(
            Object.assign({}, this, {
                marked: false
            })
        );
    }
}
