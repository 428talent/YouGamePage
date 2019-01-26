import * as React from 'react'
import {Component} from 'react'
import {createStyles, Grid, withStyles} from "@material-ui/core";
import BaseProps from "../../../../base/props";
import {connect} from "dva";
import CommentHeader from "./components/Header";
import CommentCard from "./components/Card";
import CommentFilter from "./components/Filter";
import Pagination from "../../../order/components/Pagination";
import {ServerUrl} from "../../../../config/api";
import router from "umi/router";
import {buildUrlQueryParams} from "../../../../utils/url";
import {Good} from "../../../../services/model/good";
import EditCommentPanel from "./components/EditCommentPanel";

interface CommentPageProps extends BaseProps {
    data: Array<any>
    page: number
    pageSize: number
    count: number
    match: any
    dispatch: any
    game?: any
    summary?: any
    location?: any,
    goods: Array<Good>,
    userComments: Array<Comment>
}


class CommentPage extends Component<CommentPageProps, {}> {

    renderCommentCards() {
        const {data, classes} = this.props;
        return data.map(comment => (
            <Grid item xs={12}>
                <CommentCard
                    avatar={comment.user.avatar}
                    time={comment.create_at}
                    content={comment.content}
                    name={comment.user.nickname}
                    goodName={comment.good.name}
                    rating={comment.rating}
                    key={comment.id}
                />
            </Grid>
        ))

    }

    onPageChange(page) {
        const {location, game} = this.props;
        router.push(buildUrlQueryParams(`/detail/${game.id}/comments`, {
            ...location.query,
            page,
        }))
    }

    onFilterChange(filter) {
        const {location, game} = this.props;
        console.log(filter);
        router.push(buildUrlQueryParams(`/detail/${game.id}/comments`, {
            ...location.query,
            rating: filter.rating,
            good: filter.goods
        }))

    }

    render(): React.ReactNode {
        const {classes, count, game, dispatch, summary, location, goods, userComments} = this.props;

        //combie filter
        let {
            page = 1,
            pageSize = 10,
            rating = [],
            good = []
        } = location.query;
        if (!Array.isArray(rating)) {
            rating = [rating]
        }
        if (!Array.isArray(good)) {
            good = [good]
        }
        good = good.map(goodId => (Number(goodId)));

        return (
            <div>
                <img className={classes.bgImg} src={game ? `${ServerUrl}/${game.band}` : ""}/>
                <img className={classes.bgOverlay}/>
                <div className={classes.container}>


                    <CommentHeader band={game ? `${ServerUrl}/${game.band}` : ""}
                                   name={game ? game.name : "Unknown"}/>
                    <Grid container spacing={24} className={classes.commentContainer}>
                        <Grid item xs={9}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} key={"-1"}>
                                    <EditCommentPanel
                                        goods={goods}
                                        comments={
                                            userComments.map((comment: any) => ({
                                                goodId: comment.good_id,
                                                content: comment.content,
                                                rating: comment.rating
                                            }))}
                                        onUpdateComment={(goodId, content, rating,callback) => dispatch({
                                            type: "comments/updateComment",
                                            payload: {goodId, content, rating,callback}
                                        })}
                                        onCreateComment={(goodId, content, rating, callback) => dispatch({
                                            type: "comments/createComment",
                                            payload: {
                                                goodId, content, rating, callback
                                            }
                                        })}
                                    />
                                </Grid>
                                {this.renderCommentCards()}
                                <Grid item xs={12}>
                                    <Pagination
                                        onSelectPage={(page) => this.onPageChange(page)}
                                        onPreviousPage={() => this.onPageChange(page - 1)}
                                        onNextPage={() => this.onPageChange(page + 1)}
                                        {...{count, page: Number(page), pageSize: Number(pageSize)}}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <CommentFilter
                                summary={summary}
                                filter={{rating, goods: good}}
                                goodFilter={goods.map(good => ({id: good.id, name: good.name}))}
                                onFilterChange={(filter) => this.onFilterChange(filter)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

}

const styles = createStyles(theme => ({
    container: {
        minHeight: 880,
        paddingTop: 100,
        paddingLeft: 300,
        paddingRight: 300
    },
    commentContainer: {
        marginTop: 26,

    },
    bgImg: {
        position: "fixed",
        zIndex: -100,
        marginLeft: -96,
        width: "120%",
        filter: "blur(20px)",
        objectFit: "cover"
    },
    bgOverlay: {
        position: "fixed",
        zIndex: -50,
        height: 1024,
        marginLeft: -96,
        marginTop: -55,
        width: "120%",
        opacity: 0.7,
        filter: "blur(20px)",
        backgroundColor: "#000000"
    }

}));
export default connect(({comments}) => ({...comments}))(withStyles(styles)(CommentPage));
