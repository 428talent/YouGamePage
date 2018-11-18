import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {AxiosResponse} from "axios";
import Game = GameModel.Game;

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
