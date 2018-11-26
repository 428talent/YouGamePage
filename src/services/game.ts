import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {AxiosResponse} from "axios";
import Game = GameModel.Game;

export function fetchGame({gameId}): Promise<AxiosResponse<Game>> {
    return  apiRequest<Game>({
        url: Api.fetchGame,
        data: {},
        method: "get",
        pathParams: {
            id: gameId
        }
    })
}
