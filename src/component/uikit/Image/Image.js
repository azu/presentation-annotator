"use strict";
import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

/*
 @example
 <button>
 <Icon> text
 </button>

 と書くとアイコンとテキストが横並びになる要素
 */
export default class Image extends React.Component {
    render() {
        return (
            // アイコンなのでaltは空にする
            <img alt={this.props.alt || ""} {...this.props} className={classNames("Image", this.props.className)} />
        );
    }
}
Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
};
