import {AxiosResponse} from "axios";
import {PageResult} from "../../../services/model/base";
import {Order} from "../../../services/model/order";
import {fetchOrderGood, fetchOrderList} from "../../../services/order";
import * as lodash from "lodash";
import router from "umi/router";
import {OrderGood} from "../../../services/model/ordergood";
import {getOrderGoods} from "../../../utils/schema";
import {DataState} from "../../../models/data";

export default ({
    namespace: "order",
    state: {
        filter: {
            state: undefined
        },
        orders: [],
        hasMore: true
    },
    subscriptions: {},
    effects: {
        * 'fetchOrders'({payload}, {select, call, put}) {
            //get current user
            const user: UserModel.User = yield select(state => (state.app.user));
            //handle with filter
            const filter = yield select(state => (state.order.filter));
            const OrderFilter = lodash.pickBy(filter);

            //get start page
            const response: AxiosResponse<PageResult<Order>> = yield call(fetchOrderList, {
                user: user.id, ...OrderFilter, page: payload.page, pageSize: payload.pageSize
            });
            const orders = response.data.result.map(order => ({
                id: order.id,
                state: order.state
            }));

            yield put({
                type: "data/storeOrder",
                payload: {
                    orders
                }

            });
            if (payload.reload == undefined) {
                payload.reload = true
            }
            yield put({
                type: "fetchOrderListSuccess",
                payload: {
                    orders,
                    reload: payload.reload,
                }
            })
        },
        * fetchOrderGood({payload}, {select, call, put}) {
            const orderGoods =  getOrderGoods(yield select(state => state.data.orderGoods));
            if (orderGoods.filter(good => good.orderId === payload.orderId).length > 0) {
                return
            }
            const fetchOrderGoodsResult: AxiosResponse<PageResult<OrderGood>> = yield call(fetchOrderGood, {id: payload.orderId});
            yield put({
                type: "data/storeOrderGood",
                payload: {
                    orderGoods: fetchOrderGoodsResult.data.result.map(orderGood => ({
                        id: orderGood.id,
                        price: orderGood.price,
                        orderId: orderGood.order_id,
                        goodId: orderGood.good_id,
                        name: orderGood.name
                    }))
                }

            });
        }
    },
    reducers: {
        changeStateFilter(state, {payload: {orderState}}) {
            console.log(orderState);
            return {
                ...state,
                filter: {
                    ...state.filter,
                    state: orderState
                }
            }
        },
        fetchOrderListSuccess(state, {payload: {orders, reload}}) {
            console.log(reload);
            if (reload) {
                return {
                    ...state,
                    orders: [...orders],
                    hasMore: true
                }
            } else {
                const ord = [];
                ord.push(...state.orders);
                ord.push(...orders);
                return {
                    ...state,
                    orders: ord,
                    hasMore: orders.length != 0
                }
            }

        }
    },

})
