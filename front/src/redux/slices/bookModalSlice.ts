import { createSlice } from "@reduxjs/toolkit";

type BookModalState = {
    isOpen: boolean;
}

const initialState: BookModalState = {
    isOpen: false,
}

const bookModalSlice = createSlice({
    name: 'bookModal',
    initialState,
    reducers: {
        toggleBookModal: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export default bookModalSlice.reducer;

export const { toggleBookModal } = bookModalSlice.actions;