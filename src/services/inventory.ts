import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {ApiResponse, PageResult} from "./model/base";
import {InventoryItem} from "./model/inventory";

export function GetInventoryItemList({page, ...param}): Promise<ApiResponse<PageResult<InventoryItem>>> {
    return apiRequest({
        url: Api.inventors,
        method: "get",
        queryParams: {
            param
        },
        page
    })
}
