import * as React from "react";
import {List, Typography, withStyles, ListItem, ListItemText, Divider, ListItemIcon} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import BaseProps from "../../../../../base/props";
import * as moment from "moment";
import GoodIcon from "@material-ui/icons/LocalMall"

interface GoodListProps extends BaseProps {
    goods: Array<any>
}

const GoodList = (props: GoodListProps) => {
    const {classes, goods = []} = props;
    const renderGoodItem = () => {
        return goods.map((item, index) => (
            <div>
                <ListItem>
                    <ListItemIcon>
                        <GoodIcon/>
                    </ListItemIcon>
                    <ListItemText primary={item.good.name} secondary={`${moment(item.created).format("YYYY-MM-DD")} 购入`}/>
                </ListItem>
                {index != goods.length - 1 ? <Divider/> : undefined}

            </div>
        ))
    };

    return (
        <div className={classes.container}>
            <List>
                {renderGoodItem()}
            </List>
        </div>
    );
};
const styles = createStyles(theme => ({
    container: {
        backgroundColor: "white",
        marginTop: 12,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16,
        paddingRight:16,
    }
}));
export default withStyles(styles)(GoodList);
