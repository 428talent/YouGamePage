import * as React from "react";
import {ReactNode} from "react";
import {
    Avatar,
    Badge,
    Button,
    Chip,
    createStyles,
    Divider,
    Grid, IconButton,
    List,
    ListItem,
    ListItemText,
    Paper, Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import BaseProps from "../../../base/props";
import ImageGallery from 'react-image-gallery';
import {ServerUrl} from "../../../config/api";
import "react-image-gallery/styles/css/image-gallery.css";
import {Image} from "../../../services/model/image";
import {Good} from "../../../services/model/good";
import Tag = GameModel.Tag;
import {parseDate} from "../../../utils/time";
import CommentIcon from '@material-ui/icons/Comment'
import moment = require("moment");

class Game extends React.Component<GameProps, {}> {


    game: {
        name: "Unknown",
        coverUrl: "https://media.st.dl.bscstorage.net/steam/apps/779340/header.jpg?t=1540461393",
        previewImages: [
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_dc4f976ceff589858591110621e9e7c2d1b27a6f.600x338.jpg?t=1540461393',
            },
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_886550807546b6cf97f826b29e91a99baedba2b4.600x338.jpg?t=1540461393',
            },
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_7e4d7bfc11db6a6b35482263bde4b9caa69f06a6.600x338.jpg?t=1540461393',
            }
            ],
        tags: [],
        goods: [],
        intro: "",
        releaseTime: "",
        publisher: ""
    };


    createTags(): Array<ReactNode> {
        const {classes, tags} = this.props;
        return tags.map(tag => {
            return (
                <Chip className={classes.tag} label={tag.name} key={tag.id}/>
            )
        })


    }

    renderComments() {
        const {comments} = this.props;
        return (
            <List>
                {comments.map(comment => (
                    <div key={comment.id}>
                    <ListItem >
                        <div>
                            <div style={{display: "block"}}>
                                <Avatar style={{float: "left"}}
                                        src={`${ServerUrl}/${comment.user.avatar}`}/>
                                <div style={{marginLeft: 50}}>
                                    <div>{comment.user.nickname}</div>
                                    <div>{moment(comment.update_at).format("YYYY-MM-DD")}</div>
                                </div>
                            </div>
                            <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                <p>
                                    {comment.content}

                                </p>
                                <Chip style={{marginTop: 8}} label={comment.good.name}/>
                            </div>

                        </div>

                    </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        );

    }

    renderGoods(): Array<ReactNode> {
        const {classes, goods, dispatch, inventory} = this.props;
        const renderGoodAction = good => {
            if (inventory.find(item => item.good_id === good.id)) {
                return (
                    <div>
                        <Tooltip title="写评论">
                            <IconButton>
                                <CommentIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            } else {
                return (
                    <Button variant="outlined"
                            onClick={(e) => dispatch({
                                type: "detail/addToCart",
                                payload: {id: good.id}
                            })}>加入购物车</Button>
                )
            }
        };
        return goods.map(good => {
            return (
                <div key={good.id}>
                    <ListItem>
                        <ListItemText primary={good.name} secondary={`￥${good.price}`}/>
                        <div style={{float: "right"}}>
                            {renderGoodAction(good)}
                        </div>

                    </ListItem>
                </div>
            )
        })

    }

    handleWishlistAction() {
        const {wishlist, dispatch} = this.props;
        if (wishlist) {
            dispatch({
                type: 'detail/removeFromWishlist',
                payload: {
                    id: wishlist.id
                },

            })
        } else {
            dispatch({
                type: 'detail/addToWishlist',
                payload: {},

            })
        }
    }


    render() {
        const {classes, game, band, preview, dispatch, wishlist} = this.props;
        console.log(this.props);
        return (
            <div>
                <img style={{
                    position: "fixed",
                    zIndex: -100,
                    marginTop: -55,
                    width: "120%",
                    filter: "blur(20px)",
                    marginLeft: -30,
                    marginRight: -20
                }}
                     src={preview.length > 0 ? `${ServerUrl}/${preview[0].path}` : ""}/>
                <img style={{
                    position: "fixed",
                    zIndex: -50,
                    height: 1024,
                    marginTop: -55,
                    width: "120%",
                    opacity: 0.7,
                    filter: "blur(20px)",
                    marginLeft: -30,
                    marginRight: -20,
                    backgroundColor: "#000000"
                }}/>
                <div className={classes.root}>

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper style={{padding: 16}}>
                                <Typography variant="h4">
                                    {game ? game.name : ""}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>

                        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                            <Paper>
                                <ImageGallery
                                    items={preview.map(image => ({original: `${ServerUrl}/${image.path}`}))}
                                    showThumbnails={false}
                                    showPlayButton={false}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                            <Paper>
                                <img src={band ? `${ServerUrl}/${band}` : ""}
                                     className={classes.band}/>
                                <div style={{padding: 8}}>
                                    <div className={classes.tagContainer}>
                                        {this.createTags()}
                                    </div>
                                    <Typography variant="subtitle2">
                                        开发商: {game ? game.publisher : ""}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        日期：{game ? game.release_time : ""}
                                    </Typography>
                                </div>
                                <div style={{textAlign: "center", paddingBottom: 8, paddingLeft: 8, paddingRight: 8}}>
                                    <Button variant={"contained"} fullWidth={true} color={"primary"}
                                            onClick={(e) => this.handleWishlistAction()}>
                                        {wishlist ? "从愿望单删除" : "加入愿望单"}
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <div>
                                    <List>
                                        {this.renderGoods()}
                                    </List>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.content}>
                                <div>
                                    <p>
                                        {game ? game.intro : ""}
                                    </p>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                            <Paper>
                                <div>
                                    {this.renderComments()}
                                    <Button color="primary" style={{marginBottom: 16, marginLeft: 16}}>
                                        查看更多
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                            <Paper>
                                <div style={{padding: 8, height: 100, textAlign: "center"}}>
                                    <div style={{margin: "0 auto", marginTop: 20}}>
                                        <Typography variant="h4">
                                            特别好评
                                        </Typography>
                                    </div>
                                </div>
                                <Divider/>
                                <div style={{marginTop: 12, paddingLeft: 8, paddingRight: 8}}>
                                    <Badge badgeContent={4} color="primary" style={{marginRight: 12, marginBottom: 12}}>
                                        <Chip

                                            label="全部"
                                            component="a"
                                            clickable
                                        />
                                    </Badge>
                                    <Badge badgeContent={4} color="primary" style={{marginRight: 12, marginBottom: 12}}>
                                        <Chip

                                            label="全部"
                                            component="a"
                                            clickable
                                        />
                                    </Badge>
                                    <Badge badgeContent={4} color="primary" style={{marginRight: 12, marginBottom: 12}}>
                                        <Chip

                                            label="全部"
                                            component="a"
                                            clickable
                                        />
                                    </Badge>
                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

interface GameProps extends BaseProps {
    classes: {
        root: string,
        band: string
        gameInfo: string
        title: string
        preview: string
        content: string
        tag: string,
        tagContainer: string
    }
    game?: GameModel.Game
    band?: string
    preview?: Array<Image>
    goods?: Array<Good>
    tags?: Array<Tag>
    wishlist?: any
    dispatch?: any
    inventory?: Array<any>
    comments?: Array<any>
}


const styles = createStyles(theme => ({
    root: {
        marginLeft: 500,
        marginRight: 500,
        marginTop: 100,
        [theme.breakpoints.only('xl')]: {
            marginLeft: 500,
            marginRight: 500,
        },
        [theme.breakpoints.only('lg')]: {
            marginLeft: 400,
            marginRight: 400,
        },
        [theme.breakpoints.only('md')]: {
            marginLeft: 300,
            marginRight: 300,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: 16,
            marginRight: 16,
        }

    },
    title: {
        height: 200
    },
    band: {
        width: "100%",
        float: "left"
    },
    gameInfo: {
        marginLeft: 310
    },
    preview: {
        height: 200
    },
    content: {
        padding: 20
    },
    tagContainer: {
        marginTop: 8,
        marginBottom: 8
    },
    tag: {
        marginRight: 8,
        height: 15
    },


}));
export default (withStyles(styles)(Game))
