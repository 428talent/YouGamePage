import {AxiosError, AxiosResponse} from 'axios';
import {Api} from '../config/api';
import {apiRequest} from '../utils/request';
import {WishListItem} from './model/wishlist';
import {ApiResponse} from "./model/base";

export function fetchWishList({option}): Promise<AxiosResponse<WishListItem>> {
    return apiRequest({
        url: Api.getWishListItems,
        method: 'get',
        queryParams: option,
        page: option.page,
    });
}

export function AddToWishList({gameId}): Promise<ApiResponse<WishListItem>> {
    return apiRequest({
        url: Api.getWishListItems,
        method: "post",
        data: {
            game_id: gameId
        }
    })
}

export function deleteWishListItems({option}): Promise<AxiosResponse<any>> {
    return apiRequest({
        data: {
            ...option,
        },
        method: 'delete',
        url: Api.deleteWishlistItems,
    });
}

export function deleteWishlistItem({id}): Promise<ApiResponse<any>> {
    return apiRequest({
        url: Api.wishlist,
        method: 'delete',
        pathParams: {id}
    })
}
