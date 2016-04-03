// LICENSE : MIT
"use strict";
const React = require("react");
import PageContainer from "./PageContainer/PageContainer";
export default class App extends React.Component {
    render() {
        return <div className="App">
            <div className="PageList">
                <PageContainer pageNumber={1} isActive={true}/>
                <PageContainer pageNumber={2}/>
            </div>
        </div>
    }
}