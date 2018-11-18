import Axios, {AxiosResponse} from "axios";
import {EffectsMapObject, Model} from "dva";
import {UserLogin} from "../../../services/user";
import * as Cookies from 'js-cookie'
import router from "umi/router";

export default ({
    namespace: "login",
    state: {},
    subscriptions: {},
    effects: {
        * 'login'({payload}, {select, call, put}) {
            const loginResult: AxiosResponse<UserModel.UserAuth> = yield call(UserLogin, payload);
            Cookies.set('yougame_token', loginResult.data.payload.Sign, {expires: 15});
            console.log(loginResult.data);
            yield put({type: 'app/refreshUser'});
            router.push("/")
        },
    },
    reducers: {},

})

