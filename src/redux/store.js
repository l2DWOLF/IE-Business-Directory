
import { userReducer } from "./UserState";
import { apiReducer } from "./ApiState"
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({user: userReducer,});

const store = configureStore({
    reducer: {
        api: apiReducer,
        user: userReducer,
    },
});
export default store;