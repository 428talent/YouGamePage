import Game = GameModel.Game;

export class StoreGameModel {
    id: number;
    name: string;
    releaseTime: number;
    publisher: string;
    band: string;
    intro: string;

    constructor(model : Game) {
        this.id = model.id;
        this.name = model.name;
        this.releaseTime = model.release_time;
        this.publisher = model.publisher;
        this.band = model.band;
        this.intro = model.intro;
    }
}
