// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../../AppContextRepository";
import NewDocumentFcatory from "../../../js/UseCase/NewDocument/NewDocumentFcatory";
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
            AppContextRepository.context.execute(NewDocumentFcatory.create(pdfURL));
        };
        const document = this.props.document;
        return <form className="NewDocumentForm" onSubmit={openNewDocument}>
            <input className="NewDocumentForm-inputURL" type="text"
                   placeholder="Please input PDF URL"
                   defaultValue={document.pdfURL}
                   ref="inputURL"/>
            <input className="NewDocumentForm-submitButton" type="submit" onSubmit={openNewDocument}/>
        </form>
    }
}
NewDocumentForm.propTypes = {
    document: React.PropTypes.instanceOf(Document)
};