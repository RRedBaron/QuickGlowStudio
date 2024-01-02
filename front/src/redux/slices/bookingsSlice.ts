import {createSlice} from "@reduxjs/toolkit";
import {Booking} from "../../types/booking";

interface BookingsState {
    bookings: Booking[];
}

const initialState: BookingsState = {
    bookings: []
}

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setBookings: (state, action) => {
            state.bookings = action.payload;
        }
    }
});

export default bookingsSlice.reducer;

export const {setBookings} = bookingsSlice.actions;