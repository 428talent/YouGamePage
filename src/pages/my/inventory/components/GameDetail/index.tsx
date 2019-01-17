import * as React from "react";
import {Typography, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import BaseProps from "../../../../../base/props";
import GoodList from "../GoodList";

interface GameDetailProps extends BaseProps {
    inventoryItems: Array<any>
}

const GameDetail = (props: GameDetailProps) => {
    const {classes,inventoryItems} = props;
    return (
        <div>
            <div className={classes.goodsContainer}>
                <Typography variant={"h5"}>
                    购买的商品
                </Typography>
                <GoodList goods={inventoryItems}/>
            </div>
        </div>
    );
};
const styles = createStyles(theme => ({
    header: {
        padding: 16,
        display: "flex",
        height: 48,
        alignItems: "center",

    },
    goodsContainer: {
        marginTop: 24
    }

}));
export default withStyles(styles)(GameDetail);
