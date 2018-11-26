import {AxiosResponse} from "axios";
import {Good} from "./model/good";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";

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
