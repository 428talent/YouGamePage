import DataStore from "./DataStore";
import {WishlistModelState} from "../models/wishlist";
import StoreWishList from "./model/WishList";
import {without} from "ramda";

export class WishlistStore implements DataStore<StoreWishList> {
    source: WishlistModelState;

    constructor(source: WishlistModelState) {
        this.source = source;
    }

    getIndex(): Array<number> {
        return this.source.wishListItems.result;
    }

    getItemByIndex(id: number): StoreWishList {
        return this.source.wishListItems.entities.wishListItems[id];
    }

    addItems(items: Array<StoreWishList>) {
        items.forEach(item => {
            this.source.wishListItems.entities.wishListItems[item.id] = item;
            if (!this.source.wishListItems.result.includes(item.id)) {
                this.source.wishListItems.result = [...this.source.wishListItems.result, item.id]
            }
        });
    }

    removeItems(ids: Array<number>) {
        ids.forEach(id => {
            delete this.source.wishListItems.entities.wishListItems[id];
        });
        this.source.wishListItems.result = without(ids, this.source.wishListItems.result)
    }

}
