import * as React from "react";
import '../assets/css/index.css'
import Banner from "./components/banner";
import SaleGameSection from "./components/sale-game";
import GameList from "./components/game-rank";
import withRouter from "umi/withRouter";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <Banner/>
                <SaleGameSection/>
                <GameList/>
            </div>
        )
    }
}

export default withRouter(Home)
