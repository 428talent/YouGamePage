import {
    AppBar, Avatar,
    Button, createStyles,
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
import {ServerUrl} from "../config/api";

interface MainNavBarProps extends BaseProps {
    user?: UserModel.User
}

interface MainNavBarState {
    anchorEl?: any
}


class MainNavBar extends React.Component<MainNavBarProps, MainNavBarState> {
    state: Readonly<MainNavBarState> = {
        anchorEl: undefined,
    };

    constructor(props: MainNavBarProps) {
        super(props);
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
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
                <Button className={classes.rightButton} href={"/login/login.html"}>
                    <span className={classes.username}>登录</span>
                </Button>
            )
        }
    };


    render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            YouGame
                        </Typography>
                        <Button aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}

                                style={{height: 60, color: "#FFFFFF"}}
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
                        {this.userButton(this.props.user, classes)}
                    </Toolbar>
                </AppBar>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    disableAutoFocusItem={true}
                    onMouseLeave={this.handleClose}
                    open={Boolean(this.state.anchorEl)}
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

const styles = theme => createStyles({
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

export default withStyles(styles)(MainNavBar)
