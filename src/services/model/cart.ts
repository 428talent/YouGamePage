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
        good_id: number;
        user_id: number;
        created: string;
    }

}
