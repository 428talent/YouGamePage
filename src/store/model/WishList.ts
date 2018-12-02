import {WishListItem} from "../../services/model/wishlist";

export default class StoreWishList {
    id: number;
    userId: number;
    gameId: number;
    created: number;

    constructor(model: WishListItem) {
        this.id = model.id;
        this.userId = model.user_id;
        this.gameId = model.game_id;
        this.created = model.created
    }
}
