import {Link} from "./base";

export interface Good {
    id: number;
    game_id: number;
    name: string;
    price: number;
    link: Link[];
}
