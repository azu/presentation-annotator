// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import AppContextRepository from "../../../AppContextRepository";
import {UpdatePageNoteFactory} from "../../../js/UseCase/UpdatePageNoteUseCase";
export default class PageEditorTextarea extends React.Component {
    render() {
        const savePageContent = (event) => {
            const content = event.target.value;
            const page = {
                note: content,
                pageNumber: this.props.pageNumber
            };
            const context = AppContextRepository.context;
            context.useCase(UpdatePageNoteFactory.create()).execute(page);
        };
        const className = suitClassNames({
            component: "PageEditorTextarea",
            states: {
                active: this.props.isActive
            }
        });
        return <textarea placeholder="input annotation" className={className}
                         onChange={savePageContent}>

        </textarea>
    }
}

PageEditorTextarea.propTypes = {
    pageNumber: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool
};