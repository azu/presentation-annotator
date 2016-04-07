// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../AppContextRepository";
import NewDocumentFcatory from "../../js/UseCase/NewDocument/NewDocumentFcatory";
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
        /**
         * @type {ReadAggregate}
         */
        const readAggregate = this.props.readAggregate;
        return readAggregate.getState();
    }

    componentDidMount() {
        const context = AppContextRepository.context;
        // when change store, update component
        const onChangeHandler = () => {
            return requestAnimationFrame(() => {
                this.setState(this.replaceForState());
            })
        };
        context.onChange(onChangeHandler);
        const defaultPdfURL = "./resources/example/jser.info.pdf";
        context.execute(NewDocumentFcatory.create(defaultPdfURL));
    }

    render() {
        // See Each Store
        const {document, exporting} = this.state;
        if (!document) {
            return <div className="App">
                <DocumentFormContainer document={document}/>
            </div>
        }
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