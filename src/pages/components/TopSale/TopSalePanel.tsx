import * as React from "react";
import {Component} from "react";
import withRouter from "umi/withRouter";
import {connect} from "dva";
import BaseProps from "../../../base/props";
import GameItem from "../game-item";
import {ServerUrl} from "../../../config/api";

interface HomePageProps extends BaseProps {
    saleRank: any[];
}

class TopSalePanel extends Component<HomePageProps, {}> {


    render(): React.ReactNode {
        const item = this.props.saleRank.map(item => (
            <GameItem gameName={item.game.name} gameCover={item.band} gamePrice={item.good.price} goodName={item.good.name} gameId={item.game.id}/>
        ));
        return (
            <div style={{paddingLeft:24,paddingRight:24,paddingTop:12}}>
                {item}
            </div>
        );
    }
}

// @ts-ignore
export default connect(({home}) => ({...home}))(withRouter(TopSalePanel));
