import * as moment from "moment";
import {Moment} from "moment";

export function parseTime(timeStr : any) : Moment{
    return moment(timeStr,'YYYY-MM-DDTHH:mm:ss')
}
export function parseDate(dateStr : any) : Moment{
    return moment(dateStr,'YYYY-MM-DD')
}
