import {apiRequest} from "../utils/request";
import {Api} from "../config/api";

export function getIndexCollectionSetting(){
    return apiRequest({
        url:Api.settingIndexCollection,
        method:"get"
    })
}