import {ApiResponse, PageResult} from "./model/base";
import {Transaction} from "./model/transaction";
import {apiRequest} from "../utils/request";
import {Api} from "../config/api";

export const GetUserTransactionList = ({userId}): Promise<ApiResponse<PageResult<Transaction>>> => {
    return apiRequest({
        url: Api.userTransactionList,
        method: "get",
        pathParams: {
            id: userId
        }
    })
};
