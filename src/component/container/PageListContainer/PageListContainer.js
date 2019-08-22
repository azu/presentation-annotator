// LICENSE : MIT
"use strict";
import ExportingStore from "../../../js/read-store/exporting/ExportingStore";

const PropTypes = require("prop-types");
const React = require("react");
import PageContainer from "./PageContainer/PageContainer";
import DummyPagePreview from "../../project/DummyPagePreview/DummyPagePreview";
// state
import DocumentState from "../../../js/read-store/document/DocumentState";
import ExportingState from "../../../js/read-store/exporting/ExportingState";
export default class PageListContainer extends React.Component {
    render() {
        /**
         * @type {DocumentState}
         */
        const document = this.context.document;
        /**
         * @type {ExportingState}
         */
        const exporting = this.context.exporting;
        if (!document.pdfURL) {
            return null;
        }
        if (!document.isLoaded) {
            return <DummyPagePreview pdfURL={document.pdfURL} />;
        }
        const pages = document.pages.map((page, index) => {
            return <PageContainer
                key={index}
                page={page}
                pdfURL={document.pdfURL}
                isZipping={exporting.isZipping}
            />;
        });
        return <div className="PageListContainer">{pages}</div>;
    }
}
PageListContainer.contextTypes = {
    document: PropTypes.instanceOf(DocumentState).isRequired,
    exporting: PropTypes.instanceOf(ExportingState).isRequired
};
