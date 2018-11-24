import {denormalize, schema} from "normalizr";
import {createSelector} from "reselect";

export const orderEntity = new schema.Entity("orders");
export const orderGoodsEntity = new schema.Entity("orderGoods");
export const ordersSchema = new schema.Array(orderEntity);


export function getOrderGoods(orderGoodStore?: any): Array<any> {
    if (orderGoodStore) {
        const orderGoods = {orderGoods: [orderGoodsEntity]};
        return denormalize({orderGoods: orderGoodStore.result}, orderGoods, orderGoodStore.entities).orderGoods;
    }
    return []
}

