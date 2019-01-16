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

export default ({
    namespace: "comments",
    state: {
        data: [],
        page: 1,
        pageSize: 10,
        count: 200,
    },
    subscriptions: {
        'setup'({dispatch, history}) {

        }
    },
    effects: {
        * 'fetchGame'({payload: {gameId}}, {call, select, put}) {
            const fetchGameResponse: ApiResponse<Game> = yield call(fetchGame, {gameId});
            if (fetchGameResponse.requestSuccess) {
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
                    type: "fetchComments", payload: {
                        page: {
                            pageSize: 10, page: 1
                        },
                        gameId: fetchGameResponse.data.id

                    }
                })
                yield put({
                    type: "fetchCommentSummary", payload: {
                        gameId: fetchGameResponse.data.id
                    }
                })

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
