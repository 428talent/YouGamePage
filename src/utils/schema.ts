import {denormalize, schema} from "normalizr";
import {createSelector} from "reselect";
import {StoreGoodModel} from "../store/model/Good";

export const orderEntity = new schema.Entity("orders");
export const orderGoodsEntity = new schema.Entity("orderGoods");
export const ordersSchema = new schema.Array(orderEntity);

export const goodEntity = new schema.Entity("goods");
export const gameEntity = new schema.Entity("games");

export function getOrderGoods(orderGoodStore?: any): Array<any> {
    console.log(orderGoodStore.result)
    orderGoodStore.result.forEach((goodId) => console.log(goodId));
    if (orderGoodStore) {
        const orderGoods = {orderGoods: [orderGoodsEntity]};
        return denormalize({orderGoods: orderGoodStore.result}, orderGoods, orderGoodStore.entities).orderGoods;
    }
    return []
}

export function getGoodList(goodStore?: any): Array<StoreGoodModel> {
    if (goodStore) {
        const goods = {goods: [goodEntity]};
        return denormalize({orderGoods: goodStore.result}, goods, goodStore.entities).goods;
    }
    return []
}
