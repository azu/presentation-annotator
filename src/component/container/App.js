// LICENSE : MIT
"use strict";
const React = require("react");
import PageContainer from "./PageContainer/PageContainer";
export default class App extends React.Component {
    render() {
        return <div className="App">
            <PageContainer isActive={true} />
            <PageContainer />
        </div>
    }
}