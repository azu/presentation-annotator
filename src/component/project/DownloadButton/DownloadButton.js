// LICENSE : MIT
"use strict";
const PropTypes = require("prop-types");
const React = require("react");
export default class DownloadButton extends React.PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <button className="DownloadButton" onClick={this.props.onClick}>
                Download notes
            </button>
        );
    }
}
