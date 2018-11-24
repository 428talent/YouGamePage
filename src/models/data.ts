import {normalize,schema} from 'normalizr'
import {orderEntity, orderGoodsEntity, ordersSchema} from "../utils/schema";
import {OrderGood} from "../services/model/ordergood";

export default ({
    namespace: "data",
    state: {
        orders: undefined,
        orderGoods:undefined
    },
    subscriptions: {},
    effects: {},
    reducers: {
        'storeOrder'(state, {payload}) {
            const newState = Object.assign({}, state);
            if (!state.orders) {
                newState.orders = normalize(payload.orders, ordersSchema);
                return newState
            }
            payload.orders.map(order => {
                console.log(order);
                newState.orders.entities.orders[order.id] = order;
                if (!newState.orders.result.includes(order.id)) {
                    newState.orders.result.push(order.id)
                }
            });
            newState.orders.result.sort().reverse();
            return newState
        },
        'storeOrderGood'(state, {payload}) {
            const newState = Object.assign({}, state);
            const orderGoodSchema = {orderGoods :[orderGoodsEntity]};
            if (!state.orderGoods) {
                newState.orderGoods = normalize(payload.orderGoods,new schema.Array(orderGoodsEntity));
                return newState
            }
            payload.orderGoods.map(orderGood => {
                newState.orderGoods.entities.orderGoods[orderGood.id] = orderGood;
                if (!newState.orderGoods.result.includes(orderGood.id)) {
                    newState.orderGoods.result.push(orderGood.id)
                }
            });
            newState.orderGoods.result.sort().reverse();
            return newState
        },
    },

})
