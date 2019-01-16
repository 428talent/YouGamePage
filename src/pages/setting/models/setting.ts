import Axios, {AxiosResponse} from "axios";
import {UserSectionProps} from "../components/UserSection";
import {ChangeProfile, ResetPassword, SendResetPasswordEmail, UploadUserAvatar} from "../../../services/user";
import {ApiResponse} from "../../../services/model/base";


export default ({
    namespace: "setting",
    state: {
        userSection: {
            isChangeNicknameDialogShow: false,
        }
    },
    subscriptions: {},
    effects: {
        * 'uploadUserAvatar'({payload}, {select, call, put}) {
            const user: UserModel.User = yield select(state => (state.app.user));
            const uploadResult: ApiResponse<Profile> = yield call(UploadUserAvatar, {
                avatar: payload.avatar,
                userId: user.id
            });
            if (uploadResult.requestSuccess) {
                yield put({
                    type: 'app/refreshUser',
                    payload: {}
                });
            }
        },
        * changeNickname({payload}, {select, call, put}) {
            const user: UserModel.User = yield select(state => (state.app.user));
            yield put({
                type: "changeNicknameDialogVisitable",
                payload: {isShow: false}
            });
            const uploadResult: ApiResponse<Profile> = yield call(ChangeProfile, {
                nickname: payload.nickname,
                email: user.profile.email,
                userId: user.id
            });
            if (uploadResult.requestSuccess) {
                yield put({
                    type: 'app/refreshUser',
                    payload: {}
                });
            }

        },
        * sendResetPasswordMail({}, {select, call, put}) {
            const user = yield select(state => (state.app.user));
            if (user == null){
                return
            }
            const sendMailResponse  : ApiResponse<any> = yield call(SendResetPasswordEmail,{username:user.username});
            if (sendMailResponse.requestSuccess){

            }
        },
        * resetPassword({password,code}, {select, call, put}) {
            const resetPasswordResponse : ApiResponse<any> = yield call(ResetPassword,{password,code});
            if (resetPasswordResponse.requestSuccess){

            }
        }

    },
    reducers: {
        'changeNicknameDialogVisitable'(state, {payload}) {
            return {
                ...state,
                userSection: {
                    isChangeNicknameDialogShow: payload.isShow
                }
            }
        }
    },

})
