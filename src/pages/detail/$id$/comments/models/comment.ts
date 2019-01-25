import {ApiResponse, PageResult} from "../../../../../services/model/base";
import {fetchGame, getGameBand} from "../../../../../services/game";
import Game = GameModel.Game;
import {Image} from "../../../../../services/model/image";
import {Comment, CommentSummary} from "../../../../../services/model/comment";
import {GetCommentList, GetGameCommentSummary} from "../../../../../services/comment";
import {Good} from "../../../../../services/model/good";
import {any, dropWhile, uniq} from "ramda";
import {fetchGoodList} from "../../../../../services/good";
import {GetProfileList} from "../../../../../services/user";
import pathToRegexp = require("path-to-regexp");

export default ({
    namespace: "comments",
    state: {
        data: [],
        page: 1,
        pageSize: 10,
        count: 200,
        goods: []
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            history.listen((location) => {
                const match = pathToRegexp('/detail/:gameId/comments').exec(location.pathname);
                const {
                    page = 1,
                    pageSize = 10,
                    good,
                    rating
                } = history.location.query;
                if (match) {
                    dispatch({
                        type: "fetchGameComments", payload: {
                            gameId: match[1],
                            page,
                            pageSize,
                            good, rating
                        }
                    })
                }
            })
        }
    },
    effects: {
        * 'fetchGameComments'({payload: {gameId, ...params}}, {call, select, put}) {
            let {game} = yield select(state => (state.comments));
            if (!(game && game.id === gameId)) {
                const fetchGameResponse: ApiResponse<Game> = yield call(fetchGame, {gameId});

                const getGameBandResponse: ApiResponse<Image> = yield call(getGameBand, {gameId: fetchGameResponse.data.id});
                yield put({
                    type: "setState", payload: {
                        game: {
                            ...fetchGameResponse.data,
                            band: getGameBandResponse.data.path
                        }
                    }
                });

                yield put({
                    type: "fetchCommentSummary", payload: {
                        gameId: fetchGameResponse.data.id
                    }
                })
            }
            yield put({
                type: "fetchGoodFilter", payload: {
                    gameId: gameId

                }
            });
            const {page, pageSize, good, rating} = params;
            yield put({
                type: "fetchComments", payload: {
                    ...params,
                    page: {
                        page, pageSize
                    },
                    gameId: gameId,
                    order:"-id"

                }
            });


        },
        * 'fetchGoodFilter'({payload: {gameId}}, {select, call, put}) {
            const fetchGoodListResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {gameComment: gameId})
            if (fetchGoodListResponse.requestSuccess) {
                yield put({type: "setState", payload: {goods: fetchGoodListResponse.data.result}})
            }
        },
        * 'fetchCommentSummary'({payload: {gameId}}, {select, call, put}) {
            const fetSummaryResponse: ApiResponse<CommentSummary> = yield call(GetGameCommentSummary, {gameId})
            if (fetSummaryResponse.requestSuccess) {
                yield put({type: "setState", payload: {summary: fetSummaryResponse.data}})
            }
        },
        * 'fetchComments'({payload: {page, gameId, ...filter}}, {select, call, put}) {
            const fetchCommentListResponse: ApiResponse<PageResult<Comment>> = yield call(GetCommentList, {
                page,
                game: gameId,
                ...filter
            });
            if (fetchCommentListResponse.requestSuccess) {
                const goodIdToFetch = uniq(fetchCommentListResponse.data.result.map(comment => (comment.good_id)));

                const fetchCommentGoodListResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {id: goodIdToFetch});
                const commentGood = fetchCommentGoodListResponse.data.result;
                // fetch profile
                const userIdToFetch = uniq(fetchCommentListResponse.data.result.map(profile => (profile.user_id)));
                const fetchCommentUserProfileResponse: ApiResponse<PageResult<Profile>> = yield call(GetProfileList, {user: userIdToFetch});

                yield put({
                    type: "setState", payload: {
                        data: fetchCommentListResponse.data.result.map(comment => ({
                            ...comment,
                            good: commentGood.find(good => comment.good_id === good.id),
                            user: fetchCommentUserProfileResponse.data.result.find(profile => profile.user_id === comment.user_id),

                        })),
                        page: fetchCommentListResponse.data.page,
                        pageSize: fetchCommentListResponse.data.page_size,
                        count: fetchCommentListResponse.data.count
                    }
                })

            }
        }
    },
    reducers: {
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    },

})
