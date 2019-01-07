import {
    AppBar,
    Avatar,
    Badge,
    Button,
    createStyles,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {fade} from '@material-ui/core/styles/colorManipulator';
import BaseProps from "../base/props";
import {ServerUrl} from "../config/api";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import router from "umi/router";

interface MainNavBarProps extends BaseProps {
    user?: UserModel.User,
    isDrawerOpen: boolean,
    dispatch: any
}

class MainNavBar extends React.Component<MainNavBarProps, {}> {


    constructor(props: MainNavBarProps) {
        super(props);
    }

    switchDrawer = (isOpen: boolean) => {
        this.props.dispatch({
            type: "app/switchDrawer",
            payload: {
                isOpen
            }
        })
    };

    userButton = (user: UserModel.User, classes) => {
        if (user) {
            return (
                <Button className={classes.rightButton}>
                    <Avatar
                        alt={user.profile.nickname}
                        src={`${ServerUrl}/${user.profile.avatar}`}
                    />
                    <span className={classes.username}>{user.profile.nickname}</span>
                    <MoreVertIcon/>
                </Button>
            )
        } else {
            return (
                <Button className={classes.rightButton} href={"/login"}>
                    <span className={classes.username}>登录</span>
                </Button>
            )
        }
    };


    fullList = () => (
        <div className={this.props.classes.fullList}>
            <div style={{height: 150, display: "flex", alignItems: "center", justifyContent: "center"}}>
                {function (user) {
                    if(user != null){
                        console.log(user);
                        return (
                            <Avatar
                                style={{width: 80, height: 80}}
                                src={`${ServerUrl}/${user.profile.avatar}`}
                            />
                        )
                    }else{
                        return(
                            <Avatar style={{width: 80, height: 80}}>
                                <PersonIcon style={{width: 64, height: 64}}/>
                            </Avatar>

                        )
                    }
                }(this.props.user)}

            </div>
            <List>
                <ListItem button key="Home" onClick={() => router.push("/")}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>

            </List>
        </div>
    );


    render(): React.ReactNode {
        console.log(this.props.user)
        const {classes, isDrawerOpen} = this.props;
        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <IconButton onClick={() => this.switchDrawer(true)} className={classes.menuButton}
                                    color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            YouGame
                        </Typography>
                        <Button
                            aria-haspopup="true"
                            style={{height: 60, color: "#FFFFFF", display: 'none'}}
                        >
                            Primary
                            <MoreVertIcon/>
                        </Button>
                        <div className={classes.grow}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <IconButton color="inherit" className={classes.rightButton}>
                            <Badge badgeContent={17} color="secondary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                        {this.userButton(this.props.user, classes)}
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.props.isDrawerOpen}
                    onClose={() => this.switchDrawer(false)}
                    onOpen={() => this.switchDrawer(true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => this.switchDrawer(false)}
                        onKeyDown={() => this.switchDrawer(false)}
                    >
                        {this.fullList()}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }

}

const styles = createStyles(theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    rightButton: {
        position: 'relative',
        color: "#FFFFFF",
        height: 60,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        marginLeft: 8
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
        minWidth: 250
    },
}));

export default withStyles(styles)(MainNavBar)
