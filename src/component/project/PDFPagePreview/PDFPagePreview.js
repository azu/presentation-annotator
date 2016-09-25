// LICENSE : MIT
"use strict";
const React = require("react");
const PDFController = require("pdf.js-controller");
export default class PDFPagePreview extends React.PureComponent {
    constructor() {
        super();
        this.PDFContainer = null;
    }

    componentDidMount() {
        const container = this.PDFContainer;
        if (!container) {
            return;
        }
        const controller = new PDFController({
            container: container,
            pageNumber: this.props.pageNumber,
            // path to dir of pdfjs-dist
            pdfjsDistDir: "./resources/pdfjs-dist/"
        });
        const PDFURL = this.props.pdfURL;
        controller.loadDocument(PDFURL)
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return <div className="PDFPagePreview">
            <div className="PDFPagePreview-container" ref={(c) => this.PDFContainer = c}></div>
        </div>;
    }
}
PDFPagePreview.propTypes = {
    pdfURL: React.PropTypes.string.isRequired,
    // page image url
    pageNumber: React.PropTypes.number.isRequired
};
