import {ApiResponse, PageResult} from "../../../services/model/base";
import {fetchGameList, getGameBand, searchGame} from "../../../services/game";
import {ServerUrl} from "../../../config/api";
import Game = GameModel.Game;
import moment = require("moment");

export default ({
    namespace: "gamesPage",
    state: {
        data: [],
        tags: [],
        page: 1,
        pageSize: 10
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen((location) => {
                if (location.pathname === '/games') {
                    const {
                        page = 1,
                        pageSize = 21,
                        order = "-release_time",
                        price = "all",
                        releaseTime = "all",
                        search = ""
                    } = location.query;

                    let param: any = {
                        order,
                        page,
                        pageSize
                    };
                    if (search.length > 0) {
                        param.search = search
                    }
                    if (price === "u12") {
                        param.priceEnd = 12
                    } else if (price === "u24") {
                        param.priceEnd = 24
                    } else if (price === "u40") {
                        param.priceEnd = 40
                    } else if (price === "other") {
                        param.priceStart = 40
                    }
                    if (releaseTime !== "all") {
                        let last = moment().startOf("day");
                        if (releaseTime === "week") {
                            last = last.subtract(1, "weeks");
                        } else if (releaseTime === "month") {
                            last = last.subtract(1, "months");
                        } else if (releaseTime === "season") {
                            last = last.subtract(3, "months");
                        } else if (releaseTime === "year") {
                            last = last.subtract(1, "years");
                        }
                        param.releaseTimeStart = last.format("YYYY-MM-DD");
                        param.releaseTimeEnd = moment().format("YYYY-MM-DD");

                    }
                    dispatch({
                        type: "setState",
                        payload: {
                            search: search
                        }
                    });
                    dispatch({
                        type: "query",
                        payload: {
                            pageOption: {
                                page,
                                pageSize
                            },
                            ...param
                        }
                    })
                }
            })
        }
    },
    effects: {
        * 'query'({payload: {pageOption, ...param}}, {select, call, put}) {
            if (!pageOption) {
                pageOption = yield select(state => ({
                    page: state.gamesPage.page,
                    pageSize: state.gamesPage.pageSize
                }));

            }
            const {page, pageSize} = pageOption;
            const fetchGameListResponse: ApiResponse<PageResult<Game>> = yield call(searchGame, {
                page,
                pageSize,
                ...param
            });
            const gameBands = [];
            const gameIdToFetch = fetchGameListResponse.data.result.map(game => (game.id));
            for (let idx in gameIdToFetch) {
                gameBands[gameIdToFetch[idx]] = yield call(getGameBand, {gameId: gameIdToFetch[idx]})
            }
            yield put({
                type: "setState", payload: {
                    data: fetchGameListResponse.data.result.map(game => ({
                        ...game,
                        cover: `${ServerUrl}/${gameBands[game.id].data.path}`
                    })),
                    count: Number(fetchGameListResponse.data.count),
                    page: Number(fetchGameListResponse.data.page),
                    pageSize: Number(fetchGameListResponse.data.page_size),
                }
            })


        },
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
