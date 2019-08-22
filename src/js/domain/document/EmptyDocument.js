// LICENSE : MIT
"use strict";
import Document from "./Document";
export default class EmptyDocument extends Document {
    constructor({ pdfURL }) {
        super({
            pdfURL,
            pages: []
        });
    }
}
