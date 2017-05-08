// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
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
        const pdfClassName = suitClassNames({
            component: "PDFPagePreview-canvas",
            states: {
                "is-marked": this.props.isMarked,
                "is-modified": this.props.isMarked,
            }
        });
        return <div className="PDFPagePreview">
            <PDF className={pdfClassName}
                 file={this.props.pdfURL}
                 page={this.props.pageNumber}
                 onDocumentComplete={this.onDocumentComplete}
                 onPageComplete={this.onPageComplete}
            />
        </div>;
    }
}
PDFPagePreview.propTypes = {
    isModified: React.PropTypes.bool,
    isMarked: React.PropTypes.bool,
    pdfURL: React.PropTypes.string.isRequired,
    pageNumber: React.PropTypes.number.isRequired,
    onDocumentComplete: React.PropTypes.func,
    onPageComplete: React.PropTypes.func,
};
