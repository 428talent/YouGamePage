import {AxiosError, AxiosResponse} from "axios";
import {UserLogin} from "../../../services/user";
import router from "umi/router";
import {fetchGame} from "../../../services/game";
import pathToRegexp = require("path-to-regexp");
import {Logger} from "../../../utils/logging";

export default ({
    namespace: "detail",
    state: {
        game: undefined
    },
    subscriptions: {
        'setup'({dispatch, history}) {
            const match = pathToRegexp('/detail/:gameId').exec(history.location.pathname);
            if (match) {
                dispatch({
                    type: "fetchGame",
                    payload: {gameId: match[1]}
                })
            }
        }
    },
    effects: {
        * 'fetchGame'({payload}, {select, call, put}) {
            try {
                const fetchGameResponse: AxiosResponse<GameModel.Game> = yield call(fetchGame, payload);
                console.log(fetchGameResponse);

                yield put({
                    type: "fetchGameSuccess",
                    payload: {
                        game: fetchGameResponse.data
                    }
                })
            } catch (e) {
                router.push("/detail/notexist")
            }

        },
    },
    reducers: {
        'fetchGameSuccess'(state, {payload}) {
            return {
                ...state,
                game: payload.game
            }
        }
    },

})
