import {GameModelState} from '../models/game';
import DataStore from './DataStore';
import {StoreGameModel} from './model/Game';
import {without} from "ramda";

export class GameStore implements DataStore<StoreGameModel> {
    public source: GameModelState;

    constructor(source: any) {
        this.source = source;
    }

    public getIndex(): number[] {
        return this.source.games.result;
    }

    public getItemByIndex(id: number): StoreGameModel {
        return this.source.games.entities.games[id];
    }

    public addItems(items: StoreGameModel[]) {
        items.forEach(game => {
            this.source.games.entities.games[game.id] = game;
            if (!this.source.games.result.includes(game.id)) {
                this.source.games.result = [...this.source.games.result, game.id];
            }
        });
    }

    removeItems(ids: Array<number>) {
        ids.forEach(id => {
            delete this.source.games.entities.games[id];
        });
        this.source.games.result = without(ids, this.source.games.result)
    }
}
