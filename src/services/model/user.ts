declare module UserModel {

    export interface Profile {
        nickname: string;
        email: string;
        avatar: string;
        update_at: number;
    }

    export interface User {
        id: number;
        username: string;
        last_login: number;
        create_at: number;
        profile: Profile;
    }

    export interface UserAuth {
        success: boolean;
        payload: {
            UserId: number;
            Sign: string;
        }
    }

}
