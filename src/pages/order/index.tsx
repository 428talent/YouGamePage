import * as React from "react";
import {createRef, RefObject} from "react";
import BaseProps from "../../base/props";
import {createStyles, Grid, Paper, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import {connect} from "dva";
import OrderCard from "./components/OrderCard";
import * as InfiniteScroll from 'react-infinite-scroller';
import {denormalize} from "normalizr";
import {getOrderGoods, orderEntity, orderGoodsEntity} from "../../utils/schema";
import {StoreGameModel} from "../../store/model/Game";
import {StoreOrderGood} from "../../store/model/OrderGood";
import {any} from "prop-types";

interface OrderCardModel {
    id: number
    goods?: Array<{
        name: string,
        price: number
        gameGoodId: number,
        game?: {
            id?: number,
            cover?: string,
            name?: string
        }
    }>

    state: string
}

class MyPage extends React.Component<OrderPageProp, OrderPageState> {
    state = {
        tabIndex: 0,
        orderCards: [1, 2, 3, 4],
        orderFilter: {
            state: undefined
        }
    };
    scrollRel: RefObject<InfiniteScroll> = createRef();
    onChangeTab = (event, value) => {
        this.setState({tabIndex: value});
        console.log(value);
        switch (value) {
            case 0:
                this.setFilterState(undefined);
                break;
            case 1:
                this.setFilterState("Created");
                break;
            case 2:
                this.setFilterState("Done");
                break;
        }
    };

    onloadMore(page) {
        this.fetchOrderList(false, page, 1)
    };

    setFilterState = (orderState: string) => {
        this.props.dispatch({
            type: "order/changeStateFilter",
            payload: {
                orderState
            }
        });
        this.fetchOrderList(true, 1, 1);
        this.scrollRel.current.pageLoaded = 1;
    };
    fetchOrderList = (reload, page, pageSize) => {
        console.log(this.state.orderFilter.state);
        this.props.dispatch({
            type: "order/fetchOrders",
            payload: {
                reload, page, pageSize
            }
        })
    };

    selectOrderList(): Array<any> {
        const orderSchema = {orders: [orderEntity]};
        let orderList = denormalize({orders: this.props.orderList.result}, orderSchema, this.props.orderList.entities).orders;
        let orderCardModelList: Array<OrderCardModel> = [];
        orderCardModelList = orderList.filter(order => {
            if (this.props.filter.state) {
                return order.state === this.props.filter.state
            }
            return true
        }).map(order => ({
            id: order.id,
            goods: undefined,
            state: order.state
        }));
        return orderCardModelList
    }

    loadGame() {
        gameToRequest.forEach((_, gameId) => {
            console.log(`request game by ${gameId}`);
            this.props.dispatch({
                type: "data/fetchGame",
                payload: {
                    gameId: gameId
                }
            })
        });
    }

    loadOrderGoods(ordersList : Array<OrderCardModel>) {
        // const orderGoods : Array<StoreOrderGood>  = getOrderGoods(this.props.orderGoods);
        // ordersList.forEach(order => {
        //     orderGoods.filter(orderGood => orderGood.orderId === order.id).forEach(orderGood => {
        //         order.goods.push({
        //             name:orderGood.name,
        //             price:orderGood.price,
        //             gameGoodId.
        //         })
        //     })
        //
        // });
        //
        // orderList.forEach(order => {
        //     const orderModel: OrderCardModel = {
        //         id: order.id,
        //         state: order.state,
        //         goods: []
        //     };
        //     const goods = orderGood.filter(good => good.orderId === order.id).map(good => ({
        //         name: good.name,
        //         price: good.price,
        //         gameGoodId: good.goodId,
        //         game: undefined
        //     }));
        //     orderModel.goods.push(...goods);
        //
        //     orderCardModelList.push(orderModel);
        // });
    }

    loadGameGood(goods) {
        goods.forEach(orderGood => {
            const gameGoods = this.props.goods.entities.goods;
            if (gameGoods[orderGood.gameGoodId]) {
                const gameId = gameGoods[orderGood.gameGoodId].gameId;
                const games = this.props.games.entities.games;
                if (games[gameId]) {
                    const game: StoreGameModel = games[gameId];
                    console.log(game);
                    orderGood.game = {
                        id: gameId,
                        cover: game.band,
                        name: game.name
                    }
                } else {
                    gameToRequest.add(gameId)
                }
            } else {
                this.props.dispatch({
                    type: "data/fetchGood",
                    payload: {
                        goodId: orderGood.gameGoodId
                    }
                })
            }
        });
    }

    render() {
        console.log(this.state);

        const {classes} = this.props;
        const {tabIndex} = this.state;
        let orderCardCollection = [];
        if (this.props.orderList) {
            orderCardCollection = this.selectOrderList().map(order => {

                return (
                    <Grid item xs={12} key={order.id}>
                        <OrderCard orderId={order.id} />
                    </Grid>
                )
            });
        }


        const loader = <div>Loading ...</div>;
        return (
            <div className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            订单
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: 16, backgroundColor: "#FFFFFF", marginTop: 16}}>
                        <Paper>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Tabs
                                        value={tabIndex}
                                        onChange={this.onChangeTab}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        <Tab label="所有订单"/>
                                        <Tab label="待付款"/>
                                        <Tab label="已付款"/>
                                    </Tabs>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <InfiniteScroll
                            pageStart={2}
                            loadMore={this.onloadMore.bind(this)}
                            hasMore={this.props.hasMore}
                            loader={loader}
                            ref={this.scrollRel}
                        >
                            <Grid container style={{marginBottom: 16, marginTop: 16}}>
                                {orderCardCollection}
                            </Grid>
                        </InfiniteScroll>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface OrderPageProp extends BaseProps {
    dispatch: Function,
    filter: {
        state?: string
    },
    orders: Array<object>,
    hasMore: boolean,
    orderList: any
    orderGoods: Array<object>,
    goods: any,
    games: any,
}

interface OrderPageState {
    tabIndex: number
}

const styles = createStyles(theme => ({
    container: {
        marginTop: 89,
        marginLeft: 500,
        marginRight: 500,
        minHeight: 800,
        [theme.breakpoints.only('xl')]: {
            marginLeft: 500,
            marginRight: 500,
        },
        [theme.breakpoints.only('lg')]: {
            marginLeft: 400,
            marginRight: 400,
        },
        [theme.breakpoints.only('md')]: {
            marginLeft: 300,
            marginRight: 300,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: 16,
            marginRight: 16,
        }
    },
    userCard: {
        alignItems: "center",
        justifyContent: "left",
        display: "flex",
        padding: "16px 16px"
    },
    avatar: {
        width: 64,
        height: 64,
        display: 'inline-flex'
    },
    userInfo: {
        display: 'inline-flex'
    },


}));
export default connect(({order, data}) => ({
    ...order,
    orderList: data.orders,
    orderGoods: data.orderGoods,
    goods: data.goods,
    games: data.games
}))(withStyles(styles)(MyPage))
