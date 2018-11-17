import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

export function readCookieJWT() {
    const token = Cookies.get("yougame_token");
    if (token){
        const decoded = jwt.decode(token, {complete: true});
        console.log(decoded)
    }
}
