// LICENSE : MIT
"use strict";
const React = require("react");
import NewDocumentForm from "../../project/NewDocumentForm/NewDocumentForm";
import { NewDocumentFactory } from "../../../js/UseCase/document/NewDocumentUseCase";
// state
import DocumentState from "../../../js/read-store/document/DocumentState";
import AppLocator from "../../../AppLocator";
export default class DocumentFormContainer extends React.Component {
    onOpenDocument = (url) => {
        const context = AppLocator.context;
        context.useCase(NewDocumentFactory.create()).execute(url);
    };

    render() {
        /**
         * @type {DocumentState}
         */
        const document = this.context.document;
        return <div className="DocumentFormContainer">
            <div className="DocumentFormContainer-inner">
                <NewDocumentForm pdfURL={document.pdfURL}
                                 onOpenDocument={this.onOpenDocument}/>
            </div>
        </div>;
    }
}
DocumentFormContainer.contextTypes = {
    document: React.PropTypes.instanceOf(DocumentState).isRequired
};
