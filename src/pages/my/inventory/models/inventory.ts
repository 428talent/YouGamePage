import {AxiosResponse} from "axios";
import router from "umi/router";
import pathToRegexp = require("path-to-regexp");
import {ApiResponse, PageResult} from "../../../../services/model/base";
import {GetInventoryItemList} from "../../../../services/inventory";
import {readCookieJWTPayload} from "../../../../utils/auth";
import {getGameBand, GetUserInventoryGameList} from "../../../../services/game";
import {InventoryItem} from "../../../../services/model/inventory";
import {Good} from "../../../../services/model/good";
import {fetchGoodList} from "../../../../services/good";
import {uniq} from "ramda";


export default ({
    namespace: "inventory",
    state: {
        page: 1,
        pageSize: 10,
        count: 0,
        data: [],
        detailMode: false
    },
    subscriptions: {},
    effects: {
        * 'queryGame'({payload: {}}, {call, put, select}) {
            const jwtPayload = readCookieJWTPayload();
            if (jwtPayload != null) {
                const gameListResponse: ApiResponse<PageResult<GameModel.Game>> = yield call(GetUserInventoryGameList, {userId: jwtPayload.UserId});
                if (gameListResponse.requestSuccess) {
                    const gameBands = [];
                    const gameIdToFetch = gameListResponse.data.result.map(game => (game.id));
                    for (let idx in gameIdToFetch) {
                        gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]})
                    }
                    yield put({
                        type: "setState", payload: {
                            data: gameListResponse.data.result.map(game => ({
                                ...game,
                                band: gameBands[game.id].data.path
                            }))
                        }
                    });
                }
            }

        },
        * 'queryGood'({gameId}, {select, call, put}) {
            const getInventoryItemListResponse: ApiResponse<PageResult<InventoryItem>> = yield call(GetInventoryItemList, {page:{page:1,pageSize:50},game: gameId});
            const goodId = uniq(getInventoryItemListResponse.data.result.map(item => (item.good_id)));
            const goodListResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {id: goodId});
            if (getInventoryItemListResponse.requestSuccess && goodListResponse.requestSuccess) {
                yield put({
                    type: 'setState',
                    payload: {

                        detailItems: getInventoryItemListResponse.data.result.map(item => ({
                            ...item,
                            good: goodListResponse.data.result.find(good => good.id == item.good_id)
                        }))

                    },
                });
            }
        },

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
