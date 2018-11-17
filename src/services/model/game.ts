declare module GameModel {

    export interface Tag {
        id: number;
        name: string;
    }

    export interface PreviewImage {
        id: number;
        path: string;
    }

    export interface Good {
        id: number;
        name: string;
        price: number;
    }

    export interface Game {
        id: number;
        name: string;
        release_time: number;
        publisher: string;
        band: string;
        intro: string;
        tags: Tag[];
        preview_images: PreviewImage[];
        goods: Good[];
    }

}
