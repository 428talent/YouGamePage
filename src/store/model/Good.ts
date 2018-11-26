import {Good} from "../../services/model/good";

export class StoreGoodModel {
    id: number;
    name: string;
    gameId: number;
    price: number;
    constructor(model : Good){
        this.id = model.id;
        this.name = model.name;
        this.gameId = model.game_id;
        this.price = model.price;
    }
}
