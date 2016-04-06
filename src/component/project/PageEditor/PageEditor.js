// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PageEditorTextarea from "./PageEditorTextarea";
export default class PageEditor extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PageEditor",
            states: {
                active: this.props.isActive
            }
        });
        return <div className={className}>
            <PageEditorTextarea {...this.props}/>
        </div>;
    }
};
PageEditorTextarea.propTypes = {
    pageNumber: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool
};