import {AxiosResponse} from "axios";
import router from "umi/router";
import {fetchGame, getGameBand, getGamePreview, getGameTag} from "../../../services/game";
import pathToRegexp = require("path-to-regexp");
import {ApiResponse, PageResult} from "../../../services/model/base";
import {Image} from "../../../services/model/image";
import {Good} from "../../../services/model/good";
import {fetchGoodList} from "../../../services/good";
import Tag = GameModel.Tag;
import {WishListItem} from "../../../services/model/wishlist";
import {deleteWishlistItem, fetchWishList, AddToWishList} from "../../../services/wishlist";

export default ({
    namespace: "detail",
    state: {
        game: undefined,
        band: undefined,
        preview: [],
        goods: [],
        tags: [],
        wishlist: undefined
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            const match = pathToRegexp('/detail/:gameId').exec(history.location.pathname);
            if (match) {
                dispatch({
                    type: "fetchGame",
                    payload: {gameId: match[1]}
                })
            }
        }
    },
    effects: {
        * 'fetchGame'({payload}, {select, call, put}) {

            const fetchGameResponse: ApiResponse<any> = yield call(fetchGame, payload);
            if (fetchGameResponse.requestSuccess) {
                yield put({
                    type: "fetchGameSuccess",
                    payload: {
                        game: fetchGameResponse.data
                    }
                });
                yield put({
                    type: 'fetchGameBand',
                    id: fetchGameResponse.data.id
                });
                yield put({
                    type: 'fetchGamePreview',
                    id: fetchGameResponse.data.id
                });
                yield put({
                    type: 'fetchGameGood',
                    id: fetchGameResponse.data.id
                });
                yield put({
                    type: 'fetchGameTag',
                    id: fetchGameResponse.data.id
                });
                yield put({
                    type: 'checkGameInWishlist',
                    id: fetchGameResponse.data.id
                })

            }


        },

        * 'fetchGameBand'({id}, {select, call, put}) {
            const getGameBandResponse: ApiResponse<Image> = yield call(getGameBand, {gameId: id});
            console.log(getGameBandResponse);
            if (getGameBandResponse.requestSuccess) {
                yield put({
                    type: 'fetchGameBandSuccess',
                    payload: {
                        path: getGameBandResponse.data.path
                    },
                })
            }
        },
        * 'checkGameInWishlist'({id}, {select, call, put}) {
            const fetchWishlistResponse: ApiResponse<PageResult<WishListItem>> = yield call(fetchWishList, {
                option: {
                    game: id,
                    page: {page: 1, pageSize: 1}
                }
            });
            if (fetchWishlistResponse.requestSuccess) {
                if (fetchWishlistResponse.data.count == 1) {
                    yield put({
                        type: 'setState',
                        payload: {
                            wishlist: fetchWishlistResponse.data.result[0]
                        },
                    });
                }
            }
        },
        * 'fetchGamePreview'({id}, {select, call, put}) {
            const getGamePreviewResponse: ApiResponse<PageResult<Image>> = yield call(getGamePreview, {gameId: id});
            console.log(getGamePreviewResponse);
            if (getGamePreviewResponse.requestSuccess) {
                yield put({
                    type: 'fetchGamePreviewSuccess',
                    payload: {
                        preview: getGamePreviewResponse.data.result
                    },
                })
            }
        },
        * 'fetchGameGood'({id}, {select, call, put}) {
            const fetchGameGoodResponse: ApiResponse<PageResult<Good>> = yield call(fetchGoodList, {game: id})
            if (fetchGameGoodResponse.requestSuccess) {
                yield put({
                    type: 'fetchGameGoodListSuccess',
                    payload: {
                        goods: fetchGameGoodResponse.data.result
                    },
                })
            }
        },
        * 'fetchGameTag'({id}, {select, call, put}) {
            const fetchGameTagResponse: ApiResponse<PageResult<Tag>> = yield call(getGameTag, {gameId: id})
            if (fetchGameTagResponse.requestSuccess) {
                yield put({
                    type: 'fetchGameTagListSuccess',
                    payload: {
                        tags: fetchGameTagResponse.data.result
                    },
                })
            }
        },
        * 'removeFromWishlist'({payload: {id}}, {select, call, put}) {
            const removeWishlistResponse: ApiResponse<any> = yield call(deleteWishlistItem, {id});
            if (removeWishlistResponse.requestSuccess) {
                yield put({
                    type: 'setState',
                    payload: {
                        wishlist: undefined
                    },
                });
            }
        },
        * 'addToWishlist'({payload: {}}, {select, call, put}) {
            const game = yield select(state => (state.detail.game));
            if (game) {
                const addWishlistResponse: ApiResponse<WishListItem> = yield call(AddToWishList, {gameId: game.id});
                if (addWishlistResponse.requestSuccess) {
                    yield put({
                        type: 'setState',
                        payload: {
                            wishlist: addWishlistResponse.data
                        },
                    });
                }
            }

        }
    },
    reducers: {
        'fetchGameSuccess'(state, {payload}) {
            return {
                ...state,
                game: payload.game
            }
        },
        'fetchGameBandSuccess'(state, {payload: {path}}) {
            return {
                ...state,
                band: path
            }
        },
        'fetchGamePreviewSuccess'(state, {payload: {preview}}) {

            return {
                ...state,
                preview
            }
        },
        'fetchGameGoodListSuccess'(state, {payload: {goods}}) {
            return {
                ...state,
                goods
            }
        },
        'fetchGameTagListSuccess'(state, {payload: {tags}}) {
            return {
                ...state,
                tags
            }
        },
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    },

})
