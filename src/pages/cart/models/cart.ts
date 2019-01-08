import {FetchUserCart} from "../../../services/cart";
import {AxiosResponse} from "axios";
import pathToRegexp = require("path-to-regexp");
import {ApiResponse, PageResult} from "../../../services/model/base";
import {uniq} from 'ramda'
import {fetchGoodList} from "../../../services/good";
import {Good} from "../../../services/model/good";
import Game = GameModel.Game;
import {fetchGame, fetchGameList} from "../../../services/game";

export default ({
    namespace: "cart",
    state: {
        cartItems: [],
        totalPrice: 0
    },
    subscriptions: {},
    effects: {
        * 'fetchCartList'({payload}, {select, call, put}) {
            const user: UserModel.User = yield select(state => (state.app.user));
            if (user != null) {
                const fetchCartListResponse: ApiResponse<PageResult<CartModel.CartItem>> = yield call(FetchUserCart, {userId: user.id});
                if (fetchCartListResponse.requestSuccess) {
                    const goodIdListToFetch = uniq(fetchCartListResponse.data.result.map(good => (good.good_id)));
                    const fetchGoodListResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {id: goodIdListToFetch});

                    const gameIdListToFetch = uniq(fetchGoodListResponse.data.result.map(good => (good.game_id)));
                    const fetchGameListResponse : ApiResponse<PageResult<Game>> = yield call(fetchGameList,{id:gameIdListToFetch});
                    const goodList = fetchCartListResponse.data.result.map(cartItem => {
                        const good = fetchGoodListResponse.data.result.find(good => good.id === cartItem.good_id);
                        let game = undefined;
                        if (good){
                            game = fetchGameListResponse.data.result.find(game => game.id === good.game_id);
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
    },
    reducers: {
        'fetchGoodListSuccess'(state, {payload}) {
            return {
                ...state,
                cartItems: [...state.cartItems, ...payload.cartItems],
                totalPrice: payload.totalPrice

            }
        }
    },

})
