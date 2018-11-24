import * as React from "react";
import BaseProps from "../../../base/props";
import {Button, createStyles, Divider, Paper, Typography, withStyles} from "@material-ui/core";
import {ServerUrl} from "../../../config/api";
import * as lodash from 'lodash'
class OrderCard extends React.Component<OrderCardProp, {}> {
    createOrderGoodItem(model:any){
        return model.goods.map(good =>(
            <div className={this.props.classes.goodCard}>
                <div style={{display: "inline-flex"}}>
                    <img
                        src={`${ServerUrl}/static/upload/img/217d2f40186a6a4c7770601bd344b53c.jpg`}
                        className={this.props.classes.goodImage}/>
                    <div className={this.props.classes.goodInfo}>
                        <Typography variant="h6" noWrap>
                            GameName
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            {good.name}
                        </Typography>
                    </div>
                </div>
                <div style={{display: "inline-flex"}}>
                    <Typography variant={"h5"} style={{margin: "auto 40px"}}>
                        ￥{good.price}
                    </Typography>
                </div>
            </div>
        ))
    }
    getTotalPrice(model:any){
        return lodash.sumBy(model.goods,good => good.price)
    }
    render(): React.ReactNode {
        const {classes, orderId} = this.props;
        console.log(this.props.model)
        return (
            <Paper className={classes.orderCard}>
                <Typography variant={"subtitle1"}>
                    订单号:{orderId}
                </Typography>
                <Divider/>
                {this.createOrderGoodItem(this.props.model)}
                <Divider/>
                <div style={{textAlign: "right"}}>
                    <Typography variant={"h6"}>
                        总计:￥{this.getTotalPrice(this.props.model)}
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
    orderId?: number,
    goods: Array<{
        name: string,
        price: number
        cover: string
    }>
    state: string
    model:any
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
