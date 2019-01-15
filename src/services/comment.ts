import {ApiResponse, PageResult} from "./model/base";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {Comment} from "./model/comment";

export function GetCommentList({page, ...param}): Promise<PageResult<ApiResponse<Comment>>> {
    return apiRequest({
        url: Api.comments,
        method: "get",
        queryParams: {
            ...param
        },
        page,
    })
}
