import * as React from "react";
import BaseProps from "../../../base/props";
import {Button, createStyles, Divider, Paper, Typography, withStyles} from "@material-ui/core";
import {sum} from 'ramda'
import {ServerUrl} from "../../../config/api";

class OrderCard extends React.Component<OrderCardProp, {}> {

    renderOrderGoods(orderGoods: Array<any>) {
        return orderGoods.map(orderGood => (
            <div className={this.props.classes.goodCard} key={orderGood.id}>
                <div style={{display: "inline-flex"}}>
                    <img
                        src={`${ServerUrl}/${orderGood.gameGood.game.band}`}
                        className={this.props.classes.goodImage}/>
                    <div className={this.props.classes.goodInfo}>
                        <Typography variant="h6" noWrap>
                            {orderGood.gameGood.game.name}
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
        ))

    }

    render(): React.ReactNode {
        const {classes, order} = this.props;
        return (
            <Paper className={classes.orderCard}>
                <Typography variant={"subtitle1"}>
                    订单号:{order.id}
                </Typography>
                <Divider/>
                {this.renderOrderGoods(order.goods)}
                <Divider/>
                <div style={{textAlign: "right"}}>
                    <Typography variant={"h6"}>
                        总计:￥{sum(order.goods.map(good => (good.price)))}
                    </Typography>
                    <Button variant="contained" color={"primary"}>
                        付款
                    </Button>
                </div>
            </Paper>
        )
    }
}

export interface OrderCardProp extends BaseProps {
    order: any
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
export default withStyles(styles)(OrderCard)
