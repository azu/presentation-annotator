"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");

// LICENSE : MIT
import PropTypes from "prop-types";

import PDF from "react-pdf-js";
// hack for non-ascii pdf content
// dynamic loading cMap files
// https://github.com/mikecousins/react-pdf-js/issues/16
window.PDFJS.cMapUrl = `/resources/pdfjs-dist/cmaps/`;
window.PDFJS.cMapPacked = true;

export default class PDFPagePreview extends React.Component {
    onDocumentComplete = pages => {
        if (typeof this.props.onDocumentComplete === "function") {
            this.props.onDocumentComplete(pages);
        }
    };

    onPageComplete = page => {
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
                "is-modified": this.props.isMarked
            }
        });
        return (
            <div className="PDFPagePreview" data-page={this.props.pageNumber}>
                <PDF
                    className={pdfClassName}
                    file={this.props.pdfURL}
                    page={this.props.pageNumber}
                    onDocumentComplete={this.onDocumentComplete}
                    onPageComplete={this.onPageComplete}
                />
            </div>
        );
    }
}
PDFPagePreview.propTypes = {
    isModified: PropTypes.bool,
    isMarked: PropTypes.bool,
    pdfURL: PropTypes.string.isRequired,
    pageNumber: PropTypes.number.isRequired,
    onDocumentComplete: PropTypes.func,
    onPageComplete: PropTypes.func
};
