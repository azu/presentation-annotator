// LICENSE : MIT
"use strict";
const React = require("react");
import PageContainer from "./PageContainer/PageContainer";
import DummyPagePreview from "../../project/DummyPagePreview/DummyPagePreview";
export default class PageListContainer extends React.Component {
    render() {
        const document = this.props.document;
        /**
         * @type {number[]}
         */
        const markedPageNumbers = this.props.markedPageNumbers;
        if(!document.pdfURL) {
            return <div></div>;
        }
        if (!document.isLoaded) {
            return <DummyPagePreview pdfURL={document.pdfURL}/>
        }
        const pages = document.getAllPages().map((page, index) => {
            const isMarked = markedPageNumbers.includes(page.pageNumber);
            return <PageContainer
                key={index}
                page={page}
                pdfURL={document.pdfURL}
                isMarked={isMarked}
            />
        });
        return <div className="PageListContainer">
            {pages}
        </div>
    }
}
PageListContainer.propTypes = {
    document: React.PropTypes.any
};