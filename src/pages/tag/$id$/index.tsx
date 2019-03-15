import {Component, ReactNode} from "react";
import * as React from "react";
import BaseProps from "../../../base/props";
import {connect} from "dva";
import {createStyles, withStyles, Typography, Grid, Divider, Button} from "@material-ui/core";
import GameCard from "../../games/components/GameCard";
import ReactPaginate from "react-paginate";
import Pagination from "./components/Pagination";

interface TagPageProps extends BaseProps {
    dispatch: any,
    games: any
    pageSize: number,
    page: number,
    count: number
    data:any
}

class TagPage extends Component<TagPageProps, {}> {
    renderGameCards() {
        const {games} = this.props;
        return games.map(game => (
            <Grid item xs={4} key={game.id}>
                <GameCard gameId={game.id} gameName={game.name} gamePicUrl={game.band} gamePrice={game.price}/>
            </Grid>
        ))
    }

    render(): ReactNode {
        const {classes, page, pageSize, count,data} = this.props;
        return (
            <div className={classes.container}>
                <Typography variant={"h5"} className={classes.header}>
                    标签:{!data || data.name}
                </Typography>
                <Divider/>
                <Grid container spacing={24} className={classes.gameContainer}>
                    {this.renderGameCards()}
                </Grid>

                <Divider className={classes.bottomDivider}/>
                <div className={classes.paginationContainer}>
                    <Pagination
                        pageSize={pageSize}
                        page={page}
                        count={count}
                        onNextPage={() => {
                        }}
                        onPreviousPage={() => {
                        }}
                        onSelectPage={() => {
                        }}
                    />
                </div>
            </div>
        )
    }
}

const styles = createStyles(theme => ({
    container: {
        marginTop: 90,
        marginLeft: 500,
        marginRight: 500,
        minHeight: 820,
        paddingBottom:26
    },
    header: {
        marginBottom: 24
    },
    gameContainer: {
        marginTop: 24
    },
    bottomDivider: {
        marginTop: 16,
        marginBottom: 16
    },
    paginationContainer:{
        textAlign:"right"
    }
}));
export default connect(({tag}) => ({...tag}))(withStyles(styles)(TagPage))
