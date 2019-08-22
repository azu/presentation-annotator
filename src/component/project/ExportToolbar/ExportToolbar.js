// LICENSE : MIT
"use strict";
const React = require("react");
import HoverBlock from "../../uikit/HoverBlock/HoverBlock";
import AppLocator from "../../../AppLocator";
import { ToggleExportDialogFactory } from "../../../js/UseCase/exporting/ToggleExportDialogUseCase";
export default class ExportToolbar extends React.PureComponent {
    showExportBox = () => {
        const context = AppLocator.context;
        context.useCase(ToggleExportDialogFactory.create()).execute();
    };
    render() {
        return (
            <HoverBlock className="ExportToolbar">
                <ul className="ExportToolbar-list">
                    <li className="ExportToolbar-listItem">
                        <buttom className="ExportToolbar-exportButton" onClick={this.showExportBox}>
                            Output JSON
                        </buttom>
                    </li>
                </ul>
            </HoverBlock>
        );
    }
}
