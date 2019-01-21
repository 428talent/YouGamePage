import {ApiResponse, PageResult} from "./model/base";
import {GameCollection} from "./model/collection";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";

export function GetGameCollectionList({page, ...param}): Promise<ApiResponse<PageResult<GameCollection>>> {
    return apiRequest({
        url: Api.gameCollections,
        method: "get",
        page: page
    })
}
