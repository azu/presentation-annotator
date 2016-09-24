// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import ExportToolbar from "../../project/ExportToolbar/ExportToolbar";
// state
import ExportingState from "../../../js/read-store/exporting/ExportingState";
export default class ExportContainer extends React.Component {
    render() {
        /**
         * @type {ExportingState}
         */
        const exporting = this.context.exporting;
        const isShowing = exporting.isShowing;
        const className = suitClassNames({
            component: "ExportContainer",
            states: {
                "is-showing": isShowing
            }
        });
        const preClassName = suitClassNames({
            component: "ExportContainer",
            descendant: "pre",
            states: {
                "is-showing": isShowing
            }
        });
        return <div className={className}>
            <ExportToolbar />
            <textarea value={exporting.output} className={preClassName}/>
        </div>
    }
}

ExportContainer.contextTypes = {
    exporting: React.PropTypes.instanceOf(ExportingState).isRequired
};