import * as React from "react";
import {createStyles, Typography, withStyles} from "@material-ui/core";
import BaseProps from "../../../../../../base/props";
import {ServerUrl} from "../../../../../../config/api";

class OrderGoodItem extends React.Component<OrderGoodItemProp, {}> {
    render(): React.ReactNode {
        const {classes, orderGood} = this.props;
        return (
            <div className={classes.goodCard} key={orderGood.id}>
                <div style={{display: "inline-flex"}}>
                    <img
                        src={`${ServerUrl}/${orderGood.gameGood.game.band}`}
                        className={classes.goodImage}/>
                    <div className={classes.goodInfo}>
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
        )
    }
}

export interface OrderGoodItemProp extends BaseProps {
    orderGood: any
}

const styles = createStyles(theme => ({
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
    },
}));
export default withStyles(styles)(OrderGoodItem)
