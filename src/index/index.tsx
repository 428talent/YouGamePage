import * as React from "react";
import * as ReactDOM from "react-dom";
import '../assets/css/index.css'
import Banner from "./components/banner";
import SaleGameSection from "./components/sale-game";
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
