import * as React from "react";
import * as ReactDOM from "react-dom";
import '../assets/css/index.css'
import Page from "../layout/page";
import Setting from "./index";

function App() {
    return (
        <div>
            <Page children={
                <div>
                    <Setting/>
                </div>
            }/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
