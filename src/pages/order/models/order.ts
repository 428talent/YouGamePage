import {ApiResponse, PageResult} from "../../../services/model/base";
import {Order} from "../../../services/model/order";
import {fetchOrderGood, fetchOrderList} from "../../../services/order";
import {uniq} from "ramda";
import {OrderGood} from "../../../services/model/ordergood";
import {fetchGoodList} from "../../../services/good";
import {Good} from "../../../services/model/good";
import {fetchGameList, getGameBand} from "../../../services/game";

export default ({
    namespace: "order",
    state: {
        orders: [],
        page: 1,
        pageSize: 10,
        count: 0,
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            return history.listen((location) => {
                if (location.pathname === '/order') {
                    dispatch({type: "fetchOrders"})
                }
            });
        },
    },
    effects: {
        * 'fetchOrders'({payload}, {select, call, put}) {
            const fetchOrderListResponse: ApiResponse<PageResult<Order>> = yield call(fetchOrderList, {...payload});
            // fetch order good
            const orderIdToFetch = uniq(fetchOrderListResponse.data.result.map(order => (order.id)));
            let orderList = fetchOrderListResponse.data.result;

            const fetchOrderGoodListResponse: ApiResponse<PageResult<OrderGood>> = yield call(fetchOrderGood, {orderId: orderIdToFetch});

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
            orderList = orderList.map(order => ({
                ...order,
                goods: fetchOrderGoodListResponse.data.result.filter(orderGood => orderGood.order_id === order.id).map(orderGood => ({
                    ...orderGood,
                    gameGood: (good => ({
                        ...good,
                        game: {
                            ...fetchGameListResponse.data.result.find(game => game.id === good.game_id),
                            band: gameBands[good.game_id].data.path
                        }
                    }))(fetchGoodListResponse.data.result.find(good => good.id === orderGood.good_id))
                }))
            }));
            yield put({
                type: "fetchOrderListSuccess", payload: {
                    orders: orderList,
                    page: fetchOrderListResponse.data.page,
                    pageSize: fetchOrderListResponse.data.page_size,
                    count: fetchOrderListResponse.data.count
                }
            })

        },
        * fetchOrderGood({payload}, {select, call, put}) {

        }
    },
    reducers: {
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        },
        fetchOrderListSuccess(state, {payload: {orders, page, pageSize, count}}) {
            return {
                ...state,
                orders,
                pageSize,
                page,
                count
            }
        }
    },

})
