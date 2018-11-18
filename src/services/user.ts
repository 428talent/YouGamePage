import request, {apiRequest} from "../utils/request";
import {url} from "inspector";
import {Api} from "../config/api";
import {AxiosResponse} from "axios";

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

export const UploadUserAvatar = ({avatar,userId}):Promise<AxiosResponse<UserModel.User>> =>{
    let form = new FormData();
    form.append("avatar",avatar);
    return apiRequest({
        url:Api.uploadUserAvatar,
        method:"post",
        pathParams:{
            id:userId
        },
        form
    })
};


