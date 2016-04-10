// LICENSE : MIT
"use strict";
const React = require("react");
import PageEditor from "../../../project/PageEditor/PageEditor";
import PagePreview from "../../../project/PagePreview/PagePreview";
import {Grid, GridCell} from "../../../uikit/Grid/Grid"
const suitClassNames = require("suitcss-classnames");
export default class PageContainer extends React.Component {
    render() {
        /**
         * @type {DocumentPage}
         */
        const page = this.props.page;
        const className = suitClassNames({
            component: "PageContainer",
            states: {
                marked: this.props.isMarked
            }
        });
        return <div className={className}>
            <Grid className="PageContainer-inner">
                <GridCell col="6of12" className="PageContainer-item">
                    <PagePreview
                        pdfURL={this.props.pdfURL}
                        pageNumber={page.pageNumber} />
                </GridCell>
                <GridCell col="6of12" className="PageContainer-item">
                    <PageEditor pageNumber={page.pageNumber}
                    />
                </GridCell>
            </Grid>
        </div>
    }
}
PageContainer.propTypes = {
    isMarked: React.PropTypes.bool,
    pdfURL: React.PropTypes.string.isRequired,
    page: React.PropTypes.any.isRequired
};