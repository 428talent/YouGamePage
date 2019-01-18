import * as React from "react";
import {
    createStyles,
    ListItem,
    withStyles,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Typography
} from "@material-ui/core";
import BaseProps from "../../../../../base/props";
import TransactionIcon from "@material-ui/icons/ShoppingCart"
import * as moment from "moment";

interface TransactionItemProps extends BaseProps {
    type: string
    time: Date
    amount: number

}

const TransactionItem = (props: TransactionItemProps) => {
    const {type, time, amount} = props;
    return (
        <div>
            <ListItem>
                <ListItemIcon>
                    <TransactionIcon/>
                </ListItemIcon>
                <ListItemText primary={type} secondary={moment(time).format("YYYY-MM-DD HH:mm")}/>
                <ListItemSecondaryAction>
                    <Typography variant={"h6"}>
                        {amount}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    );
};
const styles = createStyles(theme => ({}));
export default withStyles(styles)(TransactionItem);
