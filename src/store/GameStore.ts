import DataStore from "./DataStore";
import {StoreGameModel} from "./model/Game";
import {GameModelState} from "../models/game";

export class GameStore implements DataStore<StoreGameModel> {
    source: GameModelState;

    constructor(source: any) {
        this.source = source
    }

    getIndex(): Array<number> {
        return this.source.games.result;
    }

    getItemByIndex(id: number): StoreGameModel {
        return this.source.games.entities.games[id];
    }

}
