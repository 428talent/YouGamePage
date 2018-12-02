import {apiRequest} from "../utils/request";
import {AxiosError, AxiosResponse} from "axios";
import {WishListItem} from "./model/wishlist";
import {Api} from "../config/api";

export function fetchWishList({option}): Promise<AxiosResponse<WishListItem>> {
    return apiRequest({
        url: Api.getWishListItems,
        method: "get",
        queryParams: option,
        page: option.page
    })
}
