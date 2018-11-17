import request, {apiRequest} from "../utils/request";
import {url} from "inspector";
import {Api} from "../config/api";
import {AxiosResponse} from "axios";

export function UserLogin(username: string, password: string): Promise<AxiosResponse<UserModel.UserAuth>> {
    return apiRequest({
        method: "post",
        url: Api.userLogin,
        data: {
            login_name: username, password: password
        }
    })
}

export function FetchUser(userId: number): Promise<AxiosResponse<UserModel.User>> {
    return apiRequest<UserModel.User>({
        method: "get",
        url: Api.getUser,
        pathParams: {
            id: userId
        }
    })
}


