import {createStyles, Grid, IconButton, Tooltip, withStyles, Typography} from "@material-ui/core";
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
import DeleteIcon from "@material-ui/icons/Delete"

const WishListPage = (props: WishListPageProps) => {
    const {classes, pageIndex, wishlistStore, isActionMode, game, dispatch, app, firstLoading, totalCount, wishListItems, pageSize} = props;
    if (app.user && !firstLoading) {
        dispatch({
            type: "myWishlist/setFirstLoading",
            payload: {
                firstLoading: true
            }
        });
        dispatch({
            type: "myWishlist/fetchWishList",
            payload: {
                page: {
                    page: 1,
                    pageSize: pageSize
                }
            }
        })

    }
    const actionBarContent = (
        <div style={{alignItems: "center", display: "flex"}}>
            <div style={{display: "inline-flex"}}>
                <Tooltip title="删除所选" aria-label="Add">
                    <IconButton style={{color: "#FFFFFF"}}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </div>
            <div style={{display: "inline-flex"}}>
                <Typography variant="h5" style={{color: "#FFFFFF"}}>
                    已选择{props.selectedItems.size}个项目
                </Typography>
            </div>
        </div>
    );
    return (
        <div>
            <TitleBar title="愿望单" isActionMode={isActionMode} actionChildren={actionBarContent}
                      onSwitchActionMode={(isActionMode) => {
                          dispatch({
                              type: "myWishlist/switchActionMode",
                              payload: {
                                  isActionMode: !isActionMode
                              }
                          })

                      }}/>

            <Grid container spacing={24} className={classes.wishlistCollection}>
                {function () {
                    if (!wishListItems[pageIndex]) {
                        return undefined;
                    }
                    console.log(props.selectedItems.values())
                    return wishListItems[pageIndex].map(id => {
                        const item = wishlistStore.getItemByIndex(id);
                        const wishGame = game.getItemByIndex(item.gameId);
                        wishGame? console.log( props.selectedItems.has(wishGame.id)) : undefined;
                        return (
                            <Grid item xs={4} key={item.id}>
                                <WishlistItemCard
                                    isSelectMode={isActionMode}
                                    gameName={wishGame ? wishGame.name : undefined}
                                    gameCover={wishGame ? `${ServerUrl}/${wishGame.band}` : undefined}
                                    id={wishGame? wishGame.id : undefined}
                                    onItemSelectChange={(isSelect, id) => dispatch({
                                        type: "myWishlist/onItemSelectChange",
                                        payload: {
                                            isSelect, id
                                        }
                                    })}
                                    selected={wishGame? props.selectedItems.has(wishGame.id):false}
                                />
                            </Grid>
                        )
                    })
                }()}
            </Grid>
            <div style={{marginTop: 16}}>
                <Paging
                    pageIndex={pageIndex}
                    totalCount={totalCount}
                    pageRange={pageSize}
                    onChangePage={(page) => {
                        console.log(`current page = ${page}`);
                        props.dispatch({
                            type: "myWishlist/changePage",
                            payload: {
                                page
                            }
                        });
                        props.dispatch({
                            type: "myWishlist/fetchWishList",
                            payload: {
                                page: {
                                    page: page,
                                    pageSize: pageSize
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
    app: any
    game: GameStore,
    firstLoading: boolean,
    totalCount: number,
    wishListItems: any,
    pageSize: number,
    isActionMode: boolean
    selectedItems: Set<number>
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
export default withRouter(connect(({data, wishlist, game, myWishlist, app}) => ({
    wishlistStore: new WishlistStore(wishlist),
    game: new GameStore(game),
    app,
    ...myWishlist
}))(withStyles(styles)(WishListPage)));
