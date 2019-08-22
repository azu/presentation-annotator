"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");

import {Document, Page} from "react-pdf";
import PropTypes from "prop-types";
// hack for non-ascii pdf content
// dynamic loading cMap files
// https://github.com/mikecousins/react-pdf-js/issues/16

export default class PDFPagePreview extends React.Component {
    state = {
        text: ""
    };
    onDocumentComplete = (outline) => {
        if (typeof this.props.onDocumentComplete === "function") {
            this.props.onDocumentComplete(outline.numPages);
        }
    };

    onPageComplete = (page) => {
        if (typeof this.props.onPageComplete === "function") {
            this.props.onPageComplete(page.pageNumber);
        }
    };

    onGetTextSuccess = (items) => {
        const text = items.map((item) => {
            return item.str;
        }).join("\n");
        this.setState({
            text
        });
    };

    render() {
        const pdfClassName = suitClassNames({
            component: "PDFPagePreview-canvas",
            states: {
                "is-marked": this.props.isMarked,
                "is-modified": this.props.isMarked
            }
        });
        return (
            <div className="PDFPagePreview" data-page={this.props.pageNumber} data-page-text={this.state.text}>
                <Document
                    className={pdfClassName}
                    file={this.props.pdfURL}
                    onLoadSuccess={this.onDocumentComplete}
                    options={{
                        cMapUrl: "/resources/pdfjs-dist/cmaps/",
                        cMapPacked: true
                    }}
                >
                    <Page
                        width={this.props.isZipping ? undefined : 480}
                        pageNumber={this.props.pageNumber}
                        onLoadSuccess={this.onPageComplete}
                        onGetTextSuccess={this.onGetTextSuccess}
                    />
                </Document>
            </div>
        );
    }
}
PDFPagePreview.propTypes = {
    isModified: PropTypes.bool,
    isMarked: PropTypes.bool,
    isZipping: PropTypes.bool,
    pdfURL: PropTypes.string.isRequired,
    pageNumber: PropTypes.number.isRequired,
    onDocumentComplete: PropTypes.func,
    onPageComplete: PropTypes.func
};
