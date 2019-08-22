// LICENSE : MIT
"use strict";
const PropTypes = require("prop-types");
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import AppLocator from "../../../AppLocator";
import { UpdatePageNoteFactory } from "../../../js/UseCase/document/UpdatePageNoteUseCase";
export default class PageEditorTextarea extends React.PureComponent {
    render() {
        const savePageContent = event => {
            const content = event.target.value;
            const page = {
                note: content,
                pageNumber: this.props.pageNumber
            };
            const context = AppLocator.context;
            context.useCase(UpdatePageNoteFactory.create()).execute(page);
        };
        const className = suitClassNames({
            component: "PageEditorTextarea",
            states: {
                "is-active": this.props.isActive
            }
        });
        return <textarea
            tabIndex={this.props.pageNumber}
            placeholder="input annotation"
            className={className}
            onChange={savePageContent}/>;
    }
}

PageEditorTextarea.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    isActive: PropTypes.bool
};
