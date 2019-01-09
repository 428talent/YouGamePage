import * as React from "react";
import '../assets/css/index.css'
import Banner from "./components/banner";
import SaleGameSection from "./components/sale-game";
import GameList from "./components/game-rank";
import withRouter from "umi/withRouter";
import {Paper, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <div style={{
                    position: "absolute",
                    marginTop: 100,
                    zIndex: 100,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                </div>
                <Banner/>

                <SaleGameSection/>
                <GameList/>
            </div>
        )
    }
}

export default withRouter(Home)
