import request from "../utils/request";
import {url} from "inspector";
import {Api} from "../config/api";

export async function UserLogin({username, password}) {
    console.log(username)
    const result = await request(
        Api.userLogin,
        "post",
        {login_name: username, password: password}
    );
    return await result.json()
}
