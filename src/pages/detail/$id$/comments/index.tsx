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

interface CommentPageProps extends BaseProps {
    data: Array<any>
    page: number
    pageSize: number
    count: number
    match: any
    dispatch: any
    game?: any
    summary?:any
}


class CommentPage extends Component<CommentPageProps, {}> {
    componentDidMount(): void {
        const {dispatch} = this.props;
        const gameId = Number(this.props.match.params.id);
        dispatch({type: "comments/fetchGame", payload: {gameId}})
    }

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
                />
            </Grid>
        ))

    }

    handleRefreshData({page, pageSize, ...filter}) {

    }

    render(): React.ReactNode {
        const {classes, count, page, pageSize, game, dispatch,summary} = this.props;
        return (
            <div className={classes.container}>
                <CommentHeader band={game ? `${ServerUrl}/${game.band}` : ""}
                               name={game ? game.name : "Unknown"}/>
                <Grid container spacing={24} className={classes.commentContainer}>
                    <Grid item xs={9}>
                        <Grid container spacing={24}>
                            {this.renderCommentCards()}
                            <Grid item xs={12}>
                                <Pagination
                                    onSelectPage={(page) => dispatch({
                                        type: "comments/fetchComments",
                                        payload: {
                                            page: {
                                                page: page,
                                                pageSize: pageSize,

                                            },
                                            gameId: game.id

                                        }
                                    })}
                                    onPreviousPage={() => dispatch({
                                        type: "comments/fetchComments",
                                        payload: {
                                            page: {
                                                page: page - 1,
                                                pageSize: pageSize,

                                            },
                                            gameId: game.id

                                        }
                                    })}
                                    onNextPage={() => dispatch({
                                        type: "comments/fetchComments",
                                        payload: {
                                            page: {
                                                page: page + 1,
                                                pageSize: pageSize,

                                            },
                                            gameId: game.id

                                        }
                                    })}
                                    {...{count, page, pageSize}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <CommentFilter summary={summary}/>
                    </Grid>
                </Grid>
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

    }
}));
export default connect(({comments}) => ({...comments}))(withStyles(styles)(CommentPage));
