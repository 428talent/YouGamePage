import {Link} from "./base";


export interface Order {
    id: number;
    state: string;
    user_id: number;
    created: number;
    updated: number;
    link: Link[];
}



