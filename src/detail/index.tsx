import {MuiThemeProvider} from "@material-ui/core";
import MainNavBar from "../layout/navbar";
import * as React from "react";
import * as ReactDOM from "react-dom";
import theme from "../config/theme";
import '../assets/css/index.css'

import Page from "../layout/page";
import Game from "./components/game";
import "./game.css"
function App() {
    return (
        <div>
            <Page children={
                <div>
                    <Game/>
                </div>
            }/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
