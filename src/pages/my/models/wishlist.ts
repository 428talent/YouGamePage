import {AxiosResponse} from "axios";
import {ApiResponse, PageResult} from "../../../services/model/base";
import {WishListItem} from "../../../services/model/wishlist";
import {deleteWishListItems, fetchWishList} from "../../../services/wishlist";
import StoreWishList from "../../../store/model/WishList";
import {uniq, without} from "ramda";
import Game = GameModel.Game;
import {fetchGameList, getGameBand} from "../../../services/game";

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
        page: 1,
        count: 0,
        isActionMode: false,
        selectedItems: new Set<number>(),
        items: []
    },
    subscriptions: {},
    effects: {
        * 'fetchWishList'({payload}, {select, call, put}) {
            //get current user
            // const user: UserModel.User = yield select(state => (state.app.user));
            // if (!user) {
            //     return
            // }
            const {page, pageSize} = yield select(state => (state.myWishlist));
            // if (!user) {
            //     return
            // }
            const fetchWishListResponse: ApiResponse<PageResult<WishListItem>> = yield call(fetchWishList, {
                option: {
                    ...payload,
                    page,
                    pageSize,
                }
            });
            const gameIdToFetch: Array<number> = uniq(fetchWishListResponse.data.result.map(item => (item.game_id)));
            const fetchGameListResponse: ApiResponse<PageResult<Game>> = yield call(fetchGameList, {id: gameIdToFetch});

            const gameBands = [];
            for (let idx in gameIdToFetch) {
                gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]})
            }
            yield put({
                type: "fetchWishlistItemsSuccess", payload: {
                    items: fetchWishListResponse.data.result.map(wishListItem => ({
                        ...wishListItem,
                        game: {
                            ...fetchGameListResponse.data.result.find(game => game.id === wishListItem.game_id),
                            band: gameBands[wishListItem.game_id].data.path
                        }
                    })),
                    count: fetchGameListResponse.data.count,
                    page: fetchGameListResponse.data.page,
                    pageSize: fetchGameListResponse.data.page_size,
                }
            })


        },
        * 'deleteWishlistItems'({payload: {ids}}, {select, call, put}) {
            const deleteResult: AxiosResponse<any> = yield call(deleteWishListItems, {
                option: {
                    items: ids
                }
            });
            if (deleteResult.status === 200) {
                yield put({
                    type: "removeWishlistItems",
                    payload: {
                        ids
                    }
                });
                yield put({
                    type: "wishlist/removeWishListItems",
                    payload: {
                        ids
                    }
                })
            }
        }
    },
    reducers: {
        'removeWishlistItems'(state, {payload: {ids}}) {
            const newState = Object.assign({}, state);
            Object.getOwnPropertyNames(newState.wishListItems).forEach(index => {
                const pageItem: Array<number> = newState.wishListItems[index];
                newState.wishListItems[index] = without(ids, pageItem)
            });
            return newState
        },
        'onItemSelectChange'(state, {payload: {isSelect, id}}) {
            const selectedItems: Set<number> = new Set<number>(state.selectedItems);
            isSelect ? selectedItems.add(id) : selectedItems.delete(id);
            console.log(isSelect);
            return {
                ...state,
                selectedItems: selectedItems
            }
        },
        'changePage'(state, {payload: {page}}) {
            return {
                ...state,
                pageIndex: page
            }
        },
        'setFirstLoading'(state, {payload: {firstLoading}}) {
            return {
                ...state,
                firstLoading
            }
        },
        fetchWishlistItemsSuccess(state, {payload}) {
            return {
                ...state,
                ...payload
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
