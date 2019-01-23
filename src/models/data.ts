import {normalize, schema} from 'normalizr'
import {goodEntity, ordersSchema} from "../utils/schema";
import {AxiosResponse} from "axios";
import {Good} from "../services/model/good";
import {fetchGood} from "../services/good";
import {StoreGoodModel} from "../store/model/Good";
import {fetchGame} from "../services/game";
import * as lodash from "lodash"
import {StoreGameModel} from "../store/model/Game";
import {PageResult} from "../services/model/base";
import {Order} from "../services/model/order";
import {fetchOrderList} from "../services/order";
import {none} from "ramda"
import {fetchWishList} from "../services/wishlist";
import {WishListItem} from "../services/model/wishlist";
import StoreWishList from "../store/model/WishList";
import Game = GameModel.Game;

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
    wishListItems: {
        result: Array<number>,
        entities: {
            wishListItems: any
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
        wishListItems: {
            result: [],
            entities: {
                wishListItems: {}
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

        * 'fetchOrders'({payload}, {select, call, put}) {
            //get current user
            const user: UserModel.User = yield select(state => (state.app.user));
            //handle with Filter
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
        },
        * 'fetchWishList'({payload}, {select, call, put}) {
            //get current user
            const user: UserModel.User = yield select(state => (state.app.user));

            const response: AxiosResponse<PageResult<WishListItem>> = yield call(fetchWishList, {
                option:{
                    user: user.id,
                    ...payload
                }
            });
            const wishLists:Array<StoreWishList> = response.data.result.map(item => (new StoreWishList(item)));
            console.log(response);


            const task = wishLists.map(item => item.gameId).map(gameId => call(fetchGame, {gameId}));
            const fetchGamesResults: Array<AxiosResponse<Game>> = yield task;
            const gameList = fetchGamesResults.map(response => (new StoreGameModel(response.data)));
            yield put({
                type: "storeGame",
                payload: {
                    list: gameList
                }
            });

            yield put({
                type: "storeWishLists",
                payload: {
                    wishListItems:wishLists
                }

            });
            yield put({
                type: "my/fetchWishListSuccess",
                payload: {

                }

            });

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
            const newState = Object.assign({}, state);
            if (payload.list){
                payload.list.forEach(game => {
                    newState.games.entities.games[game.id] = game;
                    if (!newState.games.result.includes(game.id)) {
                        newState.games.result = [...newState.games.result,game.id]
                    }
                });
                return newState
            }
            const game: StoreGameModel = payload.game;
            newState.games.entities.games[game.id] = game;
            if (!newState.games.result.includes(game.id)) {
                newState.games.result.push(game.id)
            }
            newState.games.result.sort().reverse();
            return newState
        },
        'storeWishLists'(state, {payload}) {
            const wishListItems: Array<StoreWishList> = payload.wishListItems;
            const newState = Object.assign({}, state);
            wishListItems.forEach(item => {
                newState.wishListItems.entities.wishListItems[item.id] = item;
                if (!newState.wishListItems.result.includes(item.id)) {
                    newState.wishListItems.result.push(item.id)
                }
            });
            return newState
        }
    },

})
