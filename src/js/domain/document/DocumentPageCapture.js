// MIT © 2017 azu
"use strict";
export class DocumentPageCapture {
    /**
     * @param {DocumentPage} page
     * @return {string| null}
     */
    static createCapture(page) {
        const canvas = document.querySelector(`[data-page="${page.pageNumber}"] canvas`);
        if (!canvas) {
            return null;
        }
        // remove prefix
        return canvas.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, "");
    }
}