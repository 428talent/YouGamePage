import * as Cookies from 'js-cookie'
import axios, {AxiosResponse} from 'axios'
import Game = GameModel.Game;

interface ApiRequestInit {
    url: string,
    method: string,
    data?: object,
    queryParams?: object,
    pathParams?: object
    form?: FormData
}

function request(url: string, method: string, data: object = undefined, queryParams: object = undefined, pathParams: object = undefined): Promise<AxiosResponse> {
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
        url: url,
        headers: {
            "Authorization": Cookies.get("yougame_token"),
            "Content-Type": "application/json"
        },
        data: data

    })
}

export const apiRequest = <MT extends any>(init: ApiRequestInit): Promise<AxiosResponse<MT>> => {
    let {
        url, method, data, queryParams, pathParams, form
    } = init;
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

    if (form) {
        return axios.request({
            method: method,
            data: form,
            url: url,
            headers: {
                "Authorization": Cookies.get("yougame_token"),
                'Content-Type': 'multipart/form-data'
            },
        })
    } else {
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
                    url: url,
                    headers: {
                        "Authorization": Cookies.get("yougame_token"),
                        "Content-Type": "application/json"
                    },
                })
        }
    }


};

export default request
