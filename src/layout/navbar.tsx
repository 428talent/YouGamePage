import {
    AppBar, Avatar,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/ExpandMore';

import {fade} from '@material-ui/core/styles/colorManipulator';
import BaseProps from "../base/props";

interface MainNavBarProps extends BaseProps {

}

interface MainNavBarState {
    anchorEl: any
    isLogin: boolean
}


class MainNavBar extends React.Component<MainNavBarProps, MainNavBarState> {
    classes: any = undefined;

    constructor(props: MainNavBarProps) {
        super(props);
        this.classes = props.classes;
        this.state = {
            anchorEl: null,
            isLogin: false
        };

    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    userButton = (isLogin, classes) => {
        if (isLogin) {
            return (
                <Button className={classes.rightButton}>
                    <Avatar
                        alt="Adelle Charles"
                        src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"
                    />
                    <span className={classes.username}>TakayamaAren</span>
                    <MoreVertIcon/>
                </Button>
            )
        } else {
            return (
                <Button className={classes.rightButton}  href={"/login/login.html"}>
                    <span className={classes.username}>登录</span>
                </Button>
            )
        }
    };


    render(): React.ReactNode {
        const {anchorEl, isLogin} = this.state;
        return (
            <div className={this.classes.root}>
                <AppBar>
                    <Toolbar>
                        <Typography className={this.classes.title} variant="h6" color="inherit" noWrap>
                            YouGame
                        </Typography>
                        <Button aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}

                                style={{height: 60, color: "#FFFFFF"}}
                        >
                            Primary
                            <MoreVertIcon/>
                        </Button>
                        <div className={this.classes.grow}/>
                        <div className={this.classes.search}>
                            <div className={this.classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: this.classes.inputRoot,
                                    input: this.classes.inputInput,
                                }}
                            />
                        </div>
                        {this.userButton(this.state.isLogin, this.classes)}
                    </Toolbar>
                </AppBar>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    disableAutoFocusItem={true}
                    onMouseLeave={this.handleClose}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>

            </div>
        )
    }

}

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
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
        height: 60
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
});
// @ts-ignore
export default withStyles(styles)(MainNavBar)
