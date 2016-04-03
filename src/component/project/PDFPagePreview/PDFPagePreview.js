// LICENSE : MIT
"use strict";
const React = require("react");
const PDFController = require("pdf.js-controller");
export default class PDFPagePreview extends React.Component {
    componentDidMount() {
        const container = this.refs.PDFContainer;
        const controller = new PDFController({
            container: container,
            // path to dir of pdfjs-dist
            pdfjsDistDir: __dirname + "/node_modules/pdfjs-dist/"
        });
        const PDFURL = this.props.pdfURL;
        controller.loadDocument(PDFURL)
            .then(() => {
                controller.renderPage(this.props.pageNumber)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return <div className="PDFPagePreview">
            <div className="PDFPagePreview-container" ref="PDFContainer"></div>
        </div>
    }
}
PDFPagePreview.propTypes = {
    pdfURL: React.PropTypes.string.isRequired,
    // page image url
    pageNumber: React.PropTypes.number.isRequired
};