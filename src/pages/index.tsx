import * as React from "react";
import {Component} from 'react'
import '../assets/css/index.css';
import Banner from "./components/banner";
import SaleGameSection from "./components/sale-game";
import GameList from "./components/game-rank";
import withRouter from "umi/withRouter";
import {connect} from "dva";
import BaseProps from "../base/props";
import {ServerUrl} from "../config/api";
import CustomizedTabs from "./components/game-rank";
import {Typography} from "@material-ui/core";

interface HomePageProps extends BaseProps {
    collections: any;
}

class Home extends Component<HomePageProps, {}> {
    renderNewGame() {
        const newGameCollection = this.props.collections.find(collection => collection.name === "newgame");
        if(newGameCollection) {
            return (
                <SaleGameSection
                    title={"新游戏"}
                    games={newGameCollection.games.map(game => ({
                        cover: `${ServerUrl}/${game.band}`,
                        price: game.price,
                        name: game.name,
                        id:game.id,
                    }))}/>
            );
        }
    }

    renderRecommend() {
        const newGameCollection = this.props.collections.find(
            collection => collection.name === "recommend",
        );
        if(newGameCollection) {
            return (
                <SaleGameSection
                    title={"特别推荐"}
                    games={newGameCollection.games.map(game => ({
                        cover: `${ServerUrl}/${game.band}`,
                        price: game.price,
                        name: game.name,
                        id:game.id,
                    }))}/>
            );
        }
    }

    renderGameCollections(){
        const collections : any[] = this.props.collections
        return collections.map(collection => (
            <SaleGameSection
                title={collection.title}
                games={collection.games.map(game => ({
                    cover: `${ServerUrl}/${game.band}`,
                    price: game.price,
                    name: game.name,
                    id:game.id,
                }))}/>
        ))
    }

    render(): React.ReactNode {
        const {collections} = this.props;
        console.log(collections);
        return (
            <div>
                <div style={{
                    position: "absolute",
                    marginTop: 100,
                    zIndex: 100,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                </div>
                <Banner/>

                {/*{this.renderNewGame()}*/}
                {/*{this.renderRecommend()}*/}
                {this.renderGameCollections()}
                <Typography variant="h5" gutterBottom style={{marginTop:56,paddingLeft:300,paddingRight:300}}>
                    探索
                </Typography>
                <CustomizedTabs/>
                {/*<GameList/>*/}
            </div>
        );
    }
}

// @ts-ignore
export default connect(({ home }) => ({...home}))(withRouter(Home));
