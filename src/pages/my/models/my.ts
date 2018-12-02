import {AxiosResponse} from "axios";
import {UserLogin} from "../../../services/user";
import router from "umi/router";

export interface MyPageModelState {
    tabIndex: string
}

export default ({
    namespace: "myPage",
    state: {
        tabIndex: "home"
    },
    subscriptions: {},
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
