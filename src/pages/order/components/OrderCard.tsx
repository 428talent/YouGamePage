import * as React from "react";
import BaseProps from "../../../base/props";
import {Button, createStyles, Divider, Paper, Typography, withStyles} from "@material-ui/core";
import * as lodash from 'lodash'
import {connect} from "dva";
import {StoreOrderGood} from "../../../store/model/OrderGood";
import {StoreOrder} from "../../../store/model/Order";
import {getOrderGoods} from "../../../utils/schema";
import {any} from 'ramda'
import {go} from "react-router-redux";

class OrderCard extends React.Component<OrderCardProp, {}> {
    createOrderGoodItem() {


        //render orderGood
        return (
            <div className={this.props.classes.goodCard}>
                <div style={{display: "inline-flex"}}>
                    <img
                        // src={game && game.cover ? `${ServerUrl}/${game.cover}` : `${ServerUrl}/static/upload/img/217d2f40186a6a4c7770601bd344b53c.jpg`}
                        className={this.props.classes.goodImage}/>
                    <div className={this.props.classes.goodInfo}>
                        <Typography variant="h6" noWrap>
                            {/*{game && game.name ? game.name : "Unknown"}*/}
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            {/*{good.name}*/}
                        </Typography>
                    </div>
                </div>
                <div style={{display: "inline-flex"}}>
                    <Typography variant={"h5"} style={{margin: "auto 40px"}}>
                        {/*￥{good.price}*/}
                    </Typography>
                </div>
            </div>
        )


    }

    getTotalPrice(model: any) {
        return lodash.sumBy(model.goods, good => good.price)
    }

    renderOrderGoods(orderId: number) {
        // const orderGoods = getOrderGoods(this.props.orderGoods);
        console.log(this.props.orderGoods.orderIndex)
        if (this.props.orderGoods.orderIndex[orderId]) {
            return this.props.orderGoods.orderIndex[orderId].map((orderGood: StoreOrderGood) => {
                return (
                    <div className={this.props.classes.goodCard} key={orderGood.id}>
                        <div style={{display: "inline-flex"}}>
                            <img
                                // src={game && game.cover ? `${ServerUrl}/${game.cover}` : `${ServerUrl}/static/upload/img/217d2f40186a6a4c7770601bd344b53c.jpg`}
                                className={this.props.classes.goodImage}/>
                            <div className={this.props.classes.goodInfo}>
                                <Typography variant="h6" noWrap>
                                    {/*{game && game.name ? game.name : "Unknown"}*/}
                                </Typography>
                                <Typography variant="subtitle2" noWrap>
                                    {orderGood.name}
                                </Typography>
                            </div>
                        </div>
                        <div style={{display: "inline-flex"}}>
                            <Typography variant={"h5"} style={{margin: "auto 40px"}}>
                                ￥{orderGood.price}
                            </Typography>
                        </div>
                    </div>
                )
            })
        } else {
            this.props.dispatch({
                type: "order/fetchOrderGood",
                payload: {
                    orderId
                }
            });
            return (<div/>)
        }


        // ((orderGoods: Array<StoreOrderGood>) => {
        //     orderGoods.length > 0 || ((orderGoods) => {
        //         return
        //     })()
        // })(.filter())
    }

    render(): React.ReactNode {
        const {classes, orderId, orders} = this.props;
        if (orders[orderId]) {
            return (
                <Paper className={classes.orderCard}>
                    <Typography variant={"subtitle1"}>
                        订单号:{orderId}
                    </Typography>
                    <Divider/>
                    {this.renderOrderGoods(orderId)}
                    <Divider/>
                    <div style={{textAlign: "right"}}>
                        <Typography variant={"h6"}>
                            {/*总计:￥{this.getTotalPrice(this.props.model)}*/}
                        </Typography>
                        <Button variant="contained" color={"primary"}>
                            付款
                        </Button>
                    </div>
                </Paper>
            )
        }
        return (<div>

        </div>)
    }
}

export interface OrderCardProp extends BaseProps {
    orderId: number,
    orders: Map<number, StoreOrder>,
    orderGoods: any
}

const styles = createStyles(theme => ({
    orderCard: {
        padding: "16px 16px",
        marginBottom: 16
    },
    goodInfo: {
        marginLeft: 16,
        marginTop: 8,
        maxWidth: 300,
        display: "inline-block"
    },
    goodImage: {
        width: 200,
        display: "flex",
        float: "left",
        height: 94
    },
    goodCard: {
        height: 94,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 16,
        marginTop: 16
    }
}));
export default connect(({data}) => ({
    orders: data.orders.entities.orders,
    orderGoods: data.orderGoods
}))(withStyles(styles)(OrderCard))
