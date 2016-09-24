// LICENSE : MIT
"use strict";
const React = require("react");
import AppLocator from "../../AppLocator";
import {NewDocumentFactory} from "../../js/UseCase/document/NewDocumentUseCase";
// Container
import DocumentFormContainer from "./DocumentFormContainer/DocumentFormContainer";
import PageListContainer from "./PageListContainer/PageListContainer";
import ExportContainer from "./ExportContainer/ExportContainer";
// state
import DocumentState from "../../js/read-store/document/DocumentState";
import ExportingState from "../../js/read-store/exporting/ExportingState";
export default class App extends React.Component {
    static childContextTypes = {
        document: React.PropTypes.instanceOf(DocumentState).isRequired,
        exporting: React.PropTypes.instanceOf(ExportingState).isRequired
    };

    constructor(...args) {
        super(...args);
        this.state = AppLocator.context.getState();
    }

    getChildContext() {
        return Object.assign({}, this.state);
    }

    componentDidMount() {
        const context = AppLocator.context;
        // when change store, update component
        const onChangeHandler = () => {
            this.setState(context.getState());
        };
        context.onChange(onChangeHandler);
        const defaultPdfURL = "./resources/example/jser.info.pdf";
        context.useCase(NewDocumentFactory.create()).execute(defaultPdfURL);
    }

    render() {
        /**
         * @type {DocumentState}
         */
        const document = this.state.document;
        if (!document.exist) {
            return <div className="App">
                <DocumentFormContainer />
            </div>;
        }
        return <div className="App">
            <ExportContainer />
            <DocumentFormContainer />
            <PageListContainer />
        </div>;
    }
}
