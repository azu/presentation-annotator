// LICENSE : MIT
"use strict";
const React = require("react");
import NewDocumentForm from "../../project/NewDocumentForm/NewDocumentForm";
// state
import DocumentState from "../../../js/read-store/document/DocumentState";

export default class DocumentFormContainer extends React.Component {
    render() {
        /**
         * @type {DocumentState}
         */
        const document = this.context.document;
        return <div className="DocumentFormContainer">
            <div className="DocumentFormContainer-inner">
                <NewDocumentForm pdfURL={document.pdfURL}/>
            </div>
        </div>;
    }
}
DocumentFormContainer.contextTypes = {
    document: React.PropTypes.instanceOf(DocumentState).isRequired
};
