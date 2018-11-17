import Cookies from 'js-cookie'
import axios, {AxiosResponse} from 'axios'
import Game = GameModel.Game;

interface ApiRequestInit {
    url: string,
    method: string,
    data?: object,
    queryParams?: object,
    pathParams?: object
}

function request(url: string, method: string, data: object = undefined, queryParams: object = undefined, pathParams: object = undefined): Promise<AxiosResponse> {
    console.log(pathParams);
    console.log(data);
    if (queryParams) {
        url = url + "?" + Object.getOwnPropertyNames(queryParams).map(value => {
            return `${value}=${queryParams[value]}`
        }).join("&")
    }
    if (pathParams) {
        Object.getOwnPropertyNames(pathParams).forEach(value => {
            url = url.replace(`:${value}`, pathParams[value])
        })
    }

    return axios({
        method,
        url:url,
        headers: {
            "Authorization": Cookies.get("yougame_token"),
            "Content-Type": "application/json"
        },
        data:data
    })
}

export const apiRequest = <MT extends any>(init: ApiRequestInit): Promise<AxiosResponse<MT>> => {
    let {
        url, method, data, queryParams, pathParams
    } = init;
    console.log(pathParams);
    console.log(data);
    if (queryParams) {
        url = url + "?" + Object.getOwnPropertyNames(queryParams).map(value => {
            return `${value}=${queryParams[value]}`
        }).join("&")
    }
    if (pathParams) {
        Object.getOwnPropertyNames(pathParams).forEach(value => {
            url = url.replace(`:${value}`, pathParams[value])
        })
    }
    method = method.toLowerCase();
    switch (method) {
        case "get":
            return axios.get(url, {
                headers: {
                    "Authorization": Cookies.get("yougame_token"),
                    "Content-Type": "application/json"
                }
            });
        default:
            return axios.request({
                method: method,
                data: data,
                url:url,
                headers: {
                    "Authorization": Cookies.get("yougame_token"),
                    "Content-Type": "application/json"
                },
            })
    }

};

export default request
