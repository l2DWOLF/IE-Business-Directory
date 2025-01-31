
import { userReducer } from "./UserState";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({user: userReducer,});

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
export default store;