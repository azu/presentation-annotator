// LICENSE : MIT
"use strict";
const React = require("react");
export default class DownloadButton extends React.PureComponent {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired
    };

    render() {
        return <buttom className="DownloadButton"
                       onClick={this.props.onClick}>
            Download notes
        </buttom>;
    }
}
