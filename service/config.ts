export const BASE_URL = "http://10.0.2.2:3000";

export const TIME_BEFORE_TOKEN_EXPIRE = 5;

export const NO_SERVER_WHILE_DEV = false;

export const endpoints = {
    user: {
        getUserDetail: "/api/users",
        updateUserDetails: "/api/users",
        getUserInvited: "/api/users/invited",
    },
}