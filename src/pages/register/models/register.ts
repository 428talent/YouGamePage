import {ApiResponse} from "../../../services/model/base";
import {CreateUser} from "../../../services/user";
import router from "umi/router";

export interface RegisterPageState {

}

export default ({
    namespace: "register",
    state: {},
    subscriptions: {},
    effects: {
        * 'createUser'({payload: {username, password}}, {call, put, select}) {
            const createUserResponse: ApiResponse<any> = yield call(CreateUser, {username, password})
            if (createUserResponse.requestSuccess) {
                router.push("/login")
            }
        }
    },
    reducers: {},

})
