import {Link} from "./base";

export interface WishListItem {
    id: number;
    user_id: number;
    game_id: number;
    created: number;
    links: Link[];
}
