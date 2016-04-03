// LICENSE : MIT
"use strict";
const React = require("react");
const PDFController = require("pdf.js-controller");
export default class DummyPagePreview extends React.Component {
    componentDidMount() {
        const container = this.refs.PDFContainer;
        const controller = new PDFController({
            container: container,
            // path to dir of pdfjs-dist
            pdfjsDistDir: "./resources/pdfjs-dist/"
        });
        const PDFURL = this.props.pdfURL;
        controller.loadDocument(PDFURL)
            .then(() => {
                const totalPageNum = controller.pdfDoc.numPages;
                console.log(totalPageNum);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return <div className="DummyPagePreview">
            <div className="DummyPagePreview-container" ref="PDFContainer"></div>
        </div>
    }
}
DummyPagePreview.propTypes = {
    pdfURL: React.PropTypes.string.isRequired
};