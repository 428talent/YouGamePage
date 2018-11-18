import {readCookieJWTPayload} from "../utils/auth";
import Axios, {AxiosResponse} from "axios";
import {FetchUser} from "../services/user";

export default ({
    namespace: "app",
    state: {
        user: null
    },
    subscriptions: {
        setup({dispatch, history}) {
            dispatch({
                type: "refreshUser"
            })
        }
    },
    effects: {
        * 'refreshUser'({payload}, {select, call, put}) {
            const jwtPayload = readCookieJWTPayload();
            if (jwtPayload == null) {
                yield put({
                    type: 'setUser',
                    user: null
                })
            }
            const result: AxiosResponse<UserModel.User> = yield call(FetchUser, {userId: jwtPayload.UserId});
            yield put({
                type: "setUser",
                payload: {
                    user: result.data
                }
            })


        },

    },
    reducers: {
        'setUser'(state, {payload}) {
            return {
                ...state,
                user: payload.user
            }
        },
    },

})
