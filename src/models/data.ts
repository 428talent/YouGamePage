import {normalize, schema} from 'normalizr'
import {gameEntity, goodEntity, orderEntity, orderGoodsEntity, ordersSchema} from "../utils/schema";
import {OrderGood} from "../services/model/ordergood";
import {AxiosResponse} from "axios";
import {Good} from "../services/model/good";
import {fetchGood} from "../services/good";
import {StoreGoodModel} from "../store/model/Good";
import {number, object} from "prop-types";
import {fetchGame} from "../services/game";
import Game = GameModel.Game;
import * as lodash from "lodash"
import {StoreGameModel} from "../store/model/Game";
import {PageResult} from "../services/model/base";
import {Order} from "../services/model/order";
import {fetchOrderList} from "../services/order";
import {EffectsCommandMap, EffectsMapObject, Model, ReducersMapObjectWithEnhancer, SubscriptionsMapObject} from "dva";
import {ReducersMapObject} from "redux";
import {any, none} from "ramda"
enum RequestQueueAction {
    Add, Remove
}

export interface DataState {
    orders: {
        result: Array<number>,
        entities: {
            orders: {
                id: number,
                state: string
            }
        }
    },
    orderGoods: {
        result: Array<number>,
        entities: {
            orderGoods: any
        }
        orderIndex:Map<number,Array<number>>
    },
    goods: {
        result: Array<number>,
        entities: {
            goods: StoreGoodModel
        }
    },
    games: {
        result: Array<number>,
        entities: {
            games: StoreGameModel
        }
    },
    requestQueue: {
        games: Set<number>
    }
}


export default ({
    namespace: "data",
    state: {
        orders: {
            result: [],
            entities: {
                orders: {}
            }
        },
        orderGoods: {
            result: [],
            entities: {
                orderGoods: {}
            },
            orderIndex:new Map<number,Array<null>>()

        },
        goods: {
            result: [],
            entities: {
                goods: {}
            }
        },
        games: {
            result: [],
            entities: {
                games: {}
            }
        },
        requestQueue: {
            games: new Set()
        }
    },
    subscriptions: {},
    effects: {
        * 'fetchGood'({payload: {goodId}}, {select, call, put}) {
            const goods = yield select(state => state.data.goods);
            if (goods) {
                if (goods.entities.goods[goodId]) {
                    return
                }
            }
            const fetchGoodResult: AxiosResponse<Good> = yield call(fetchGood, {goodId});
            console.log(fetchGoodResult);
            yield put({
                type: "storeGood",
                payload: {
                    good: new StoreGoodModel(fetchGoodResult.data)
                }
            })

        },
        * fetchGame({payload: {gameId}}, {select, call, put}) {
            const games = yield select(state => state.data.games);
            const requestGameQueue = yield select(state => state.data.requestQueue.games);

            if (games.entities.games[gameId]) {
                return
            }

            if (requestGameQueue.has(gameId)) {
                return
            }
            yield put({
                type: "setRequestState",
                payload: {
                    ref: "games",
                    type: RequestQueueAction.Add,
                    id: gameId
                }
            });
            const fetchGameResult: AxiosResponse<Game> = yield call(fetchGame, {gameId});
            yield put({
                type: "setRequestState",
                payload: {
                    ref: "games",
                    type: RequestQueueAction.Remove,
                    id: gameId
                }
            });

            yield put({
                type: "storeGame",
                payload: {
                    game: new StoreGameModel(fetchGameResult.data)
                }
            })
        },
        * 'fetchOrders'({payload}, {select, call, put}) {
            //get current user
            const user: UserModel.User = yield select(state => (state.app.user));
            //handle with filter
            const filter = yield select(state => (state.order.filter));
            const OrderFilter = lodash.pickBy(filter);

            //get start page
            const startPage = yield select(state => (state.order.startPage));

            const response: AxiosResponse<PageResult<Order>> = yield call(fetchOrderList, {
                user: user.id, ...OrderFilter, page: payload.page, pageSize: payload.pageSize
            });
            const orders = response.data.result.map(order => ({
                id: order.id,
                state: order.state
            }));

            yield put({
                type: "data/storeOrder",
                payload: {
                    orders
                }

            });
            if (payload.reload == undefined) {
                payload.reload = true
            }
            yield put({
                type: "fetchOrderListSuccess",
                payload: {
                    orders,
                    reload: payload.reload,
                }
            })
        }
    },
    reducers: {
        'storeOrder'(state, {payload}) {
            const newState = Object.assign({}, state);
            if (!state.orders) {
                newState.orders = normalize(payload.orders, ordersSchema);
                return newState
            }
            payload.orders.map(order => {
                console.log(order);
                newState.orders.entities.orders[order.id] = order;
                if (!newState.orders.result.includes(order.id)) {
                    newState.orders.result.push(order.id)
                }
            });
            newState.orders.result.sort().reverse();
            return newState
        },
        'storeOrderGood'(state, {payload}) {
            const newState = Object.assign({}, state);

            payload.orderGoods.map(orderGood => {
                newState.orderGoods.entities.orderGoods[orderGood.id] = orderGood;
                if (none((id) => id === orderGood.id,newState.orderGoods.result)) {
                    newState.orderGoods.result.push(orderGood.id)
                }
                if (newState.orderGoods.orderIndex[orderGood.orderId]){
                    newState.orderGoods.orderIndex[orderGood.orderId].push(orderGood.id)
                }else{
                    newState.orderGoods.orderIndex[orderGood.orderId] = [orderGood.id]
                }
            });
            return newState
        },
        'storeGood'(state, {payload}) {
            const good: StoreGoodModel = payload.good;
            const newState = Object.assign({}, state);
            if (!state.goods) {
                newState.goods = normalize([good], new schema.Array(goodEntity));
                return newState
            }
            newState.goods.entities.goods[good.id] = good;
            if (!newState.goods.result.includes(good.id)) {
                newState.goods.result.push(good.id)
            }
            newState.goods.result.sort().reverse();
            return newState
        },
        'setRequestState'(state, {payload}) {
            const {ref, id, type} = payload;
            const newState = Object.assign({}, state);
            switch (type) {
                case RequestQueueAction.Add:
                    newState.requestQueue[ref].add(id);
                    break;
                case RequestQueueAction.Remove:
                    newState.requestQueue[ref].delete(id);
            }

            return newState
        },
        'storeGame'(state, {payload}) {
            const game: StoreGameModel = payload.game;
            const newState = Object.assign({}, state);
            newState.games.entities.games[game.id] = game;
            if (!newState.games.result.includes(game.id)) {
                newState.games.result.push(game.id)
            }
            newState.games.result.sort().reverse();
            return newState
        }
    },

})
