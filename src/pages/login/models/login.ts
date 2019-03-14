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
            try {
                const loginResult: ApiResponse<UserModel.UserAuth> = yield call(UserLogin, payload);
                console.log(loginResult);
                if (loginResult.requestSuccess){
                    Cookies.set('yougame_token', loginResult.data.payload.Sign, {expires: 15});
                    yield put({type: 'app/refreshUser'});
                    router.push("/")
                }
            }catch (e) {
                if (e.code === "100000" && e.statusCode == 401){
                    yield put({
                        type:"error/sendError",
                        message:"登陆失败，用户验证失败"
                    })
                }
                if (e.statusCode == 500){
                    yield put({
                        type:"error/sendError",
                        message:"与YouGame 服务连接出现了问题"
                    })
                }
                console.log(e)
            }

        },
    },
    reducers: {},

})

