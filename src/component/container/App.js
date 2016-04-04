// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../AppContextRepository";
import DocumentUseCaseController from "../../js/UseCaseController/DocumentUseCaseController";
// Container
import DocumentFormContainer from "./DocumentFormContainer/DocumentFormContainer";
import PageListContainer from "./PageListContainer/PageListContainer";
export default class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = this.replaceForState();
    }

    replaceForState() {
        const documentStateStore = this.props.documentStateStore;
        return Object.assign({}, documentStateStore.getState());
    }

    componentDidMount() {
        const context = AppContextRepository.context;
        // when change store, update component
        context.onChange(() => {
            this.setState(this.replaceForState());
        });
        const defaultPdfURL = "./resources/example/jser.info.pdf";
        context.execute(DocumentUseCaseController.NewDocumentUseCase(defaultPdfURL));
    }

    render() {
        const document = this.state.document;
        return <div className="App">
            <DocumentFormContainer document={document}/>
            <PageListContainer document={document}/>
        </div>
    }
}
App.propTypes = {
    documentStateStore: React.PropTypes.any
};