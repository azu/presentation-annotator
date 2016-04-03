// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
export default class PageEditorTextarea extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PageEditorTextarea",
            states: {
                active: this.props.isActive
            }
        });
        return <textarea placeholder="input annotation" className={className}>

        </textarea>
    }
}

PageEditorTextarea.propTypes = {isActive: React.PropTypes.bool};