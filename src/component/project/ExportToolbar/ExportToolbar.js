// LICENSE : MIT
"use strict";
const React = require("react");
import AppContextRepository from "../../../AppContextRepository";
import ExportUseCaseController from "../../../js/UseCaseController/ExportUseCaseController";
export default class ExportToolbar extends React.Component {
    render() {
        const ShowExportBox = () => {
            AppContextRepository.context.execute(ExportUseCaseController.ShowExportDialogUseCase());
        };
        return <div className="ExportToolbar">
            <ul>
                <li>
                    <buttom className="ExportToolbar-exportButton"
                            onClick={ShowExportBox}>Output JSON
                    </buttom>
                </li>
            </ul>
        </div>
    }
}