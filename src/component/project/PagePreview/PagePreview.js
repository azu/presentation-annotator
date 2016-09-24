// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PDFPagePreview from "../PDFPagePreview/PDFPagePreview";
import {MarkPageUseCaseFactory} from "../../../js/UseCase/document/MarkPageUseCase";
import AppLocator from "../../../AppLocator";
export default class PagePreview extends React.PureComponent {
    render() {
        const className = suitClassNames({
            component: "PagePreview",
            states: {
                "is-active": this.props.isActive
            }
        });
        const markPage = () => {
            const pageNumber = this.props.pageNumber;
            const context = AppLocator.context;
            context.useCase(MarkPageUseCaseFactory.create()).execute(pageNumber);
        };
        return <div className={className} onClick={markPage}>
            <PDFPagePreview pdfURL={this.props.pdfURL} pageNumber={this.props.pageNumber}/>
        </div>;
    }
}
PagePreview.propTypes = {
    isActive: React.PropTypes.bool,
    pdfURL: React.PropTypes.string.isRequired,
    // page image url
    pageNumber: React.PropTypes.number.isRequired
};
