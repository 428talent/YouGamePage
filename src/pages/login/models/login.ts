import Axios, {AxiosResponse} from "axios";
import {EffectsMapObject, Model} from "dva";
import {UserLogin} from "../../../services/user";
import * as Cookies from 'js-cookie'
import router from "umi/router";
import {ApiResponse} from "../../../services/model/base";

export default ({
    namespace: "login",
    state: {},
    subscriptions: {},
    effects: {
        * 'login'({payload}, {select, call, put}) {
            const loginResult: ApiResponse<UserModel.UserAuth> = yield call(UserLogin, payload);
            console.log(loginResult);
            if (loginResult.requestSuccess){
                Cookies.set('yougame_token', loginResult.data.payload.Sign, {expires: 15});
                yield put({type: 'app/refreshUser'});
                router.push("/")
            }
        },
    },
    reducers: {},

})

