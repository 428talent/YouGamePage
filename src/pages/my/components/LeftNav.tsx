import {
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BaseProps from "../../../base/props";
import createStyles from "@material-ui/core/styles/createStyles";
import {ServerUrl} from "../../../config/api";
import router from "umi/router";

const LeftNav = (props: LeftNavProps) => {
    const {tabIndex, onTabChange, classes, profile} = props;
    return (
        <Paper>
            <div className={classes.header}>
                <div style={{textAlign: "center"}}>
                    <Avatar className={classes.avatar} src={profile ? `${ServerUrl}/${profile.avatar}` : ""}/>
                    <Typography variant={"h6"}>
                        {profile ? profile.nickname : "Unknown"}
                    </Typography>

                </div>

            </div>
            <Divider/>
            <List component="nav">
                <ListItem
                    button
                    selected={tabIndex === 'wishlist'}
                    onClick={() => {
                        onTabChange('wishlist');
                        router.push("/my/wishlist")
                    }}
                >
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="愿望单"/>
                </ListItem>
                <ListItem
                    button
                    selected={tabIndex === 'inventory'}
                    onClick={() => {
                        onTabChange('inventory');
                        router.push("/my/inventory")
                    }}
                >
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="仓库"/>
                </ListItem>
                <ListItem
                    button
                    selected={tabIndex === 'wallet'}
                    onClick={() => {
                        onTabChange('wallet');
                        router.push("/my/wallet")
                    }}
                >
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="钱包"/>
                </ListItem>
            </List>
            <Divider/>
            <List component="nav">
                <ListItem
                    button
                    onClick={(e) => router.push("/order")}
                >
                    <ListItemText primary="我的订单"/>
                </ListItem>
            </List>
        </Paper>
    )
};
const styles = createStyles(theme => ({
    header: {
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        height: 96,
        width: 96,
        display: "inline-flex"
    }

}));

interface LeftNavProps extends BaseProps {
    tabIndex: string

    onTabChange(tabIndex: string): void

    profile: any
}

export default withStyles(styles)(LeftNav)
