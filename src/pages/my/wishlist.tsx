import {createStyles, Grid, withStyles} from "@material-ui/core";
import {ServerUrl} from "../../config/api";
import BaseProps from "../../base/props";
import withRouter from "umi/withRouter";
import {connect} from "dva";
import * as React from "react";
import TitleBar from "./components/Title";
import WishlistItemCard from "./components/WishlistItemCard";
import Paging from "./components/Paging";
import {GameStore} from "../../store/GameStore";
import {WishlistStore} from "../../store/WishlistStore";

const WishListPage = (props: WishListPageProps) => {
    const {classes, pageIndex, wishlistStore, game,dispatch,app,firstLoading,totalCount,wishListItems,pageSize} = props;
    if (app.user && !firstLoading){
        dispatch({
            type:"myWishlist/setFirstLoading",
            payload:{
                firstLoading:true
            }
        });
        dispatch({
            type:"myWishlist/fetchWishList",
            payload:{
                page:{
                    page:1,
                    pageSize:1
                }
            }
        })

    }
    return (
        <div>
            <TitleBar title="愿望单"/>
            <Grid container spacing={24} className={classes.wishlistCollection}>
                {function () {
                    if (!wishListItems[pageIndex]){
                        return undefined;
                    }
                    return wishListItems[pageIndex].map(id => {
                        const item = wishlistStore.getItemByIndex(id);
                        const wishGame = game.getItemByIndex(item.gameId);
                        return (
                            <Grid item xs={4} key={item.id}>
                                <WishlistItemCard gameName={wishGame? wishGame.name : undefined} gameCover={wishGame ? `${ServerUrl}/${wishGame.band}` : undefined}/>
                            </Grid>
                        )
                    })
                }()}
            </Grid>
            <div style={{marginTop: 16}}>
                <Paging
                    pageIndex={pageIndex}
                    totalCount={totalCount}
                    pageRange={1}
                    onChangePage={(page) => {
                        console.log(`current page = ${page}`);
                        props.dispatch({
                            type: "myWishlist/changePage",
                            payload: {
                                page
                            }
                        });
                        props.dispatch({
                            type:"myWishlist/fetchWishList",
                            payload:{
                                page:{
                                    page:page,
                                    pageSize:1
                                }
                            }
                        })
                    }}
                />
            </div>
        </div>
    )
};

interface WishListPageProps extends BaseProps {
    pageIndex: number
    dispatch: Function,
    wishlistStore: WishlistStore,
    app:any
    game: GameStore,
    firstLoading:boolean,
    totalCount:number,
    wishListItems:any,
    pageSize:number
}

const styles = theme => createStyles({

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
    },
    wishlistCollection: {
        marginTop: 16
    }
});

// @ts-ignore
export default withRouter(connect(({data, wishlist, game, myWishlist,app}) => ({
    wishlistStore : new WishlistStore(wishlist),
    game: new GameStore(game),
    app,
    ...myWishlist
}))(withStyles(styles)(WishListPage)));
