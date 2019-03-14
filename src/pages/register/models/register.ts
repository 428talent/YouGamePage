import {ApiResponse} from "../../../services/model/base";
import {CreateUser} from "../../../services/user";
import router from "umi/router";

export default ({
    namespace: "register",
    state: {},
    subscriptions: {},
    effects: {
        * 'createUser'({payload: {username, password, email}}, {call, put}) {
            try {
                yield call(CreateUser, {username, password, email});
                router.push("/login")
            } catch (e) {
                if (e.code === "210002" && e.statusCode === 400) {
                    yield put({
                        type: "error/sendError",
                        message: "用户已存在"
                    })
                } else if (e.code === "210003" && e.statusCode === 400) {
                    yield put({
                        type: "error/sendError",
                        message: "邮箱已被注册"
                    })
                } else if (e.code === "100005" && e.statusCode === 400) {
                    yield put({
                        type: "error/sendError",
                        message: "注册信息有误"
                    })
                } else {
                    yield put({
                        type: "error/sendError",
                        message: "未知错误"
                    });
                    console.log(e)
                }

            }

        }
    },
    reducers: {},

})
