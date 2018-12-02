import {Avatar,Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, withStyles} from "@material-ui/core";
import * as React from "react";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BaseProps from "../../../base/props";
import createStyles from "@material-ui/core/styles/createStyles";
import {ServerUrl} from "../../../config/api";
import router from "umi/router";

const LeftNav = (props: LeftNavProps) => {
    const {tabIndex,onTabChange,classes} = props;
    return (
        <Paper>
            <div className={classes.header}>
                <div style={{textAlign:"center"}}>
                    <Avatar className={classes.avatar} src={`${ServerUrl}/static/upload/user/avatar/17f2adcba338a298e3c59bd176b85984.jpg`} />
                    <Typography variant={"h6"}>
                        ArenTakayama
                    </Typography>

                </div>

            </div>
            <Divider/>
            <List component="nav">
                <ListItem
                    button
                    selected={tabIndex === 'home'}
                    onClick={() => {
                        onTabChange('home');
                        router.push("/my/home")
                    }}
                >
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="主页"/>
                </ListItem>
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
            </List>
            <Divider/>
            <List component="nav">
                <ListItem
                    button

                >
                    <ListItemText primary="Trash"/>
                </ListItem>
                <ListItem
                    button

                >
                    <ListItemText primary="Spam"/>
                </ListItem>
            </List>
        </Paper>
    )
};
const styles = createStyles(theme =>({
    header:{
        height:150,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    avatar:{
        height: 96,
        width:96,
        display: "inline-flex"
    }

}));
interface LeftNavProps extends BaseProps {
    tabIndex: string
    onTabChange(tabIndex:string):void
}

export default withStyles(styles)(LeftNav)
