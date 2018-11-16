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
import BaseProps from "../../base/props";
import ImageGallery from 'react-image-gallery';

class Game extends React.Component<GameProps, {}> {

    render() {
        const {classes} = this.props;
        const images = [
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_dc4f976ceff589858591110621e9e7c2d1b27a6f.600x338.jpg?t=1540461393',
                originalClass: "preview-img",
                thumbnail: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_dc4f976ceff589858591110621e9e7c2d1b27a6f.116x65.jpg?t=1540461393',
            },
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_886550807546b6cf97f826b29e91a99baedba2b4.600x338.jpg?t=1540461393',
                originalClass: "preview-img",
                thumbnail: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_886550807546b6cf97f826b29e91a99baedba2b4.116x65.jpg?t=1540461393'
            },
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_7e4d7bfc11db6a6b35482263bde4b9caa69f06a6.600x338.jpg?t=1540461393',
                originalClass: "preview-img",
                thumbnail: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_7e4d7bfc11db6a6b35482263bde4b9caa69f06a6.116x65.jpg?t=1540461393'
            }
        ];
        return (
            <div>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                Total War: THREE KINGDOMS
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>

                        <Grid item xs={8}>
                            <Paper>
                                <ImageGallery items={images}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper>
                                <img src="https://media.st.dl.bscstorage.net/steam/apps/779340/header.jpg?t=1540461393"
                                     className={classes.band}/>
                                <div style={{padding: 8}}>
                                    <div className={classes.tagContainer}>
                                        <Chip className={classes.tag} label="策略"/>
                                        <Chip className={classes.tag} label="模拟"/>
                                    </div>
                                    <Typography variant="subtitle2">
                                        开发商:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        发行商：
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        日期：2018-11-16
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <div>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="标准版" secondary="￥248"/>
                                            <div style={{float: "right"}}>
                                                <Button variant="outlined">加入购物车</Button>
                                            </div>

                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary="标准版" secondary="￥248"/>
                                            <div style={{float: "right"}}>
                                                <Button variant="outlined">加入购物车</Button>
                                            </div>

                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary="标准版" secondary="￥248"/>
                                            <div style={{float: "right"}}>
                                                <Button variant="outlined">加入购物车</Button>
                                            </div>

                                        </ListItem>
                                    </List>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.content}>
                                <div>
                                    <p>
                                        《Total War: THREE
                                        KINGDOMS》首次在这一获奖无数的策略类游戏系列中重塑中国古代的烽火传奇。在扣人心弦的回合制战役中，可以建设国家，治国理政；在令人叹为观止的即时战斗中，则可以征战沙场，破军杀敌。《Total
                                        War: THREE KINGDOMS》将二者巧妙结合，重新定义了那段英雄辈出的传奇历史。


                                        公元190年的中国

                                        欢迎来到传奇征战的新时代。
                                        江山如画，奈何诸侯裂土称王，此时需有新人君临天下，变更世道。你需要一统天下，再立新朝，建万古之基业。
                                        从十一位传奇诸侯中做出选择，进而征服天下。征募英雄人物助你完成大业，通过军事、科技、政治和经济手段迫使敌人就范。
                                        你究竟是会建立牢不可破的兄弟之盟并获取敌人的尊敬？还是会两面三刀，行阴谋诡计，成一代奸雄？
                                        传奇等你来书写，但毫无疑问，壮美山河等你征服。
                                        再塑天下


                                        三国时代，江山如画。从南国丛林，到茫茫大漠，再到皑皑雪山，皆可演兵于此。而诸如长城长江等地标奇观更是令人叹为观止。此刻天下兵荒马乱，在平复天下之际，大可访古探今，探索天下。
                                        天下传奇


                                        从传奇巨著《三国演义》中选择十一位诸侯之一君临天下。无论是无双将帅，强力猛士，还是治国奇才，都有自己独特的玩法和目标。你可以选取强大的英雄阵容指挥军队，管理州郡，治国理政，强化自己的统治。人物是本作的核心，天下尽在英雄手中掌握。
                                        关系机制


                                        关系是中国的一种动态联系观念，有基于此，《Total War: THREE
                                        KINGDOMS》改编塑造了一批形象的传奇英雄及其关系，他们可以决定天下大势。每个人物都有其独特的性格、动机与好恶。他们相互之间也各有喜恶关系，这决定了你的剧本的走向。
                                        艺术精粹


                                        本作视觉效果绝佳，武术打斗激烈，可谓战争的艺术。再加上用户界面美观，场景令人震撼，还有真实的中国风艺术，本作重塑的古代中国可谓一场视觉盛宴。
                                        缓急相济


                                        《Total War: THREE
                                        KINGDOMS》的回合制战役与即时战斗比之前结合得更为流畅。战斗中的表现会产生更大的影响，会影响英雄与你之间的关系，也会影响他们与其他角色之间的敌友关系。如今强援也是制胜关键所在，这也提供了一种全新的取胜元素。
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
                                    <Button color="primary" style={{marginBottom:16,marginLeft:16}}>
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
export default withStyles(styles)(Game)
