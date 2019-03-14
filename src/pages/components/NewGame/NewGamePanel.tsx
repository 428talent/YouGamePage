import BaseProps from "../../../base/props";
import GameItem from "../game-item";
import {connect} from "dva";
import {Component} from "react";
import {withRouter} from "react-router";
import * as React from "react";

interface HomePageProps extends BaseProps {
    newGames: any[];
}

class NewGamePanel extends Component<HomePageProps, {}> {


    render(): React.ReactNode {
        const item = this.props.newGames.map(item => (
            <GameItem gameName={""} gameCover={item.band} gamePrice={item.price}
                      goodName={item.name} gameId={item.id}/>
        ));
        return (
            <div style={{paddingLeft: 24, paddingRight: 24, paddingTop: 12}}>
                {item}
            </div>
        );
    }
}

// @ts-ignore
export default connect(({home}) => ({...home}))(withRouter(NewGamePanel));