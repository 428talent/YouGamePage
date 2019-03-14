import * as React from "react";
import {
    createStyles,
    Typography,
    withStyles,
    Paper,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from "@material-ui/core";
import {connect} from "dva";
import BaseProps from "../../../../base/props";
import OrderGoodItem from "./components/OrderItem/OrderItem";
import {sum} from "ramda";
import {withSnackbar} from "notistack";

class OrderPayPage extends React.Component<OrderPayPageProp, {}> {

    setConfigDialogShow(isShow) {
        this.props.dispatch({
            type: "orderPay/setState",
            payload: {
                payConfirmDialogShow: isShow
            }
        });
    }

    closePayResultDialog() {
        this.props.dispatch({
            type: "orderPay/setState",
            payload: {
                payResultDialogShow: false
            }
        });

    }


    renderOrderContent = () => {
        const {order, classes, balance = 0} = this.props;
        const totalCost = sum(order.goods.map(orderGood => (orderGood.price)));
        console.log(this.props)

        return (
            <div>
                <Typography variant={"subtitle1"}>
                    订单号:{order.id}
                </Typography>

                {order.goods.map(orderGood => (<OrderGoodItem orderGood={orderGood}/>))}
                <Divider/>
                <div className={classes.items}>
                    <div className={classes.priceItem}>
                        <Typography variant={"subtitle2"}>
                            消费总额(RMB)
                        </Typography>
                        <Typography variant={"h6"}>
                            {(totalCost * -1).toFixed(2)}

                        </Typography>
                    </div>
                    <div className={classes.priceItem}>
                        <Typography variant={"subtitle2"}>
                            钱包余额(RMB)
                        </Typography>
                        <Typography variant={"h6"}>
                            {balance.toFixed(2)}
                        </Typography>
                    </div>

                    <div className={classes.total}>
                        <Typography variant={"subtitle2"}>
                            结算(RMB)
                        </Typography>
                        <Typography variant={"h5"}>
                            {(balance - totalCost).toFixed(2)}
                        </Typography>
                    </div>
                </div>
                <div className={classes.action}>
                    {balance - totalCost > 0 ? <Button variant={"contained"} color={"primary"}
                                                       onClick={() => this.setConfigDialogShow(true)}>支付</Button> :
                        <Button variant={"contained"} disabled={true} color={"primary"}>余额不足</Button>}

                </div>
            </div>
        )
    };


    render() {
        const {classes, order, dispatch, payConfirmDialogShow, payResultDialogShow, payResultText} = this.props;

        const payConfirmDialog = (
            <Dialog
                open={payConfirmDialogShow}
                onClose={() => this.setConfigDialogShow(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">支付确认</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        即将从您的账户中扣除相应的金额，请确认
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => dispatch({
                            type: "orderPay/payOrder"
                        })}
                        color="primary"
                    >
                        支付
                    </Button>
                    <Button onClick={() => this.setConfigDialogShow(false)} color="primary" autoFocus>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        );
        const payResultDialog = (
            <Dialog
                open={payResultDialogShow}
                onClose={() => this.closePayResultDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">支付结果</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {payResultText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.closePayResultDialog()} color="primary" autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>

        );
        return (
            <div className={classes.container}>
                <Paper className={classes.main}>
                    {!order || this.renderOrderContent()}
                </Paper>
                {payConfirmDialog}
                {payResultDialog}
            </div>
        );
    }
}

interface OrderPayPageProp extends BaseProps {
    dispatch: Function,
    order: any,
    balance: number,
    payConfirmDialogShow: boolean
    payResultDialogShow: boolean
    payResultText: string,

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
    main: {
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24
    },
    priceItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 36,
        marginTop: 8
    },
    items: {
        marginTop: 16
    },
    total: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 36,
        marginTop: 16
    },
    action: {
        textAlign: "right",
        paddingRight: 36,
        marginTop: 16
    }
}));
export default withSnackbar(connect(({orderPay}) => ({
    ...orderPay
}))(withStyles(styles)(OrderPayPage)))
