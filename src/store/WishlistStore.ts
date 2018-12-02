import DataStore from "./DataStore";
import {WishlistModelState} from "../models/wishlist";
import StoreWishList from "./model/WishList";

export class WishlistStore implements DataStore<StoreWishList>{
    source:WishlistModelState;

    constructor(source: WishlistModelState) {
        this.source = source;
    }

    getIndex(): Array<number> {
        return this.source.wishListItems.result;
    }

    getItemByIndex(id: number): StoreWishList {
        return this.source.wishListItems.entities.wishListItems[id];
    }

}
