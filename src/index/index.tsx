import {MuiThemeProvider} from "@material-ui/core";
import MainNavBar from "../layout/navbar";
import * as React from "react";
import * as ReactDOM from "react-dom";
import theme from "../config/theme";
import '../assets/css/index.css'
import Banner from "./components/banner";
import ContentBar from "./components/content-bar";
import SaleGameSection from "./components/sale-game";
import Footer from "../layout/footer";
import GameList from "./components/game-rank";
import Page from "../layout/page";

function App() {
    return (
        <div>
            <Page children={
                <div>
                    <Banner/>
                    <SaleGameSection/>
                    <GameList/>
                </div>
            }/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
