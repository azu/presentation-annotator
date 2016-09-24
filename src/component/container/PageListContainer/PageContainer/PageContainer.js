// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PageEditor from "../../../project/PageEditor/PageEditor";
import PagePreview from "../../../project/PagePreview/PagePreview";
import {Grid, GridCell} from "../../../uikit/Grid/Grid"
// type
import DocumentPage from "../.././../../js/domain/Document/DocumentPage";
export default class PageContainer extends React.Component {
    render() {
        /**
         * @type {DocumentPage}
         */
        const page = this.props.page;
        const className = suitClassNames({
            component: "PageContainer",
            states: {
                marked: page.marked
            }
        });
        return <div className={className}>
            <Grid className="PageContainer-inner">
                <GridCell col="6of12" className="PageContainer-item">
                    <PagePreview
                        pdfURL={this.props.pdfURL}
                        pageNumber={page.pageNumber}/>
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
    pdfURL: React.PropTypes.string.isRequired,
    page: React.PropTypes.instanceOf(DocumentPage).isRequired
};