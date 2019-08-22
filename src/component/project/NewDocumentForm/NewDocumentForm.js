"use strict";
const React = require("react");

// LICENSE : MIT
import PropTypes from "prop-types";

import FileInput from "react-simple-file-input";

const allowedFileTypes = ["application/pdf"];

function fileIsIncorrectFiletype(file) {
    return allowedFileTypes.indexOf(file.type) === -1;
}

export default class NewDocumentForm extends React.PureComponent {
    cancelButtonClicked = () => {
        return this.state.cancelButtonClicked;
    };

    resetCancelButtonClicked = () => {
        this.setState({cancelButtonClicked: false});
    };

    showInvalidFileTypeMessage = file => {
        window.alert("Tried to upload invalid filetype " + file.type);
    };

    showProgressBar = () => {
        this.setState({progressBarVisible: true});
    };

    updateProgressBar = event => {
        this.setState({
            progressPercent: (event.loaded / event.total) * 100
        });
    };

    onLoadFile = (event, file) => {
        const blobURL = URL.createObjectURL(file);
        this.props.onOpenDocument(blobURL);
        this.setState({
            progressPercent: 0,
            progressBarVisible: false
        });
    };

    onSubmitNewDocument = event => {
        event.preventDefault();
        const pdfURL = this.refs.inputURL.value;
        if (!pdfURL) {
            return;
        }
        this.props.onOpenDocument(pdfURL);
    };

    constructor() {
        super();
        this.state = {
            progressPercent: 0,
            progressBarVisible: false
        };
    }

    render() {
        const pdfURL = this.props.pdfURL || "";
        return (
            <form className="NewDocumentForm" onSubmit={this.onSubmitNewDocument}>
                <span>{this.state.progressBarVisible ? `${this.state.progressPercent}%` : ""}</span>
                <div className={"NewDocumentForm-inputs"}>
                    <input
                        className="NewDocumentForm-inputURL"
                        type="text"
                        placeholder="Input pdf url"
                        defaultValue={pdfURL}
                        ref="inputURL"
                    />
                    <input
                        className="NewDocumentForm-submitButton"
                        type="submit"
                        onSubmit={this.onSubmitNewDocument}
                        value="Load"
                    />
                    <label>
                        <FileInput
                            readAs="buffer"
                            style={{display: "none"}}
                            onLoadStart={this.showProgressBar}
                            onLoad={this.onLoadFile}
                            onProgress={this.updateProgressBar}
                            cancelIf={fileIsIncorrectFiletype}
                            abortIf={this.cancelButtonClicked}
                            onCancel={this.showInvalidFileTypeMessage}
                            onAbort={this.resetCancelButtonClicked}
                        />
                        <span className={"NewDocumentForm-uploadButton"}>Upload</span>
                    </label>
                </div>
            </form>
        );
    }
}
NewDocumentForm.propTypes = {
    pdfURL: PropTypes.string,
    onOpenDocument: PropTypes.func.isRequired
};
