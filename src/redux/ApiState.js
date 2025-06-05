



export class ApiState {
    constructor() {
        this.apiBase = sessionStorage.getItem("apiBase") || import.meta.env.VITE_CAMPUS_API;
    }
};

export const ApiActionType = {
    SetApiBase: "SetApiBase",
};

export function SetApiBase(apiBase){
    sessionStorage.setItem("apiBase", apiBase)
    return { type: ApiActionType.SetApiBase, payload: apiBase }
};

export function apiReducer(currentState = new ApiState(), action){
    const newState = { ...currentState};

    switch(action.type){
        case ApiActionType.SetApiBase:
            newState.apiBase = action.payload;
            break;
        default:
            break;
    }
    
    return newState;
}