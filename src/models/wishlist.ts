import {AxiosResponse} from "axios";
import {PageResult} from "../services/model/base";
import {fetchWishList} from "../services/wishlist";
import {WishListItem} from "../services/model/wishlist";
import StoreWishList from "../store/model/WishList";
import data from "./data";
import {WishlistStore} from "../store/WishlistStore";

export interface WishlistModelState {
    isLoading:boolean,
    wishListItems: {
        result: Array<number>,
        entities: {
            wishListItems: any
        }
    },
}
export default ({
    namespace: "wishlist",
    state: {
        isLoading:false,
        wishListItems: {
            result: [],
            entities: {
                wishListItems: {}
            }
        },
    },
    subscriptions: {},
    effects: {
        * 'fetchWishList'({payload}, {select, call, put}) {
            //get current user
            const user: UserModel.User = yield select(state => (state.app.user));
            if (!user) {
                return
            }
            const response: AxiosResponse<PageResult<WishListItem>> = yield call(fetchWishList, {
                option: {
                    user: user.id,
                    ...payload
                }
            });
            const wishLists: Array<StoreWishList> = response.data.result.map(item => (new StoreWishList(item)));
            yield put({
                type: "game/fetchGameList",
                payload: {
                    gameIds: wishLists.map(it => it.gameId)
                }
            });
            yield put({
                type: "storeWishLists",
                payload: {
                    wishListItems: wishLists
                }

            });
        }
    },
    reducers: {
        'storeWishLists'(state, {payload}) {
            const wishListItems: Array<StoreWishList> = payload.wishListItems;
            const newState = Object.assign({}, state);
            const wishListStore = new WishlistStore(state);
            wishListStore.addItems(wishListItems);
            return {
                ...newState,
            }
        },
        'removeWishListItems' (state,{payload:{ids}}){
            const newState = Object.assign({}, state);
            const wishListStore = new WishlistStore(state);
            wishListStore.removeItems(ids);
            return newState
        }
    },

})
