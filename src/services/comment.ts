import {ApiResponse, PageResult} from "./model/base";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {Comment, CommentSummary} from "./model/comment";

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

export function GetGameCommentSummary({gameId}): Promise<ApiResponse<CommentSummary>> {
    return apiRequest({
        url: Api.gameCommentSummary,
        method: "get",
        pathParams: {
            id: gameId
        }
    })

}

export function CreateComment({goodId, content, rating}): Promise<ApiResponse<Comment>> {
    return apiRequest({
        url: Api.comments,
        method: "post",
        data: {
            good_id: goodId, content, rating
        }
    })

}

export function UpdateComment({commentId, data}): Promise<ApiResponse<Comment>> {
    return apiRequest({
        url: Api.comment,
        method: "patch",
        pathParams: {
            id: commentId
        },
        data
    })
}