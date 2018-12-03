import {AxiosResponse} from "axios";
import {fetchGame} from "../services/game";
import {StoreGameModel} from "../store/model/Game";
import Game = GameModel.Game;
import {GameStore} from "../store/GameStore";

export interface GameModelState {
    isLoading: boolean,
    games: {
        result: Array<number>,
        entities: {
            games: any
        }
    },
}

export default ({
    namespace: "game",
    state: {
        isLoading: false,
        games: {
            result: [],
            entities: {
                games: {}
            }
        },
    },
    subscriptions: {},
    effects: {
        * fetchGame({payload: {gameId}}, {select, call, put}) {
            const game = yield select(state => state.game);

            if (game.games.entities.games[gameId]) {
                return
            }
            if (game.isLoading) {
                return
            }
            yield put({
                type: "setLoading",
                payload: {
                    isLoading: true
                }
            });
            const fetchGameResult: AxiosResponse<Game> = yield call(fetchGame, {gameId});

            yield put({
                type: "storeGame",
                payload: {
                    game: new StoreGameModel(fetchGameResult.data)
                }
            });
            yield put({
                type: "setLoading",
                payload: {
                    isLoading: false
                }
            });
        },
        * fetchGameList({payload: {gameIds}}, {select, call, put}) {
            const game = yield select(state => state.game);
            if (game.isLoading) {
                return
            }
            const gameIdToFetch = gameIds.filter(gameId => {
                return !game.games.entities.games[gameId];
            });
            yield put({
                type: "setLoading",
                payload: {
                    isLoading: true
                }
            });
            const task = gameIdToFetch.map(gameId => call(fetchGame, {gameId}));
            const fetchGamesResults: Array<AxiosResponse<Game>> = yield task;
            const gameList = fetchGamesResults.map(response => (new StoreGameModel(response.data)));
            yield put({
                type: "storeGame",
                payload: {
                    list: gameList
                }
            });
            yield put({
                type: "setLoading",
                payload: {
                    isLoading: false
                }
            });
            console.log(fetchGamesResults);

        },
    },
    reducers: {
        'setLoading'(state, {payload}) {
            return {
                ...state,
                isLoading: payload.isLoading
            }
        },
        'storeGame'(state, {payload}) {
            const newState = Object.assign({}, state);

            const gameStore = new GameStore(state);
            if (payload.list) {
                gameStore.addItems(payload.list)
            }
            if (payload.game) {
                const game: StoreGameModel = payload.game;
                gameStore.addItems([game])
            }

            return newState

        },
    },

})
