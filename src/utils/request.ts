import * as Cookies from 'js-cookie'
import axios, {AxiosResponse} from 'axios'
import Game = GameModel.Game;

interface ApiRequestInit {
    url: string,
    method: string,
    data?: object,
    queryParams?: object,
    pathParams?: object
    form?: FormData,
    page?: {
        pageSize: number,
        page: number
    }
}


export const apiRequest = <MT extends any>(init: ApiRequestInit): Promise<any> => {
    let {
        url, method, data, queryParams, pathParams, form, page
    } = init;
    if (page) {
        queryParams["page"] = page.page;
        queryParams["pageSize"] = page.pageSize;
    }
    if (queryParams) {
        url = url + "?" + Object.getOwnPropertyNames(queryParams).map(queryParam => {
            if (Array.isArray(queryParams[queryParam])){
                return queryParams[queryParam].map(queryParamValue => (`${queryParam}=${queryParamValue}`)).join("&")
            }
            return `${queryParam}=${queryParams[queryParam]}`
        }).join("&")
    }
    if (pathParams) {
        Object.getOwnPropertyNames(pathParams).forEach(value => {
            url = url.replace(`:${value}`, pathParams[value])
        })
    }
    method = method.toLowerCase();
    const sendRequest = () => {
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
    }

    return sendRequest().then(response => {
        const {statusText, status} = response
        console.log(response.data)
        return Promise.resolve({
            requestSuccess: true,
            message: statusText,
            statusCode: status,
            data: response.data
        })
    }).catch(error => {
        const {response} = error;
        let msg;
        let statusCode;
        if (response && response instanceof Object) {
            const {data, statusText} = response;
            statusCode = response.status;
            msg = data.message || statusText
        } else {
            statusCode = 600;
            msg = error.message || 'Network Error'
        }

        /* eslint-disable */
        return Promise.reject({success: false, statusCode, message: msg, error: data})
    })


};

