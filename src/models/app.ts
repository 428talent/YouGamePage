import {readCookieJWTPayload} from "../utils/auth";
import Axios, {AxiosResponse} from "axios";
import {FetchUser} from "../services/user";

export default ({
    namespace: "app",
    state: {
        user: null,
        isDrawerOpen: false
    },
    subscriptions: {
        setup({dispatch, history}) {
            dispatch({
                type: "refreshUser",
                payload: {
                    path: history.location.pathname
                }
            })
        }
    },
    effects: {
        * 'refreshUser'({payload}, {select, call, put}) {
            const jwtPayload = readCookieJWTPayload();

            if (jwtPayload == null) {
                yield put({
                    type: 'setUser',
                    payload: {
                        user: null
                    }
                });
                return
            }
            const result: AxiosResponse<UserModel.User> = yield call(FetchUser, {userId: jwtPayload.UserId});
            yield put({
                type: "setUser",
                payload: {
                    user: result.data
                }
            });
            yield put({
                type: "cart/fetchCartList",
                payload: {}
            });
            // if (payload.path === '/my/wishlist') {
            //     yield put({
            //         type: "wishlist/fetchWishList",
            //         payload: {}
            //     });
            // }

        },

    },
    reducers: {
        'setUser'(state, {payload}) {
            return {
                ...state,
                user: payload.user
            }
        },
        'switchDrawer'(state, {payload: {isOpen}}) {
            return {
                ...state,
                isDrawerOpen: isOpen
            }
        },
    },

})
