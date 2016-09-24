// LICENSE : MIT
"use strict";
const React = require("react");
import AppLocator from "../../../AppLocator";
import {NewDocumentFactory} from "../../../js/UseCase/document/NewDocumentUseCase";
export default class NewDocumentForm extends React.PureComponent {
    render() {
        const openNewDocument = (event) => {
            event.preventDefault();
            const pdfURL = this.refs.inputURL.value;
            if (!pdfURL) {
                return;
            }
            const context = AppLocator.context;
            context.useCase(NewDocumentFactory.create()).execute(pdfURL);
        };
        const pdfURL = this.props.pdfURL || "";
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
    pdfURL: React.PropTypes.string
};