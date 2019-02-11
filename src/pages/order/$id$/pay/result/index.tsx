import * as React from "react";
import {createStyles, withStyles,Typography} from "@material-ui/core";
import {connect} from "dva";
import BaseProps from "../../../../../base/props";

class OrderPayPage extends React.Component<OrderPayPageProp, {}> {




    render() {
        const {classes, dispatch} = this.props;


        return (
            <div className={classes.container}>
                <Typography variant={"h3"}>
                    支付成功
                </Typography>
            </div>
        );
    }
}

interface OrderPayPageProp extends BaseProps {
    dispatch: Function,

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
        },
        backgroundColor:"#FFFFFF"
    },
    main: {
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24
    },

}));
export default connect(({orderPay}) => ({
    ...orderPay
}))(withStyles(styles)(OrderPayPage))
