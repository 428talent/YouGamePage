import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {ApiResponse} from "./model/base";
import CartItem = CartModel.CartItem;

export async function FetchUserCart({userId, page}) {
    return apiRequest({
        url: Api.getCartList,
        method: "get",
        page,
        pathParams: {
            id: userId
        }
    })
}

export function getUserCart({payload}) {
    return apiRequest({
        url: Api.carts,
        method: "get",
        page: payload.page
    })
}


export function deleteCartItem({id}) {
    return apiRequest({
        url: Api.cart,
        method: "delete",
        pathParams: {
            id
        }
    })
}

export function addToCart({id}): Promise<ApiResponse<CartItem>> {
    return apiRequest({
        url: Api.carts,
        method: "post",
        data: {
            good_id: id
        }
    })
}
