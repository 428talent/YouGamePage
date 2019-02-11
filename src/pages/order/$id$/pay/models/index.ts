import {uniq} from "ramda";
import {ApiResponse, PageResult} from "../../../../../services/model/base";
import {Order} from "../../../../../services/model/order";
import {fetchOrder, fetchOrderGood, fetchOrderList, payOrder} from "../../../../../services/order";
import {OrderGood} from "../../../../../services/model/ordergood";
import {fetchGoodList} from "../../../../../services/good";
import {fetchGameList, getGameBand} from "../../../../../services/game";
import {Good} from "../../../../../services/model/good";
import * as pathToRegexp from "path-to-regexp"
import {Wallet} from "../../../../../services/model/wallet";
import {GetUserWallet} from "../../../../../services/user";
import {readCookieJWTPayload} from "../../../../../utils/auth";
import {AxiosResponse} from "axios";

export default ({
    namespace: "orderPay",
    state: {
        payConfirmDialogShow: false,
        payResultDialogShow: false
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            return history.listen((location) => {
                const match = pathToRegexp('/order/:orderId/pay').exec(location.pathname);
                if (match) {
                    dispatch({
                        type: "fetchOrders",
                        payload: {orderId: match[1]},
                    });
                    dispatch({
                        type: "fetchUserWallet",
                        payload: {}
                    })
                }
            });
        },
    },
    effects: {
        * 'fetchOrders'({payload: {orderId}}, {select, call, put}) {
            // fetch order good
            const fetchOrderResponse: ApiResponse<Order> = yield call(fetchOrder, {orderId});

            const fetchOrderGoodListResponse: ApiResponse<PageResult<OrderGood>> = yield call(fetchOrderGood, {orderId});

            //fetch good
            const goodIdToFetch = uniq(fetchOrderGoodListResponse.data.result.map(orderGood => (orderGood.good_id)));
            const fetchGoodListResponse: ApiResponse<PageResult<Good>> = yield  yield call(fetchGoodList, {id: goodIdToFetch});

            //fetch game
            const gameIdToFetch = uniq(fetchGoodListResponse.data.result.map(good => (good.game_id)));
            const fetchGameListResponse: ApiResponse<PageResult<GameModel.Game>> = yield call(fetchGameList, {id: gameIdToFetch});

            //fetchGameBand
            const gameBands = [];
            for (let idx in gameIdToFetch) {
                gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]})
            }

            //produce view data model
            const order = {
                ...fetchOrderResponse.data,
                goods: fetchOrderGoodListResponse.data.result.map(orderGood => ({
                    ...orderGood,
                    gameGood: (good => ({
                        ...good,
                        game: {
                            ...fetchGameListResponse.data.result.find(game => game.id === good.game_id),
                            band: gameBands[good.game_id].data.path
                        }
                    }))(fetchGoodListResponse.data.result.find(good => good.id === orderGood.good_id))
                }))
            };
            yield put({
                type: "setState", payload: {
                    order: order,
                }
            })

        },
        * fetchUserWallet({}, {call, put, select}) {
            const jwtPayload = readCookieJWTPayload();
            if (jwtPayload == null) {
                return;
            }
            const userWalletResponse: ApiResponse<Wallet> = yield call(GetUserWallet, {userId: jwtPayload.UserId})
            yield put({
                type: "setState",
                payload: {
                    balance: userWalletResponse.data.balance
                }
            })
        },
        * payOrder({}, {call, put, select}) {
            const {order} = yield select(state => (state.orderPay));
            if (!order) {
                return
            }
            try {
                const payResponse: AxiosResponse<ApiResponse<any>> = yield call(payOrder, {orderId: order.id});
                yield put({
                    type: "setState",
                    payload: {
                        payConfirmDialogShow: false,
                        payResultDialogShow: true,
                        payResultText: "支付成功"
                    }
                })
            } catch (e) {
                console.log(e);
                yield put({
                    type: "error/sendError",
                    message: "支付失败"
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
        },

    },

})
