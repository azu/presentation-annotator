// LICENSE : MIT
"use strict";
const React = require("react");
import PageEditor from "../../../project/PageEditor/PageEditor";
import PagePreview from "../../../project/PagePreview/PagePreview";
import {Grid, GridCell} from "../../../uikit/Grid/Grid"
export default class PageContainer extends React.Component {
    render() {
        /**
         * @type {DocumentPage}
         */
        const page = this.props.page;
        return <div className="PageContainer">
            <Grid className="PageContainer-inner">
                <GridCell col="6of12" className="PageContainer-item">
                    <PagePreview
                        pdfURL={this.props.pdfURL}
                        pageNumber={page.pageNumber}
                        isActive={this.props.isActive}/>
                </GridCell>
                <GridCell col="6of12" className="PageContainer-item">
                    <PageEditor isActive={this.props.isActive}/>
                </GridCell>
            </Grid>
        </div>
    }
}
PageContainer.propTypes = {
    isActive: React.PropTypes.bool,
    pdfURL: React.PropTypes.string.isRequired,
    page: React.PropTypes.any.isRequired
};