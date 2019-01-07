import {AxiosResponse} from "axios";
import {Good} from "./model/good";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {ApiResponse, PageResult} from "./model/base";

export function fetchGood({goodId}): Promise<AxiosResponse<Good>> {
    console.log(goodId);
    return apiRequest({
        url: Api.fetchGood,
        method: "get",
        pathParams: {
            id: Number(goodId)
        }
    })
}

export function fetchGoodList(param): Promise<ApiResponse<PageResult<Good>>> {
    return apiRequest({
        url: Api.goods,
        method: "get",
        queryParams: {
            ...param
        }
    })
}
