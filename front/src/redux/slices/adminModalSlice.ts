import {createSlice} from "@reduxjs/toolkit";

type AdminModalState = {
    isApproveOpen: boolean;
    isRejectOpen: boolean;
}

const initialState: AdminModalState = {
    isApproveOpen: false,
    isRejectOpen: false,
}

const adminModalSlice = createSlice({
    name: 'adminModal',
    initialState,
    reducers: {
        toggleApproveModal: (state) => {
            state.isApproveOpen = !state.isApproveOpen;
        },
        toggleRejectModal: (state) => {
            state.isRejectOpen = !state.isRejectOpen;
        }
    }
});

export default adminModalSlice.reducer;

export const {toggleApproveModal, toggleRejectModal} = adminModalSlice.actions;