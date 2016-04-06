// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../AppContextRepository";
import NewDocumentUseCase from "../../js/UseCase/NewDocumentUseCase";
// Container
import DocumentFormContainer from "./DocumentFormContainer/DocumentFormContainer";
import PageListContainer from "./PageListContainer/PageListContainer";
import ExportContainer from "./ExportContainer/ExportContainer";
export default class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = this.replaceForState();
    }

    replaceForState() {
        const {exportStateStore, documentStateStore} = this.props;
        return Object.assign({},
            documentStateStore.getState(),
            exportStateStore.getState());
    }

    componentDidMount() {
        const context = AppContextRepository.context;
        // when change store, update component
        context.onChange(() => {
            this.setState(this.replaceForState());
        });
        const defaultPdfURL = "./resources/example/jser.info.pdf";
        context.execute(NewDocumentUseCase, defaultPdfURL);
    }

    render() {
        const {document, exporting} = this.state;
        return <div className="App">
            <ExportContainer output={exporting.output} isShowing={exporting.isShowing}/>
            <DocumentFormContainer document={document}/>
            <PageListContainer document={document}/>
        </div>
    }
}
App.propTypes = {
    documentStateStore: React.PropTypes.any
};