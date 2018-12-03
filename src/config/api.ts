export const ServerUrl = "http://localhost:8888";
export const WebServer = "http://127.0.0.1:8888";
export const MockServer = "http://127.0.0.1:8888";
export const Api = {
    getUser: ServerUrl + "/api/user/:id",
    userLogin: ServerUrl + "/api/user/auth",
    getWishListItems: ServerUrl + "/api/wishlist",
    getGame: ServerUrl + "/api/game/:id",
    getCartList: ServerUrl + "/api/user/:id/carts",
    getOrderList: ServerUrl + "/api/orders",
    payOrder: ServerUrl + "/api/order/:id/pay",
    changeProfile: ServerUrl + "/api/user/:id/profile",
    fetchGame: ServerUrl + "/api/game/:id",
    uploadUserAvatar: ServerUrl + "/api/user/:id/avatar/upload",
    fetchOrderGood: ServerUrl + "/api/ordergood",
    fetchGood: `${ServerUrl}/api/good/:id`,
    deleteWishlistItems:`${ServerUrl}/api/wishlist`
};
