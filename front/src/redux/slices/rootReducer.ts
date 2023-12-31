import {combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice.ts";
import bookModalSlice from "./bookModalSlice.ts";
import adminModalSlice from "./adminModalSlice.ts";

const rootReducer = combineReducers({
    user: userSlice,
    bookModal: bookModalSlice,
    adminModal: adminModalSlice,
});

export default rootReducer;