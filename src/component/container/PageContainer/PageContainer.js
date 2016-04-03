// LICENSE : MIT
"use strict";
const React = require("react");
import PageEditor from "../../project/PageEditor/PageEditor";
import PagePreview from "../../project/PagePreview/PagePreview";
import {Grid, GridCell} from "../../uikit/Grid/Grid"
export default class PageContainer extends React.Component {
    render() {
        return <div className="PageContainer">
            <Grid className="PageContainer-inner">
                <GridCell col="6of12" className="PageContainer-item">
                    <PagePreview
                        pdfURL="./resources/example/jser.info.pdf"
                        pageNumber={this.props.pageNumber}
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
    isActive: React.PropTypes.bool
};