// LICENSE : MIT
"use strict";
const React = require("react");
import NewDocumentForm from "../../project/NewDocumentForm/NewDocumentForm";
export default class DocumentFormContainer extends React.Component {
    render() {
        return <div className="DocumentFormContainer">
            <div className="DocumentFormContainer-inner">
                <NewDocumentForm />
            </div>
        </div>
    }
}