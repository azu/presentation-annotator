// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../../AppContextRepository";
import DocumentUseCaseController from "../../../js/UseCaseController/DocumentUseCaseController";
export default class NewDocumentForm extends React.Component {
    render() {
        const openNewDocument = (event) => {
            event.preventDefault();
            const pdfURL = this.refs.inputURL.value;
            if (pdfURL) {
                AppContextRepository.context.execute(DocumentUseCaseController.NewDocumentUseCase(pdfURL));
            }
        };
        return <form className="NewDocumentForm" onSubmit={openNewDocument}>
            <input className="NewDocumentForm-inputURL" type="text" placeholder="pdf url" ref="inputURL"/>
            <input className="NewDocumentForm-submitButton" type="submit" onSubmit={openNewDocument}/>
        </form>
    }
}