import pathToRegexp = require("path-to-regexp");
import {ApiResponse, PageResult} from "../../services/model/base";
import {GameCollection} from "../../services/model/collection";
import {GetGameCollectionList} from "../../services/collection";
import Game = GameModel.Game;
import {fetchGameList, getGameBand} from "../../services/game";

export default ({
    namespace: "home",
    state: {
        collections:[],
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            history.listen((location) => {
                const match = pathToRegexp('/').exec(location.pathname);
                if(match) {
                    dispatch({
                        type: "fetchRecommendList",
                    });
                }
            });
        },
    },
    effects: {
        * 'fetchRecommendList'({payload}, {call, put, select}) {
            const collectionResultReponse: ApiResponse<PageResult<GameCollection>> = yield call(GetGameCollectionList, {
                page: {
                    page: 1,
                    pageSize: 2,
                },
                name: ["recommend", "newgame"],
            });

            const collectionGame = {};
            for(let collection of collectionResultReponse.data.result) {
                const gameListResponse: ApiResponse<PageResult<Game>> = yield call(fetchGameList, {collection: collection.id});

                const gameBands = [];
                const gameIdToFetch = gameListResponse.data.result.map(game => (game.id));
                for(let idx in gameIdToFetch) {
                    gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]});
                }
                collectionGame[collection.id] = {
                    games: gameListResponse.data.result.map(game => ({
                        ...game,
                        band: gameBands[game.id].data.path,
                    })),
                };
            }
            yield put({
                type: "setState",
                payload: {
                    collections: collectionResultReponse.data.result.map(collection => ({
                        ...collection,
                        ...collectionGame[collection.id],
                    })),
                },
            });
        },
    },
    reducers: {
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
    },

});
