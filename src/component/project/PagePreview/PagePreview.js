// LICENSE : MIT
"use strict";
const PropTypes = require("prop-types");
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PDFPagePreview from "../PDFPagePreview/PDFPagePreview";
import { MarkPageUseCaseFactory } from "../../../js/UseCase/document/MarkPageUseCase";
import AppLocator from "../../../AppLocator";
export default class PagePreview extends React.PureComponent {
    render() {
        const className = suitClassNames({
            component: "PagePreview",
            states: {
                "is-marked": this.props.isMarked,
                "is-modified": this.props.isModified
            }
        });
        const markPage = () => {
            const pageNumber = this.props.pageNumber;
            const context = AppLocator.context;
            context.useCase(MarkPageUseCaseFactory.create()).execute(pageNumber);
        };
        return (
            <div className={className} onClick={markPage}>
                <PDFPagePreview
                    pdfURL={this.props.pdfURL}
                    pageNumber={this.props.pageNumber}
                    isMarked={this.props.isMarked}
                    isModified={this.props.isModified}
                    isZipping={this.props.isZipping}
                />
            </div>
        );
    }
}
PagePreview.propTypes = {
    isModified: PropTypes.bool,
    isMarked: PropTypes.bool,
    isZipping: PropTypes.bool,
    pdfURL: PropTypes.string.isRequired,
    // page image url
    pageNumber: PropTypes.number.isRequired
};
