// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PDFPagePreview from "../PDFPagePreview/PDFPagePreview";
import {MarkClickedPageFactory} from "../../../js/UseCase/MarkClickedPageUseCase";
import AppContextRepository from "../../../AppContextRepository";
export default class PagePreview extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PagePreview",
            states: {
                active: this.props.isActive
            }
        });
        const markPage = () => {
            const pageNumber = this.props.pageNumber;
            const context = AppContextRepository.context;
            context.useCase(MarkClickedPageFactory.create()).execute(pageNumber);
        };
        return <div className={className} onClick={markPage}>
            <PDFPagePreview pdfURL={this.props.pdfURL} pageNumber={this.props.pageNumber}/>
        </div>
    }
}
PagePreview.propTypes = {
    isActive: React.PropTypes.bool,
    pdfURL: React.PropTypes.string.isRequired,
    // page image url
    pageNumber: React.PropTypes.number.isRequired
};