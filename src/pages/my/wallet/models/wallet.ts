import {ApiResponse, PageResult} from "../../../../services/model/base";
import {Wallet} from "../../../../services/model/wallet";
import {GetUserWallet} from "../../../../services/user";
import {readCookieJWTPayload} from "../../../../utils/auth";
import {Transaction} from "../../../../services/model/transaction";
import {GetUserTransactionList} from "../../../../services/transaction";

export default ({
    namespace: "wallet",
    state: {
        transactions: [],
        balance: 0
    },
    subscriptions: {},
    effects: {
        * 'fetchWallet'({payload}, {call, put, select}) {
            const jwtPayload = readCookieJWTPayload();
            if (jwtPayload != null) {
                const fetchUserWalletResponse: ApiResponse<Wallet> = yield call(GetUserWallet, {userId: jwtPayload.UserId})
                if (fetchUserWalletResponse.requestSuccess) {
                    yield put({type: "setState", payload: fetchUserWalletResponse.data})
                    yield put({type: "fetchTransaction"})
                }
            }
        },
        * 'fetchTransaction'({payload}, {call, put, select}) {
            const jwtPayload = readCookieJWTPayload();
            if (jwtPayload != null) {
                const fetchTransactionList: ApiResponse<PageResult<Transaction>> = yield call(GetUserTransactionList, {userId: jwtPayload.UserId})
                if (fetchTransactionList.requestSuccess) {
                    yield put({type: "setState", payload: {transactions: fetchTransactionList.data.result}})
                }
            }
        }

    },
    reducers: {
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    },

})
