import {AxiosResponse} from "axios";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";
import {PageResult} from "./model/base";
import {Order} from "./model/order";
import {OrderGood} from "./model/ordergood";
import order from "../pages/order/models/order";

export function fetchOrderList(
    option: {
        user: string,
        state: string,
        pageSize: number,
        page: number
    }): Promise<AxiosResponse<PageResult<Order>>> {

    return apiRequest({
        url: Api.getOrderList,
        method: "get",
        queryParams: {
            ...option
        }
    })
}

export function fetchOrder({orderId}): Promise<AxiosResponse<Order>> {
    return apiRequest<Order>({
        url: Api.order,
        method: "get",
        pathParams: {
            id: orderId
        }
    })

}

export function fetchOrderGood({orderId}): Promise<AxiosResponse<PageResult<OrderGood>>> {
    return apiRequest({
        url: Api.fetchOrderGood,
        method: "get",
        queryParams: {
            orderId
        },
    })
}

export function payOrder({orderId}): Promise<AxiosResponse<any>> {
    return apiRequest({
        url: Api.payOrder,
        method: "post",
        pathParams: {
            id: orderId
        }
    })
}