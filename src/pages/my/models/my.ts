import {AxiosResponse} from "axios";
import {UserLogin} from "../../../services/user";
import router from "umi/router";
import pathToRegexp = require("path-to-regexp");

export interface MyPageModelState {
    tabIndex: string
}

export default ({
    namespace: "myPage",
    state: {
        tabIndex: "home"
    },
    subscriptions: {
        setup({dispatch, history}) {
            const match = pathToRegexp('/my/:pageIndex').exec(history.location.pathname);
            if (match) {
                dispatch({
                    type: "changeTab",
                    payload: {tab:match[1]}
                })
            }
        }
    },
    effects: {},
    reducers: {
        changeTab(state, {payload: {tab}}) {
            return {
                ...state,
                tabIndex: tab
            }
        },
        fetchWishListSuccess(state,{}){
            return state
        }
    },

})
