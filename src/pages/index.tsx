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
import {createStyles, Typography, withStyles} from "@material-ui/core";

interface HomePageProps extends BaseProps {
    collections: any;
}

class Home extends Component<HomePageProps, {}> {
    renderGameCollections() {
        const collections: any[] = this.props.collections
        return collections.map(collection => (
            <SaleGameSection
                id={collection.id}
                title={collection.title}
                games={collection.games.map(game => ({
                    cover: `${ServerUrl}/${game.band}`,
                    price: game.price,
                    name: game.name,
                    id: game.id,
                }))}/>
        ))
    }

    render(): React.ReactNode {
        const {collections, classes} = this.props;
        console.log(collections);
        return (
            <div className={classes.container}>
                <Banner/>
                {this.renderGameCollections()}
                <Typography variant="h5" gutterBottom style={{marginTop: 56, paddingLeft: 300, paddingRight: 300}}>
                    探索
                </Typography>
                <CustomizedTabs/>
            </div>
        );
    }
}

const styles = createStyles(theme => ({
    container: {
        paddingBottom: 55
    }
}));
// @ts-ignore
export default connect(({home}) => ({...home}))(withRouter(withStyles(styles)(Home)));

