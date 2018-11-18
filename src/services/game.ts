import request, {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import Game = GameModel.Game;
import {AxiosResponse} from "axios";

export async function fetchGame({gameId}): Promise<AxiosResponse<Game>> {
    const response = await apiRequest<Game>({
        url: Api.fetchGame,
        data: {},
        method: "get",
        pathParams: {
            id: gameId
        }
    });
    return await response
}
