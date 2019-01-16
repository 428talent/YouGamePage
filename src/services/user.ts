import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {AxiosResponse} from "axios";
import {ApiResponse, PageResult} from "./model/base";

export function UserLogin({username, password}): Promise<AxiosResponse<UserModel.UserAuth>> {
    return apiRequest({
        method: "post",
        url: Api.userLogin,
        data: {
            login_name: username, password: password
        }
    })
}

export const FetchUser = ({userId}): Promise<AxiosResponse<UserModel.User>> => {
    return apiRequest<UserModel.User>({
        method: "get",
        url: Api.getUser,
        pathParams: {
            id: userId
        }
    })
};

export const UploadUserAvatar = ({avatar, userId}): Promise<AxiosResponse<UserModel.User>> => {
    let form = new FormData();
    form.append("avatar", avatar);
    return apiRequest({
        url: Api.uploadUserAvatar,
        method: "post",
        pathParams: {
            id: userId
        },
        form
    })
};


export const ChangeProfile = ({email, nickname, userId}): Promise<AxiosResponse<UserModel.User>> => {
    return apiRequest({
        url: Api.profile,
        method: "put",
        data: {
            email: email, nickname: nickname
        },
        pathParams: {
            id: userId
        }
    })
};

export const QueryProfile = ({userId}): Promise<ApiResponse<Profile>> => {
    return apiRequest({
        url: Api.profile,
        method: "get",
        pathParams: {
            id: userId
        }
    })
};

export const CreateUser = ({username, password}): Promise<ApiResponse<any>> => {
    return apiRequest({
        url: Api.users,
        method: "post",
        data: {
            username, password
        }
    })
};

export const GetProfileList = ({page, ...param}): Promise<ApiResponse<PageResult<Profile>>> => {
    return apiRequest({
        url: Api.profileList,
        method: "get",
        queryParams: {
            ...param
        },
        page
    })
};

export const SendResetPasswordEmail = ({username}): Promise<ApiResponse<any>> => {
    return apiRequest({
        url: Api.sendResetPasswordMail,
        method: "post",
        data: {
            username
        }
    })
};

export const ResetPassword = ({code, password}): Promise<ApiResponse<any>> => {
    return apiRequest({
        url: Api.resetPassword,
        method: "post",
        data: {
            code, password
        }
    })
};
