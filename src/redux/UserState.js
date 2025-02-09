export class UserState {
        constructor() {
        this.token = sessionStorage.getItem("x-auth-token") || "";
        this.user = this.token
            ? JSON.parse(sessionStorage.getItem("user")) || {
                _id: "",
                isBusiness: false,
                isAdmin: false,
            }
            : {
                _id: "",
                isBusiness: false,
                isAdmin: false,
            };
        this.myCardIds = this.token
            ? JSON.parse(sessionStorage.getItem("myCardIds")) || []
            : [];
    }
}

export const ActionType = {
    SetToken: "SetToken",
    SetUser: "SetUser",
    SetMyCardIds: "SetMyCardIds",
    Signoff: "Signoff",
};

// Action creators
export function SetToken(token) {
    sessionStorage.setItem("x-auth-token", token);
    return { type: ActionType.SetToken, payload: token };
}

export function SetUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    return { type: ActionType.SetUser, payload: user };
}

export function SetMyCardIds(myCardIds) {
    sessionStorage.setItem("myCardIds", JSON.stringify(myCardIds));
    return { type: ActionType.SetMyCardIds, payload: myCardIds };
}

export function Signoff() {
    sessionStorage.removeItem("x-auth-token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("myCardIds");
    return { type: ActionType.Signoff };
}

export function userReducer(currentState = new UserState(), action) {
    const newState = { ...currentState };

    switch (action.type) {
        case ActionType.SetToken:
            newState.token = action.payload;
            break;

        case ActionType.SetUser:
            newState.user = action.payload;
            break;
        
        case ActionType.SetMyCardIds:
            newState.myCardIds = action.payload;
            break;

        case ActionType.Signoff:
            newState.token = "";
            newState.user = {
                _id: "",
                isBusiness: false,
                isAdmin: false,
            };
            newState.myCardIds = [];
            break;

        default:
            break;
    }

    return newState;
}