export const ServerUrl = "http://localhost:8888";
export const WebServer = "http://127.0.0.1:8888";
export const MockServer = "http://127.0.0.1:8888";
export const Api = {
    getUser: ServerUrl + "/api/user/:id",
    users: ServerUrl + "/api/users",
    userLogin: ServerUrl + "/api/user/auth",
    getWishListItems: ServerUrl + "/api/wishlist",
    getGame: ServerUrl + "/api/game/:id",
    games: ServerUrl + "/api/games",
    getCartList: ServerUrl + "/api/user/:id/carts",
    carts: ServerUrl + "/api/carts",
    cart: ServerUrl + "/api/cart/:id",
    getOrderList: ServerUrl + "/api/orders",
    payOrder: ServerUrl + "/api/order/:id/pay",
    profile: ServerUrl + "/api/user/:id/profile",
    fetchGame: ServerUrl + "/api/game/:id",
    uploadUserAvatar: ServerUrl + "/api/user/:id/avatar/upload",
    fetchOrderGood: ServerUrl + "/api/ordergood",
    fetchGood: `${ServerUrl}/api/good/:id`,
    goods: `${ServerUrl}/api/goods`,
    deleteWishlistItems: `${ServerUrl}/api/wishlist`,
    wishlist: `${ServerUrl}/api/wishlist/:id`,
    inventors: `${ServerUrl}/api/inventors`,
    comments: `${ServerUrl}/api/comments`,
    profileList: `${ServerUrl}/api/profile`,
    sendResetPasswordMail: `${ServerUrl}/api/user/reset`,
    resetPassword: `${ServerUrl}/api/user/password`,
    gameCommentSummary: `${ServerUrl}/api/game/:id/comments/summary`,
    userImventoryGame: `${ServerUrl}/api/user/:id/inventory/game`
};
