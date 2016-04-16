// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import ExportToolbar from "../../project/ExportToolbar/ExportToolbar";
export default class ExportContainer extends React.Component {
    render() {
        const isShowing = this.props.isShowing;
        const className = suitClassNames({
            component: "ExportContainer",
            states: {
                showing: isShowing
            }
        });
        const preClassName = suitClassNames({
            component: "ExportContainer",
            descendant: "pre",
            states: {
                showing: isShowing
            }
        });
        return <div className={className}>
            <ExportToolbar />
            <textarea value={this.props.output} className={preClassName}/>
        </div>
    }
}
ExportContainer.propTypes = {
    isShowing: React.PropTypes.bool,
    output: React.PropTypes.string
};