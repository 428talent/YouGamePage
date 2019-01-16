import Axios, {AxiosResponse} from "axios";
import {UserSectionProps} from "../components/UserSection";
import {ChangeProfile, ResetPassword, SendResetPasswordEmail, UploadUserAvatar} from "../../../services/user";
import {ApiResponse} from "../../../services/model/base";


export default ({
    namespace: "settingSecurity",
    state: {
        changePasswordDialogActive: false
    },
    subscriptions: {},
    effects: {
        * sendResetPasswordMail({}, {select, call, put}) {
            const user = yield select(state => (state.app.user));
            if (user == null) {
                return
            }
            const sendMailResponse: ApiResponse<any> = yield call(SendResetPasswordEmail, {username: user.username});
            if (sendMailResponse.requestSuccess) {

            }
        },
        * resetPassword({payload:{password, code}}, {select, call, put}) {
            const resetPasswordResponse: ApiResponse<any> = yield call(ResetPassword, {password, code:Number(code)});
            if (resetPasswordResponse.requestSuccess) {
                yield put({type: "settingSecurity/setState", payload: {changePasswordDialogActive: false}})
            }
        }

    },
    reducers: {
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        }
    },

})
