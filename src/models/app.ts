import {readCookieJWTPayload} from "../utils/auth";
import Axios, {AxiosResponse} from "axios";
import {FetchUser, QueryProfile} from "../services/user";
import {ApiResponse, PageResult} from "../services/model/base";
import {getUserCart} from "../services/cart";
import CartItem = CartModel.CartItem;
import * as Cookies from 'js-cookie'
import router from "umi/router";

export default ({
    namespace: "app",
    state: {
        user: null,
        isDrawerOpen: false,
        cartCount: 0
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
        * logOut({}, {call, put, select}) {
            Cookies.remove("yougame_token");
            yield put({
                type: "refreshUser"
            });
            router.push("/")
        },
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
            const result: ApiResponse<UserModel.User> = yield call(FetchUser, {userId: jwtPayload.UserId});
            const queryUserProfileResponse: ApiResponse<Profile> = yield call(QueryProfile, {userId: jwtPayload.UserId});
            yield put({
                type: "setUser",
                payload: {
                    user: {
                        ...result.data,
                        profile: queryUserProfileResponse.data
                    }
                }
            });
            yield put({
                type: "fetchUserCartInfo",
                payload: {}
            });
        },
        * 'fetchUserCartInfo'({payload}, {call, put}) {
            const fetchUserCartResponse: ApiResponse<PageResult<CartItem>> = yield call(getUserCart, {
                payload: {
                    page: {
                        page: 1,
                        pageSize: 1
                    }
                }
            });
            if (fetchUserCartResponse.requestSuccess) {
                yield put({type: "setState", payload: {cartCount: fetchUserCartResponse.data.count}})
            }
        }

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
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        }
    },

})
