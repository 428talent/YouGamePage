import Axios, {AxiosResponse} from "axios";
import {UserSectionProps} from "../components/UserSection";
import {ChangeProfile, UploadUserAvatar} from "../../../services/user";


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
            const uploadResult: AxiosResponse<UserModel.User> = yield call(UploadUserAvatar, {
                avatar: payload.avatar,
                userId: user.id
            });
            if (uploadResult.status == 200) {
                yield put({
                    type: 'app/setUser',
                    payload: {user: uploadResult.data}
                });
            }
        },
        * changeNickname({payload}, {select, call, put}) {
            const user: UserModel.User = yield select(state => (state.app.user));
            yield put({
                type: "changeNicknameDialogVisitable",
                payload: {isShow: false}
            });
            const uploadResult: AxiosResponse<UserModel.User> = yield call(ChangeProfile, {
                nickname: payload.nickname,
                email: user.profile.email,
                userId:user.id
            });
            if (uploadResult.status == 200) {
                yield put({
                    type: 'app/setUser',
                    payload: {user: uploadResult.data}
                });
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
