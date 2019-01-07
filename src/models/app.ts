import {readCookieJWTPayload} from "../utils/auth";
import Axios, {AxiosResponse} from "axios";
import {FetchUser, QueryProfile} from "../services/user";
import {ApiResponse} from "../services/model/base";

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
            const result: ApiResponse<UserModel.User> = yield call(FetchUser, {userId: jwtPayload.UserId});
            const queryUserProfileResponse : ApiResponse<Profile> =  yield call(QueryProfile,{userId: jwtPayload.UserId});
            yield put({
                type: "setUser",
                payload: {
                    user: {
                        ...result.data,
                        profile:queryUserProfileResponse.data
                    }
                }
            });
            yield put({
                type: "cart/fetchCartList",
                payload: {}
            });
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
