import pathToRegexp = require("path-to-regexp");
import {ApiResponse, PageResult} from "../../services/model/base";
import {GameCollection} from "../../services/model/collection";
import {GetGameCollectionList} from "../../services/collection";
import Game = GameModel.Game;
import {fetchGameList, getGameBand, searchGame} from "../../services/game";
import {IndexCollectionSetting} from "../../services/model/setting";
import {getIndexCollectionSetting} from "../../services/setting";
import {Good, SaleGood} from "../../services/model/good";
import {fetchGoodList, getGoodSaleAna} from "../../services/good";
import {getGoodList} from "../../utils/schema";
import {uniq} from "ramda";
import {ServerUrl} from "../../config/api";
import * as moment from "moment";

export default ({
    namespace: "home",
    state: {
        collections: [],
        saleRank: []
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            history.listen((location) => {
                const match = pathToRegexp('/').exec(location.pathname);
                if (match) {
                    dispatch({
                        type: "fetchRecommendList",
                    });
                    dispatch({
                        type: "fetchSaleRank",
                    });
                    dispatch({
                        type: "fetchNewGame",
                    });
                }
            });
        },
    },
    effects: {
        * 'fetchRecommendList'({payload}, {call, put, select}) {
            const indexCollectionSetting: ApiResponse<IndexCollectionSetting> = yield call(getIndexCollectionSetting, {});
            const displayCollection = indexCollectionSetting.data.collection;
            const collectionResultReponse: ApiResponse<PageResult<GameCollection>> = yield call(GetGameCollectionList, {
                page: {
                    page: 1,
                    pageSize: displayCollection.length,
                },
                id: displayCollection.map(collection => collection.collectionId),
            });
            const collectionGame = {};
            for (let collection of collectionResultReponse.data.result) {
                const gameListResponse: ApiResponse<PageResult<Game>> = yield call(fetchGameList, {collection: collection.id});

                const gameBands = [];
                const gameIdToFetch = gameListResponse.data.result.map(game => (game.id));
                for (let idx in gameIdToFetch) {
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
        * fetchSaleRank({}, {call, select, put}) {
            const response: ApiResponse<SaleGood> = yield call(getGoodSaleAna, {size: 10});
            const goodIdToFetch = response.data.sale.map(good => good.good_id);
            const fetchGoodListResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {id: goodIdToFetch});
            const fetchGameResponse: ApiResponse<PageResult<Game>> = yield call(fetchGameList, {id: uniq(fetchGoodListResponse.data.result.map(good => good.game_id))});
            const gameBands = [];
            const gameIdToFetch = fetchGameResponse.data.result.map(game => (game.id));
            for (let idx in gameIdToFetch) {
                gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]});
            }
            yield put({
                type: "setState",
                payload: {
                    saleRank: response.data.sale.map(saleGood => {
                        const good = fetchGoodListResponse.data.result.find(good => good.id == saleGood.good_id);
                        const game = fetchGameResponse.data.result.find(game => game.id == good.game_id);
                        const band = `${ServerUrl}/${gameBands[game.id].data.path}`;
                        return {
                            ...saleGood,
                            game, good, band
                        }
                    })
                }
            })
        },
        * fetchNewGame({}, {call, put, select}) {
            const response: ApiResponse<PageResult<Game>> = yield call(searchGame, {
                releaseTimeEnd: moment().format("YYYY-MM-DD"),
                pageSize: 10
            });
            const gameBands = [];
            const gameIdToFetch = response.data.result.map(game => (game.id));
            for (let idx in gameIdToFetch) {
                gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]});
            }
            yield put({
                type: "setState",
                payload: {
                    newGames: response.data.result.map(game => ({
                        ...game,
                        band: `${ServerUrl}/${gameBands[game.id].data.path}`
                    }))
                }
            })
        }
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
