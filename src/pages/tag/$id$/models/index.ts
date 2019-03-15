import {fetchGameList, getGameBand, getTag} from "../../../../services/game";
import {ApiResponse, PageResult} from "../../../../services/model/base";
import pathToRegexp = require("path-to-regexp");
import Game = GameModel.Game;
import {ServerUrl} from "../../../../config/api";
import Tag = GameModel.Tag;


export default ({
    namespace: "tag",
    state: {
        games: [],
        page: 1,
        pageSize: 10,
        count: 0
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen((location) => {
                const match = pathToRegexp('/tag/:tag').exec(location.pathname);
                if (match) {
                    dispatch({
                        type: "setState",
                        payload: {
                            tagId: Number(match[1])
                        }
                    });
                    dispatch({
                        type: "query",
                    });
                    dispatch({
                        type: "queryTag",
                    })
                }
            });
        }
    },
    effects: {
        * query({}, {call, put, select}) {
            const {tagId} = yield select(state => (state.tag));
            const response: ApiResponse<PageResult<Game>> = yield call(fetchGameList, {tag: tagId});
            const gameBands = [];
            const gameIdToFetch = response.data.result.map(game => (game.id));
            for (let idx in gameIdToFetch) {
                gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]})
            }
            yield put({
                type: "setState",
                payload: {
                    games: response.data.result.map(game => ({
                        ...game,
                        band: `${ServerUrl}/${gameBands[game.id].data.path}`
                    })),
                    page: response.data.page,
                    pageSize: response.data.page_size,
                    count: response.data.count
                }
            })
        },
        * queryTag({}, {call, put, select}) {
            const {tagId} = yield select(state => (state.tag));
            const response: ApiResponse<Tag> = yield call(getTag, {tagId: tagId});
            yield put({
                type: "setState",
                payload: {
                    data: response.data
                }
            })
        }
    },
    reducers: {
        setState(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    },

})
