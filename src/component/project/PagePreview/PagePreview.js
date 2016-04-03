// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import Image from "../../uikit/Image/Image";
export default class PagePreview extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PagePreview",
            states: {
                active: this.props.isActive
            }
        });
        return <div className={className}>
            <Image className="PagePreview-image" src={this.props.imageSrc}/>
        </div>
    }
}
PagePreview.propTypes = {
    isActive: React.PropTypes.bool,
    // page image url
    imageSrc: React.PropTypes.string.isRequired
};