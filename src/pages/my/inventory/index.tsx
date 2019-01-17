import * as React from "react";
import {createStyles, Grid, Paper, withStyles, Typography} from "@material-ui/core";
import {connect} from "dva";
import withRouter from "umi/withRouter";
import BaseProps from "../../../base/props";
import TitleBar from "../components/Title";
import GameCard from "./components/GameCard";
import {ServerUrl} from "../../../config/api";
import InventoryTitleBar from "./components/Title/Title";
import GameDetail from "./components/GameDetail";


class InventoryPage extends React.Component<InventoryProps, {}> {
    componentDidMount(): void {
        const {dispatch} = this.props;
        dispatch({type: "inventory/queryGame"})
    }

    onGameCardClick(game) {
        const {dispatch} = this.props;
        dispatch({
            type: "inventory/setState",
            payload: {
                detail: {
                    data: game
                },
                detailMode: true
            }
        });
        dispatch({
            type: "inventory/queryGood",
            gameId: game.id
        })
    }

    renderCards() {
        const {data, dispatch} = this.props;
        return data.map(game => (
            <Grid item xs={4} key={game.id}>
                <GameCard
                    cover={`${ServerUrl}/${game.band}`}
                    name={game.name}
                    id={game.id}
                    onCardClick={() => this.onGameCardClick(game)}
                />
            </Grid>
        ))
    }

    renderDetailContent() {
        const {data} = this.props.detail;
        const {detailItems} = this.props;
        return (
            <div>
                <GameDetail inventoryItems={detailItems}/>
            </div>
        )
    }

    render(): React.ReactNode {
        const {classes, detailMode, dispatch, detail} = this.props;
        return (
            <div>
                <InventoryTitleBar
                    isDetailMode={detailMode}
                    onSwitchDetailMode={() => dispatch({
                        type: "inventory/setState",
                        payload: {
                            detailMode: false
                        }
                    })}
                    title={detailMode ? detail.data.name : "仓库"}/>
                {detailMode ? this.renderDetailContent() : (
                    <Grid container spacing={24} className={classes.cardContainer}>
                        {this.renderCards()}
                    </Grid>)}

            </div>
        )
    }
}

const styles = createStyles({
    cardContainer: {
        marginTop: 24
    }
});

interface InventoryProps extends BaseProps {
    dispatch: any,
    data: any,
    detailMode: boolean,
    detail: any
    detailItems: Array<any>
}


export default withRouter(connect(({inventory, app}) => ({...inventory, app}))(withStyles(styles)(InventoryPage)))
