import {deleteCartItem, getUserCart} from "../../../services/cart";
import {ApiResponse, PageResult} from "../../../services/model/base";
import {uniq,eqBy,uniqWith} from 'ramda'
import {fetchGoodList} from "../../../services/good";
import {Good} from "../../../services/model/good";
import {fetchGameList, getGameBand} from "../../../services/game";
import * as Cookies from 'js-cookie'
import Game = GameModel.Game;

export default ({
    namespace: "cart",
    state: {
        cartItems: [],
        totalPrice: 0
    },
    subscriptions: {

    },
    effects: {
        * 'fetchCartList'({payload}, {select, call, put}) {
            const token = Cookies.get("yougame_token");
            if (token != null) {
                const fetchCartListResponse: ApiResponse<PageResult<CartModel.CartItem>> = yield call(getUserCart, {
                    payload: {
                        page: {
                            page: 1,
                            pageSize: 10
                        }
                    }
                });
                if (fetchCartListResponse.requestSuccess) {
                    const goodIdListToFetch = uniq(fetchCartListResponse.data.result.map(good => (good.good_id)));
                    const fetchGoodListResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {id: goodIdListToFetch});

                    const gameIdListToFetch = uniq(fetchGoodListResponse.data.result.map(good => (good.game_id)));
                    const fetchGameListResponse: ApiResponse<PageResult<Game>> = yield call(fetchGameList, {id: gameIdListToFetch});


                    // const fetchGameBandResult = yield gameIdListToFetch.map(id => (call(getGameBand, {gameId: id})));
                    const gameBands = [];
                    for (let idx in gameIdListToFetch) {
                        gameBands[gameIdListToFetch[idx]] = yield call(getGameBand, {gameId: gameIdListToFetch[idx]})
                    }
                    const goodList = fetchCartListResponse.data.result.map(cartItem => {
                        const good = fetchGoodListResponse.data.result.find(good => good.id === cartItem.good_id);
                        let game = undefined;
                        if (good) {
                            game = fetchGameListResponse.data.result.find(game => game.id === good.game_id);
                            game.band = gameBands[game.id].data
                        }


                        return {
                            ...cartItem,
                            good,
                            game
                        }
                    });
                    yield put({
                        type: "fetchGoodListSuccess",
                        payload: {
                            cartItems: goodList,
                            totalPrice: goodList
                                .map(cartItem => cartItem.good.price)
                                .reduce((a, b) => (a + b))

                        }
                    })
                }
            }
        },
        * 'deleteCartItem'({payload: {id}}, {select, call, put}) {
            const deleteCartItemResponse: ApiResponse<any> = yield  call(deleteCartItem, {id});
            if (deleteCartItemResponse.requestSuccess) {
                yield put({
                    type: 'deleteFromCartList',
                    payload: {
                        id
                    },
                })
            }
        }
    },
    reducers: {
        'fetchGoodListSuccess'(state, {payload}) {
            return {
                ...state,
                cartItems: uniqWith((a:any,b:any)=> (a.id === b.id),[...state.cartItems, ...payload.cartItems]),
                totalPrice: payload.totalPrice

            }
        },
        'deleteFromCartList'(state, {payload: {id}}) {
            return {
                ...state,
                cartItems: state.cartItems.filter(cart => cart.id != id)
            }
        }
    },

})
