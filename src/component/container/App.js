// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../AppContextRepository";
import {NewDocumentFactory} from "../../js/UseCase/NewDocumentUseCase";
// Container
import DocumentFormContainer from "./DocumentFormContainer/DocumentFormContainer";
import PageListContainer from "./PageListContainer/PageListContainer";
import ExportContainer from "./ExportContainer/ExportContainer";
export default class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = AppContextRepository.context.getState();
    }

    componentDidMount() {
        const context = AppContextRepository.context;
        // when change store, update component
        const onChangeHandler = () => {
            return requestAnimationFrame(() => {
                this.setState(context.getState());
            })
        };
        context.onChange(onChangeHandler);
        const defaultPdfURL = "./resources/example/jser.info.pdf";
        context.useCase(NewDocumentFactory.create()).execute(defaultPdfURL);
    }

    render() {
        // See Each Store
        const {document, markedPageNumbers, exporting} = this.state;
        if (!document) {
            return <div className="App">
                <DocumentFormContainer document={document}/>
            </div>
        }
        return <div className="App">
            <ExportContainer output={exporting.output} isShowing={exporting.isShowing}/>
            <DocumentFormContainer document={document}/>
            <PageListContainer document={document} markedPageNumbers={markedPageNumbers}/>
        </div>
    }
}
App.propTypes = {
    documentStateStore: React.PropTypes.any
};