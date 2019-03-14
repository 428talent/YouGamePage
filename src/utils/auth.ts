import * as jwt from 'jsonwebtoken'
import * as Cookies from 'js-cookie'

export function readCookieJWTPayload(): any | null {
    const token = Cookies.get("yougame_token");
    if (token) {
        const decoded = jwt.decode(token, {complete: true});
        return decoded.payload
    }
    return null
}
