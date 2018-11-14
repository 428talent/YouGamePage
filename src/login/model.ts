"use strict";
import Cookies from 'js-cookie'
import {UserLogin} from "../services/user";
import {Model} from "dva";

export default {
    namespace: "app",
    state: {},
    effects: {
        * 'userLogin'(action, {put, call, select, take}) {
            const {username, password} = action.payload;
            console.log(action.payload);
            const loginResult = yield call(UserLogin, {username:username, password:password});
            console.log(loginResult)
            Cookies.set('yougame_token', loginResult.payload.Sign, { expires: 7 });
        }
    }
}

