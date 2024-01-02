import {combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice.ts";
import bookModalSlice from "./bookModalSlice.ts";
import adminModalSlice from "./adminModalSlice.ts";
import bookingsSlice from "./bookingsSlice.ts";

const rootReducer = combineReducers({
    user: userSlice,
    bookModal: bookModalSlice,
    adminModal: adminModalSlice,
    bookings: bookingsSlice,
});

export default rootReducer;