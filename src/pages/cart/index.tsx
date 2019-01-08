import * as React from "react";
import {Button, createStyles, Grid, Typography, withStyles, withWidth} from "@material-ui/core";
import BaseProps from "../../base/props";
import GoodCard from "./components/GoodCard";
import {connect} from "dva";
import {ReactNode} from "react";
import {isWidthDown} from "@material-ui/core/withWidth";

class ShoppingCartPage extends React.Component<ShoppingCartPageProp, {}> {
    createGoodCard(): Array<ReactNode> {
        return this.props.cartItems.map(cartItem => {
            return (
                <Grid item xs={12} key={cartItem.id} className={this.props.classes.goodCartContainer}>
                    <GoodCard
                        gameName={cartItem.game.name}
                        price={cartItem.good.price}
                        goodName={cartItem.good.name}
                        cover={cartItem.game.band}
                        isPhone={isWidthDown('md', this.props.width)}
                    />
                </Grid>
            )
        })
    }

    render() {
        const {classes, totalPrice, width} = this.props;
        console.log(width)
        return (
            <div>
                <div className={this.props.classes.container}>
                    <Typography variant="h4">
                        购物车
                    </Typography>
                    <div className={this.props.classes.goodCollection}>
                        <Grid container>
                            {this.createGoodCard()}
                            <Grid item xs={12} className={classes.cartInfo}>
                                <Typography variant="h5">
                                    合计：￥{totalPrice}
                                </Typography>
                                <Button className={classes.createOrderButton} color="primary" variant="contained">
                                    付款
                                </Button>
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div>
        );
    }

}

interface ShoppingCartPageProp extends BaseProps {
    cartItems: Array<any>
    totalPrice: number,
    width: any
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
    goodCollection: {
        marginTop: 16
    },
    goodInfo: {
        marginLeft: 16,
        marginTop: 8,
        maxWidth: 300,
        display: "inline-block"
    },
    cartInfo: {
        textAlign: "right",
        marginTop: 16,
        paddingRight: 40
    },
    createOrderButton: {
        marginTop: 8
    },
    goodImage: {
        width: 200,
        display: "flex",
        float: "left",
        height: 94
    },
    goodCartContainer: {
        marginTop: 16
    },
    goodCard: {
        height: 94,
        display: "flex",
        justifyContent: "space-between"
    }
}));
export default connect(({cart}) => ({...cart}))(withWidth()(withStyles(styles)(ShoppingCartPage)))
