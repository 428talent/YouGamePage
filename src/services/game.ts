import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {AxiosResponse} from "axios";
import Game = GameModel.Game;
import {ApiResponse, PageResult} from "./model/base";
import {Image} from "./model/image";
import {Good} from "./model/good";
import Tag = GameModel.Tag;

export function fetchGame({gameId}): Promise<ApiResponse<Game>> {
    return apiRequest<Game>({
        url: Api.fetchGame,
        data: {},
        method: "get",
        pathParams: {
            id: gameId
        }
    })
}

export function fetchGameList({...param}): Promise<ApiResponse<Game>> {
    return apiRequest({
        url: Api.games,
        method: "get",
        queryParams: param
    })
}

export function getGameBand({gameId}): Promise<ApiResponse<Image>> {
    return apiRequest<Image>({
        url: `${Api.fetchGame}/band`,
        data: {},
        method: "get",
        pathParams: {
            id: gameId
        }
    })

}

export function getGamePreview({gameId}): Promise<ApiResponse<Image>> {
    return apiRequest<Image>({
        url: `${Api.fetchGame}/preview`,
        data: {},
        method: "get",
        pathParams: {
            id: gameId
        }
    })

}

export function getGameTag({gameId}): Promise<ApiResponse<Tag>> {
    return apiRequest<Image>({
        url: `${Api.fetchGame}/tags`,
        data: {},
        method: "get",
        pathParams: {
            id: gameId
        }
    })

}

export function GetUserInventoryGameList({userId, ...param}): Promise<ApiResponse<PageResult<Game>>> {
    return apiRequest({
        url: Api.userImventoryGame,
        method: "get",
        pathParams: {
            id: userId
        },
        queryParams: param
    })
}
