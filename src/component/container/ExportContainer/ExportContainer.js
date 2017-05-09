// LICENSE : MIT
"use strict";
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import ExportToolbar from "../../project/ExportToolbar/ExportToolbar";
import { DownloadNotesUseCaseFactory } from "../../../js/UseCase/exporting/DownloadNotesUseCase";
import  AppLocator from "../../../AppLocator";
import DownloadButton from "../../project/DownloadButton/DownloadButton";
// state
import ExportingState from "../../../js/read-store/exporting/ExportingState";
export default class ExportContainer extends React.Component {
    onClickDownload = (event) => {
        AppLocator.context.useCase(DownloadNotesUseCaseFactory.create()).execute();
    };

    render() {
        /**
         * @type {ExportingState}
         */
        const exporting = this.context.exporting;
        const isShowing = exporting.isShowing;
        const className = suitClassNames({
            component: "ExportContainer",
            states: {
                "is-showing": isShowing
            }
        });
        const preClassName = suitClassNames({
            component: "ExportContainer",
            descendant: "pre",
            states: {
                "is-showing": isShowing
            }
        });
        return <div className={className}>
            <ExportToolbar />
            <textarea value={exporting.output} className={preClassName}/>
            <DownloadButton onClick={this.onClickDownload}/>
        </div>;
    }
}

ExportContainer.contextTypes = {
    exporting: React.PropTypes.instanceOf(ExportingState).isRequired
};
