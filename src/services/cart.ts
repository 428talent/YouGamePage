import {apiRequest} from "../utils/request";
import {Api} from "../config/api";

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
