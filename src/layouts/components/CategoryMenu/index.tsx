import * as React from "react";
import {createStyles, List, Paper, withStyles, ListItem, ListItemText, Divider} from "@material-ui/core";
import BaseProps from "../../../base/props";

interface CategoryMenuProps extends BaseProps {
    open?: boolean
}

const CategoryMenu = (props: CategoryMenuProps) => {
    const {classes, open = false} = props;
    return (
        <Paper className={classes.container} style={{display: !open ? "none" : undefined}}>
            <List>
                <ListItem>
                    <ListItemText primary={"新游戏"}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary={"推荐"}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"射击"}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary={"动作冒险"}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"所有"}/>
                </ListItem>

            </List>
        </Paper>
    );
};
const styles = createStyles(theme => ({
    container: {
        minWidth: 200,
        position: "absolute"
    }
}));
export default withStyles(styles)(CategoryMenu);
