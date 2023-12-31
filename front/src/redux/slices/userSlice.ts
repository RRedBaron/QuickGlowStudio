import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../types/user";

const initialState: User = {
    uid: '',
    email: '',
    phone: '',
    fullname: '',
    isAdmin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.fullname = action.payload.fullname;
            state.isAdmin = action.payload.isAdmin;
        },
        removeUser: (state) => {
            state.uid = '';
            state.email = '';
            state.phone = '';
            state.fullname = '';
            state.isAdmin = false;
        }
    },
});

export default userSlice.reducer;

export const {setUser, removeUser} = userSlice.actions;
