import {AxiosResponse} from "axios";
import {PageResult} from "../../../services/model/base";
import {WishListItem} from "../../../services/model/wishlist";
import {fetchWishList} from "../../../services/wishlist";
import StoreWishList from "../../../store/model/WishList";
import {number} from "prop-types";

export interface MyPageModelState {
    pageIndex: number
}

export default ({
    namespace: "myWishlist",
    state: {
        pageIndex: 1,
        firstLoading: false,
        totalCount: 0,
        wishListItems: {},
        pageSize: 10,
        isActionMode: false,
        selectedItems: new Set<number>()
    },
    subscriptions: {
        setup({dispatch, history}) {
            if (history.location.pathname === '/my/wishlist') {
                dispatch({
                    type: "myPage/changeTab",
                    payload: {
                        tab: "wishlist"
                    }
                });
            }
        }
    },
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
                type: "wishlist/storeWishLists",
                payload: {
                    wishListItems: wishLists
                }

            });
            yield put({
                type: "fetchWishlistItemsSuccess",
                payload: {
                    totalCount: response.data.count,
                    items: response.data.result.map(item => item.id),
                    page: payload.page.page
                }
            })
        }
    },
    reducers: {
        onItemSelectChange(state, {payload: {isSelect, id}}) {
            const selectedItems: Set<number> = new Set<number>(state.selectedItems);
            isSelect ? selectedItems.add(id) : selectedItems.delete(id);
            console.log(isSelect);
            return {
                ...state,
                selectedItems: selectedItems
            }
        },
        changePage(state, {payload: {page}}) {
            return {
                ...state,
                pageIndex: page
            }
        },
        setFirstLoading(state, {payload: {firstLoading}}) {
            return {
                ...state,
                firstLoading
            }
        },
        fetchWishlistItemsSuccess(state, {payload: {totalCount, items, page}}) {
            const wishListItems = {...state.wishListItems};
            wishListItems[page] = items;
            return {
                ...state,
                totalCount: totalCount,
                wishListItems,
            }
        },
        switchActionMode(state, {payload: {isActionMode}}) {
            return {
                ...state,
                isActionMode
            }
        }

    },

})
