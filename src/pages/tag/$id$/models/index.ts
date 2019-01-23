import {AxiosResponse} from "axios";
import router from "umi/router";
import pathToRegexp = require("path-to-regexp");

export interface MyPageModelState {
    tabIndex: string
}

export default ({
    namespace: "tagPage",
    state: {

    },
    subscriptions: {
        setup({dispatch, history}) {

        }
    },
    effects: {},
    reducers: {},

})
