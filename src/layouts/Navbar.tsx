import {
    AppBar,
    Avatar,
    Badge,
    Button,
    ClickAwayListener,
    createStyles,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    SwipeableDrawer,
    Toolbar,
    Typography,
    withStyles,
} from "@material-ui/core";
import * as React from "react";
import {createRef, Ref} from "react";
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {fade} from '@material-ui/core/styles/colorManipulator';
import BaseProps from "../base/props";
import {ServerUrl} from "../config/api";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import router from "umi/router";
import CategoryMenu from "./components/CategoryMenu";

interface MainNavBarProps extends BaseProps {
    user?: UserModel.User,
    isDrawerOpen: boolean,
    dispatch: any,
    cartItemCount: number
    onUserLogOut: () => void
}

class MainNavBar extends React.Component<MainNavBarProps, {
    userMenuOpen: boolean
    categoryMenuOpen: boolean
    searchContent: string
}> {

    state = {
        userMenuOpen: false,
        categoryMenuOpen: false,
        searchContent: ""
    };
    renderUserAvatar = (user) => {
        if (user != null) {
            const {profile} = user;
            if (profile.avatar.length > 0) {
                return (
                    <Avatar
                        alt="avatar"
                        src={`${ServerUrl}/${profile.avatar}`}
                    />
                )
            } else {

                return (
                    <Avatar
                        alt="avatar"
                    >
                        {profile.nickname[0]}
                    </Avatar>
                )
            }
        } else {
            return (
                <Avatar style={{width: 80, height: 80}}>
                    <PersonIcon style={{width: 64, height: 64}}/>
                </Avatar>
            )
        }


    };

    renderMenuUserAvatar = (user) => {
        if (user != null) {
            const {profile} = user;
            if (profile.avatar.length > 0) {
                return (
                    <Avatar
                        style={{width: 96, height: 96}}
                        alt="avatar"
                        src={`${ServerUrl}/${profile.avatar}`}
                    />
                )
            } else {

                return (
                    <Avatar
                        style={{width: 96, height: 96}}
                        alt="avatar"
                    >
                        {profile.nickname[0]}
                    </Avatar>
                )
            }
        } else {
            return (
                <Avatar style={{width: 96, height: 96}}>
                    <PersonIcon style={{width: 64, height: 64}}/>
                </Avatar>
            )
        }


    };


    switchDrawer = (isOpen: boolean) => {
        this.props.dispatch({
            type: "app/switchDrawer",
            payload: {
                isOpen
            }
        })
    };
    userMenuRef: Ref<HTMLElement> = createRef();


    fullList = () => (
        <div className={this.props.classes.fullList}>
            <div style={{height: 150, display: "flex", alignItems: "center", justifyContent: "center"}}>
                {this.renderUserAvatar(this.props.user)}

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
        const userButton = (user: UserModel.User, classes) => {
            if (user) {
                return (
                    <ClickAwayListener onClickAway={(e) => this.setState({userMenuOpen: false})}>
                        <div>
                            <Button
                                className={classes.rightButton}
                                onClick={() => this.setState({userMenuOpen: true})}
                            >
                                {this.renderUserAvatar(this.props.user)}
                            </Button>
                            {this.state.userMenuOpen ? <Paper style={{position: "absolute", right: 26}}>
                                <div style={{width: 320}}>
                                    <div style={{padding: 16, display: "flex", alignItems: "flex-start"}}>
                                        <div>
                                            {this.renderMenuUserAvatar(this.props.user)}
                                        </div>
                                        <div style={{marginLeft: 12}}>
                                            <Typography variant={"h6"}>
                                                {user.profile.nickname}
                                            </Typography>
                                            <Typography variant={"subtitle2"}>
                                                @{user.username}
                                            </Typography>

                                        </div>
                                    </div>
                                    <Divider/>
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.setState({userMenuOpen: false});
                                                router.push("/my/wishlist")
                                            }}
                                        >个人中心
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                this.setState({userMenuOpen: false});
                                                router.push("/cart")
                                            }}
                                        >购物车
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                this.setState({userMenuOpen: false});
                                                router.push("/setting")
                                            }}
                                        >账户设置
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => this.props.dispatch({
                                                type: "app/logOut"
                                            })}
                                        >登出</MenuItem>
                                    </MenuList>
                                </div>
                            </Paper> : undefined}


                        </div>
                    </ClickAwayListener>

                )
            } else {
                return (
                    <Button className={classes.rightButton} href={"/login"}>
                        <span className={classes.username}>登录</span>
                    </Button>
                )
            }
        };
        const {classes, isDrawerOpen, cartItemCount = 0} = this.props;
        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        {/*<IconButton onClick={() => this.switchDrawer(true)} className={classes.menuButton}*/}
                        {/*color="inherit" aria-label="Menu">*/}
                        {/*<MenuIcon/>*/}
                        {/*</IconButton>*/}

                        <img src={"/public/logo_light.svg"} style={{width: 48}} onClick={() => router.push("/")}/>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            You Game
                        </Typography>
                        <div style={{marginLeft: 64}}>

                            <ClickAwayListener onClickAway={(e) => this.setState({categoryMenuOpen: false})}>
                                <div
                                    onMouseOver={(e) => this.setState({categoryMenuOpen: true})}
                                    onMouseOut={(e) => this.setState({categoryMenuOpen: false})}
                                >
                                    <Button
                                        style={{height: 64}}

                                    >
                                        <Typography variant={"subtitle1"} style={{
                                            color: this.state.categoryMenuOpen ? "#FFFFFF" : "#CCCCCC",
                                            height: "100%"
                                        }}>
                                            分类
                                        </Typography>
                                    </Button>
                                    <CategoryMenu open={this.state.categoryMenuOpen}/>
                                </div>
                            </ClickAwayListener>

                        </div>
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
                                onChange={(e) => this.setState({searchContent: e.target.value})}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === "Enter" && this.state.searchContent.length > 0) {
                                        router.push(`/games?search=${this.state.searchContent}`)
                                    }
                                }}

                            />
                        </div>
                        <IconButton color="inherit" className={classes.rightButton}
                                    onClick={() => router.push("/cart")}>
                            <Badge badgeContent={cartItemCount} color="secondary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                        {userButton(this.props.user, classes)}
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
