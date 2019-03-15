import {ApiResponse, PageResult} from "./model/base";
import {GameCollection} from "./model/collection";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";

export function GetGameCollectionList({page, ...param}): Promise<ApiResponse<PageResult<GameCollection>>> {
    return apiRequest({
        url: Api.gameCollections,
        method: "get",
        page: page,
        queryParams: {
            ...param
        }
    })
}


export function getCollection({collectionId}) {
    return apiRequest({
        url: Api.gameCollection,
        method: "get",
        pathParams: {
            id: collectionId
        }
    })
}
