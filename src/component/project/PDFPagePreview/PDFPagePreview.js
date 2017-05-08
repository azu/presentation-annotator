// LICENSE : MIT
"use strict";
const React = require("react");
import PDF from "react-pdf-js";
// hack for non-ascii pdf content
// dynamic loading cMap files
// https://github.com/mikecousins/react-pdf-js/issues/16
window.PDFJS.cMapUrl = `/resources/pdfjs-dist/cmaps/`;
window.PDFJS.cMapPacked = true;

export default class PDFPagePreview extends React.Component {
    onDocumentComplete = (pages) => {
        if (typeof this.props.onDocumentComplete === "function") {
            this.props.onDocumentComplete(pages);
        }
    };

    onPageComplete = (page) => {
        if (typeof this.props.onPageComplete === "function") {
            this.props.onPageComplete(page);
        }
    };

    constructor() {
        super();
    }

    render() {
        return <div className="PDFPagePreview">
            <PDF className="pdf-canvas"
                 file={this.props.pdfURL}
                 page={this.props.pageNumber}
                 onDocumentComplete={this.onDocumentComplete}
                 onPageComplete={this.onPageComplete}
            />
        </div>;
    }
}
PDFPagePreview.propTypes = {
    pdfURL: React.PropTypes.string.isRequired,
    pageNumber: React.PropTypes.number.isRequired,
    onDocumentComplete: React.PropTypes.func,
    onPageComplete: React.PropTypes.func,
};
