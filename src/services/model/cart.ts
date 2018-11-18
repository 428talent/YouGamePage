declare module CartModel {

    export interface Good {
        id: number;
        name: string;
        price: number;
    }

    export interface Game {
        id: number;
        name: string;
        band: string;
    }

    export interface CartItem {
        id: number;
        good: Good;
        game: Game;
        created: number;
    }

}
