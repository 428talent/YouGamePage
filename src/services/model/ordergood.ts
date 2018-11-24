import {Link} from "./base";


export interface OrderGood {
    id: number;
    price: number;
    name: string;
    order_id: number;
    good_id: number;
    create_at: number;
    link: Link[];
}


