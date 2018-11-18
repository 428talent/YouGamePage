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
