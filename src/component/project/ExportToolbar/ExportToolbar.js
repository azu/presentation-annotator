// LICENSE : MIT
"use strict";
const React = require("react");
import HoverBlock from "../../uikit/HoverBlock/HoverBlock";
import AppContextRepository from "../../../AppContextRepository";
import {ShowExportDialogFactory} from "../../../js/UseCase/ShowExportDialogUseCase";
export default class ExportToolbar extends React.Component {
    render() {
        const ShowExportBox = () => {
            const context = AppContextRepository.context;
            context.useCase(ShowExportDialogFactory.create()).execute();
        };
        return <HoverBlock className="ExportToolbar">
            <ul className="ExportToolbar-list">
                <li className="ExportToolbar-listItem">
                    <buttom className="ExportToolbar-exportButton"
                            onClick={ShowExportBox}>Output JSON
                    </buttom>
                </li>
            </ul>
        </HoverBlock>
    }
}