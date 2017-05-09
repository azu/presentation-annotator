// LICENSE : MIT
"use strict";
const React = require("react");
import AppLocator from "../../../AppLocator";
import { CompleteLoadingDocumentFactory } from "../../../js/UseCase/document/CompleteLoadingDocumentUseCase";
import PDFPagePreview from "../PDFPagePreview/PDFPagePreview";
export default class DummyPagePreview extends React.PureComponent {

    onDocumentComplete = (pages) => {
        const totalPageNumber = pages;
        const context = AppLocator.context;
        context.useCase(CompleteLoadingDocumentFactory.create()).execute(totalPageNumber);
    };

    render() {
        return <div className="DummyPagePreview">
            {/* load 0 page to search page numbers */}
            <PDFPagePreview pdfURL={this.props.pdfURL}
                            pageNumber={1}
                            onDocumentComplete={this.onDocumentComplete}
            />
        </div>;
    }
}
DummyPagePreview.propTypes = {
    pdfURL: React.PropTypes.string.isRequired
};
