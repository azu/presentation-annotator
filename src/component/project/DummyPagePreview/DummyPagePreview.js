// LICENSE : MIT
"use strict";
const React = require("react");
const PDFController = require("pdf.js-controller");
import AppLocator from "../../../AppLocator";
import {CompleteLoadingDocumentFactory} from "../../../js/UseCase/document/CompleteLoadingDocumentUseCase";
export default class DummyPagePreview extends React.PureComponent {
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
                const totalPageNumber = controller.pdfDoc.numPages;
                const context = AppLocator.context;
                context.useCase(CompleteLoadingDocumentFactory.create()).execute(totalPageNumber);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return <div className="DummyPagePreview">
            <div className="DummyPagePreview-container" ref="PDFContainer"></div>
        </div>;
    }
}
DummyPagePreview.propTypes = {
    pdfURL: React.PropTypes.string.isRequired
};
