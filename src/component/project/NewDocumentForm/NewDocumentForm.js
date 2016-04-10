// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../../AppContextRepository";
import {NewDocumentFactory} from "../../../js/UseCase/NewDocumentUseCase";
// domain
import Document from "../../../js/domain/Document/Document";
export default class NewDocumentForm extends React.Component {
    render() {
        const openNewDocument = (event) => {
            event.preventDefault();
            const pdfURL = this.refs.inputURL.value;
            if (!pdfURL) {
                return;
            }
            const context = AppContextRepository.context;
            context.useCase(NewDocumentFactory.create()).execute(pdfURL);
        };
        const document = this.props.document;
        const pdfURL = document ? document.pdfURL : "";
        return <form className="NewDocumentForm" onSubmit={openNewDocument}>
            <input className="NewDocumentForm-inputURL" type="text"
                   placeholder="Please input PDF URL"
                   defaultValue={pdfURL}
                   ref="inputURL"/>
            <input className="NewDocumentForm-submitButton" type="submit" onSubmit={openNewDocument}/>
        </form>
    }
}
NewDocumentForm.propTypes = {
    document: React.PropTypes.instanceOf(Document)
};