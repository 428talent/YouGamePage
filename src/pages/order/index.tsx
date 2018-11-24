import * as React from "react";
import {createRef, RefObject} from "react";
import BaseProps from "../../base/props";
import {createStyles, Grid, Paper, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import {connect} from "dva";
import OrderCard, {OrderCardProp} from "./components/OrderCard";
import * as InfiniteScroll from 'react-infinite-scroller';
import {denormalize} from "normalizr";
import {getOrderGoods, orderEntity, orderGoodsEntity, ordersSchema} from "../../utils/schema";
import {arrayOf} from "prop-types";

interface OrderCardModel {
    id: number
    goods: Array<{
        name: string,
        price: number
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
        console.log(orderState);
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
        const orderGood = getOrderGoods(this.props.orderGoods);
        const orderCardProps = [];
        const orderCardModelList: Array<OrderCardModel> = [];
        //state filter
        orderList = orderList.filter(order => {
            if (this.props.filter.state) {
                return order.state === this.props.filter.state
            }
            return true
        });


        orderList.forEach(order => {
            const orderModel: OrderCardModel = {
                id: order.id,
                state: order.state,
                goods: []
            };
            const goods = orderGood.filter(good => good.orderId === order.id).map(good => ({
                name: good.name,
                price: good.price
            }));
            orderModel.goods.push(...goods);
            orderCardModelList.push(orderModel);
        });
        return orderCardModelList
    }

    render() {
        console.log(this.state);

        const {classes} = this.props;
        const {tabIndex} = this.state;
        let orderCardCollection = [];
        if (this.props.orderList) {
            orderCardCollection = this.selectOrderList().map(order => {
                this.props.dispatch({
                    type: "order/fetchOrderGood",
                    payload: {
                        orderId: order.id
                    }
                });
                return (
                    <Grid item xs={12} key={order.id} >
                        <OrderCard orderId={order.id} model={order}/>
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
    orderGoods: Array<object>
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
    orderGoods: data.orderGoods
}))(withStyles(styles)(MyPage))
