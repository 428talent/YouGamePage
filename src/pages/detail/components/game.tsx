import * as React from "react";
import {
    Avatar, Badge, Button, Chip,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    withStyles
} from "@material-ui/core";
import BaseProps from "../../../base/props";
import ImageGallery from 'react-image-gallery';
import {fetchGame} from "../../../services/game";
import {ServerUrl} from "../../../config/api";
import {ReactNode} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import {connect} from "dva";

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


    createTags(classes): Array<ReactNode> {
        if (this.props.game) {
            return this.props.game.tags.map(tag => {
                return (
                    <Chip className={classes.tag} label={tag.name} key={tag.id}/>
                )
            })
        }

    }

    createGoods(classes): Array<ReactNode> {
        if (this.props.game) {
            return this.props.game.goods.map(good => {
                return (
                    <div key={good.id}>
                        <ListItem>
                            <ListItemText primary={good.name} secondary={`￥${good.price}`}/>
                            <div style={{float: "right"}}>
                                <Button variant="outlined">加入购物车</Button>
                            </div>

                        </ListItem>
                    </div>
                )
            })
        }
    }


    render() {
        const {classes, game} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                {game ? game.name : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>

                        <Grid item xs={8}>
                            <Paper>
                                <ImageGallery items={game?
                                    game.preview_images.map(image => ({original : `${ServerUrl}/${image.path}`})) : []
                                } showThumbnails={false} showPlayButton={false}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper>
                                <img src={game? `${ServerUrl}/${game.band}` : ""}
                                     className={classes.band}/>
                                <div style={{padding: 8}}>
                                    <div className={classes.tagContainer}>
                                        {this.createTags(classes)}
                                    </div>
                                    <Typography variant="subtitle2">
                                        开发商: {game? game.publisher : ""}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        日期：
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <div>
                                    <List>
                                        {this.createGoods(classes)}
                                    </List>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.content}>
                                <div>
                                    <p>
                                        {game? game.intro : ""}
                                    </p>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper>
                                <div>
                                    <List>
                                        <ListItem>
                                            <div>
                                                <div style={{display: "block"}}>
                                                    <Avatar style={{float: "left"}}
                                                            src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"/>
                                                    <div style={{marginLeft: 50}}>
                                                        <div>ArenTakayama</div>
                                                        <div>2018-11-16</div>
                                                    </div>
                                                </div>
                                                <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                                    <p>
                                                        游戏是好游戏我激活之后才发现steam20%off小杉果只有10%emmm我觉得我被套路了
                                                    </p>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <div>
                                                <div style={{display: "block"}}>
                                                    <Avatar style={{float: "left"}}
                                                            src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"/>
                                                    <div style={{marginLeft: 50}}>
                                                        <div>ArenTakayama</div>
                                                        <div>2018-11-16</div>
                                                    </div>
                                                </div>
                                                <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                                    <p>
                                                        游戏是好游戏我激活之后才发现steam20%off小杉果只有10%emmm我觉得我被套路了
                                                    </p>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <div>
                                                <div style={{display: "block"}}>
                                                    <Avatar style={{float: "left"}}
                                                            src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"/>
                                                    <div style={{marginLeft: 50}}>
                                                        <div>ArenTakayama</div>
                                                        <div>2018-11-16</div>
                                                    </div>
                                                </div>
                                                <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                                    <p>
                                                        游戏是好游戏我激活之后才发现steam20%off小杉果只有10%emmm我觉得我被套路了
                                                    </p>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <div>
                                                <div style={{display: "block"}}>
                                                    <Avatar style={{float: "left"}}
                                                            src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"/>
                                                    <div style={{marginLeft: 50}}>
                                                        <div>ArenTakayama</div>
                                                        <div>2018-11-16</div>
                                                    </div>
                                                </div>
                                                <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                                    <p>
                                                        游戏是好游戏我激活之后才发现steam20%off小杉果只有10%emmm我觉得我被套路了
                                                    </p>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider/><ListItem>
                                        <div>
                                            <div style={{display: "block"}}>
                                                <Avatar style={{float: "left"}}
                                                        src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"/>
                                                <div style={{marginLeft: 50}}>
                                                    <div>ArenTakayama</div>
                                                    <div>2018-11-16</div>
                                                </div>
                                            </div>
                                            <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                                <p>
                                                    游戏是好游戏我激活之后才发现steam20%off小杉果只有10%emmm我觉得我被套路了
                                                </p>
                                            </div>
                                        </div>
                                    </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <div>
                                                <div style={{display: "block"}}>
                                                    <Avatar style={{float: "left"}}
                                                            src="http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"/>
                                                    <div style={{marginLeft: 50}}>
                                                        <div>ArenTakayama</div>
                                                        <div>2018-11-16</div>
                                                    </div>
                                                </div>
                                                <div style={{display: "block", marginTop: 15, marginLeft: 50}}>
                                                    <p>
                                                        游戏是好游戏我激活之后才发现steam20%off小杉果只有10%emmm我觉得我被套路了
                                                    </p>
                                                </div>
                                            </div>
                                        </ListItem>
                                    </List>
                                    <Button color="primary" style={{marginBottom: 16, marginLeft: 16}}>
                                        查看更多
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
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
}


const styles = theme => createStyles({
    root: {
        marginLeft: 500,
        marginRight: 500,
        marginTop: 100,

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
    }

});
export default (withStyles(styles)(Game))
