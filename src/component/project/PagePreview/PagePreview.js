// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PDFPagePreview from "../PDFPagePreview/PDFPagePreview";
export default class PagePreview extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PagePreview",
            states: {
                active: this.props.isActive
            }
        });
        return <div className={className}>
            <PDFPagePreview pdfURL={this.props.pdfURL} pageNumber={this.props.pageNumber}/>
        </div>
    }
}
PagePreview.propTypes = {
    isActive: React.PropTypes.bool,
    pdfURL: React.PropTypes.string.isRequired,
    // page image url
    pageNumber: React.PropTypes.number.isRequired
};