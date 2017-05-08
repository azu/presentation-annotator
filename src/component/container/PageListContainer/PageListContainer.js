// LICENSE : MIT
"use strict";
const React = require("react");
import PageContainer from "./PageContainer/PageContainer";
import DummyPagePreview from "../../project/DummyPagePreview/DummyPagePreview";
// state
import DocumentState from "../../../js/read-store/document/DocumentState";
import { List, WindowScroller } from "react-virtualized";
export default class PageListContainer extends React.Component {
    createRowRenderer(pages, pdfURL) {
        return function rowRenderer({
                                        key,         // Unique key within array of rows
                                        index,       // Index of row within collection
                                        isScrolling, // The List is currently being scrolled
                                        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                                        style        // Style object to be applied to row (to position it)
                                    }) {
            return (
                <PageContainer
                    key={key}
                    style={style}
                    page={pages[index]}
                    pdfURL={pdfURL}
                />
            )
        }
    }

    render() {
        /**
         * @type {DocumentState}
         */
        const document = this.context.document;
        if (!document.pdfURL) {
            return null;
        }
        if (!document.isLoaded) {
            return <DummyPagePreview pdfURL={document.pdfURL}/>;
        }
        const rowRenderer = this.createRowRenderer(document.pages, document.pdfURL);
        console.log(document.pages);
        return <div className="PageListContainer">
            <WindowScroller>
                {({ height, isScrolling, scrollTop }) => (
                    <List
                        height={height}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        rowHeight={300}
                        rowCount={document.pages.length}
                        rowRenderer={rowRenderer}
                        width={1000}
                    />
                )}
            </WindowScroller>
        </div>;
    }
}
PageListContainer.contextTypes = {
    document: React.PropTypes.instanceOf(DocumentState).isRequired
};
