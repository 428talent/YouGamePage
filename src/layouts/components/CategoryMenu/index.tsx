import * as React from "react";
import {createStyles, List, Paper, withStyles, ListItem, ListItemText, Divider} from "@material-ui/core";
import BaseProps from "../../../base/props";
import router from "umi/router";


interface CategoryMenuProps extends BaseProps {
    open?: boolean
}

const CategoryMenu = (props: CategoryMenuProps) => {
    const {classes, open = false} = props;
    return (
        <Paper className={classes.container} style={{display: !open ? "none" : undefined}}>
            <List>
                <ListItem button>
                    <ListItemText
                        primary={"新游戏"}
                        onClick={() => router.push("/games?releaseTime=week")}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={"推荐"}/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemText primary={"射击"}/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary={"动作冒险"}/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemText
                        primary={"所有"}
                        onClick={() => router.push("/games")}
                    />
                </ListItem>

            </List>
        </Paper>
    );
};
const styles = createStyles(theme => ({
    container: {
        minWidth: 200,
        position: "absolute",

    }
}));
export default withStyles(styles)(CategoryMenu);
