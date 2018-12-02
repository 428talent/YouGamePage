import {createStyles, withStyles, Typography, Divider, Grid, Button, Paper} from "@material-ui/core";
import BaseProps from "../../base/props";
import * as React from "react";
import {blue} from '@material-ui/core/colors'
import StoreWishList from "../../store/model/WishList";
import {connect} from "dva";
import {ServerUrl} from "../../config/api";
import withRouter from "umi/withRouter";

const HomePage = (props: HomePageProps) => {
    const {classes, wishListItems, game} = props;
    console.log(game.games.result.length)
    console.log("render...")
    const loadWishList = (e) => {
        props.dispatch({
            type: "wishlist/fetchWishList",
            payload: {
                page: {
                    page: 1,
                    pageSize: 5
                }
            }
        })
    }
    return (
        <div>
            <Paper style={{minHeight: 800}}>


                <header className={classes.header}>
                    <Typography variant={"h5"}>
                        Home
                    </Typography>
                </header>
                <Divider/>
                <section className={classes.section}>
                    <header
                        className={classes.sectionHeader}>
                        <Typography variant="h6" style={{display: "inline-flex"}}>
                            愿望单
                        </Typography>
                        <Button
                            onClick={loadWishList}
                            style={{display: "inline-flex"}}>
                            查看更多
                        </Button>
                    </header>

                    <Grid container spacing={24}>
                        {(() => {
                            const wishListItems = props.wishListItems.wishListItems;
                            const gameToFetch = [];
                            const games = props.game.games;
                            const items = wishListItems.result.map(id => (wishListItems.entities.wishListItems[id])).map(item => {
                                const game = games.entities.games[item.gameId];
                                if (!game) {
                                    gameToFetch.push(item.gameId)
                                }
                                console.log(games.entities.games);
                                return (
                                    <Grid item xs={3} key={item.id}>
                                        <img className={classes.wishlistImg}
                                             src={
                                                 game ? `${ServerUrl}/${game.band}` : "https://steamcdn-a.akamaihd.net/steam/apps/275850/header.jpg?t=1542978561"
                                             }/>
                                    </Grid>
                                )
                            });
                            // props.dispatch({
                            //     type:"game/fetchGameList",
                            //     payload:{
                            //         gameIds:gameToFetch
                            //     }
                            // });
                            // console.log(gameToFetch)
                            return items
                        })()}
                    </Grid>
                </section>
            </Paper>
        </div>
    )
};

interface HomePageProps extends BaseProps {
    wishListItems: any,
    game: any,
    dispatch: Function
}

const styles = theme => createStyles({
    header: {
        padding: 16
    },
    section: {
        padding: 16
    },
    wishlistImg: {
        width: '100%'
    },
    moreLink: {
        textAlign: "right",
    },
    sectionHeader: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        marginBottom: 8
    }
});

// @ts-ignore
export default withRouter(connect(({data, wishlist, game}) => ({
    wishListItems: wishlist,
    game: game,
}))(withStyles(styles)(HomePage)));
