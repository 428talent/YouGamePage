import {FetchUserCart} from "../../../services/cart";
import {AxiosResponse} from "axios";
import pathToRegexp = require("path-to-regexp");
import {PageResult} from "../../../services/model/base";

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
            const user: UserModel.User = yield select(state => (state.app.user));
            if (user != null) {
                const fetchCartListResponse: AxiosResponse<PageResult<CartModel.CartItem>> = yield call(FetchUserCart, {userId: user.id});
                yield put({
                    type: "fetchGoodListSuccess",
                    payload: {
                        cartItems: fetchCartListResponse.data.result,
                        totalPrice: fetchCartListResponse.data.result
                            .map(cartItem => cartItem.good.price)
                            .reduce((a, b) => (a + b))
                    }
                })
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
