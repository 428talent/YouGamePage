import * as React from "react";
import BaseProps from "../../base/props";
import {createStyles, Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {connect} from "dva";
import OrderCard from "./components/OrderCard";
import {Order} from "../../services/model/order";
import OrderFilter from "./components/Filter";
import Pagination from "./components/Pagination";

class OrdersPage extends React.Component<OrderPageProp, {}> {
    renderOrderCards = () => {
        const {orders} = this.props;
        return orders.map(order => (
            <Grid item xs={12} key={order.id}>
                <OrderCard order={order}/>
            </Grid>
        ))

    };
    onFilterChange = (filter) => {
        const {dispatch} = this.props;
        dispatch({
            type: "order/setState",
            payload: {filter}
        });
        const {orderState} = filter;
        const queryParam: any = {};
        if (orderState && orderState !== 'all') {
            queryParam.state = orderState
        }
        dispatch({type: "order/fetchOrders", payload: {...queryParam}})
    };


    render() {
        const {classes, filter, dispatch, page, pageSize, count} = this.props;
        return (
            <div className={classes.container}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            订单
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container style={{marginBottom: 16, marginTop: 16}}>
                            {this.renderOrderCards()}
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container style={{marginBottom: 16, marginTop: 16}}>
                            <OrderFilter filter={filter} onFilterChange={this.onFilterChange}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container style={{marginBottom: 16, marginTop: 16}}>
                            <Pagination
                                page={page}
                                count={count}
                                pageSize={pageSize}
                                onNextPage={() => dispatch({type: "order/setState", payload: {page: page + 1}})}
                                onPreviousPage={() => dispatch({type: "order/setState", payload: {page: page - 1}})}
                                onSelectPage={(page) => dispatch({type: "order/setState", payload: {page}})}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface OrderPageProp extends BaseProps {
    dispatch: Function,
    filter: any,
    orders: Array<Order>,
    page: number,
    pageSize: number,
    count: number
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
export default connect(({order}) => ({
    ...order
}))(withStyles(styles)(OrdersPage))
