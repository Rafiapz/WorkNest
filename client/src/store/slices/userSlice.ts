import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, userLogin, userSignup } from "../actions/userActions";
import toast from "react-hot-toast";


const initialState = {

    user: {
        loading: false,
        data: null,
        error: null as string | null
    },
    modal: {
        isOpen: false
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        handleModal: (state, action) => {
            state.modal.isOpen = action?.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.user.loading = true
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.data = action?.payload;
                state.user.error = null
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action?.error?.message || 'Somthing went wrong'
            })
            .addCase(userLogin.pending, (state) => {
                state.user.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.data = action.payload?.data
                state.user.error = null
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action?.error?.message || 'Something went wrong'
            })
            .addCase(fetchUser.pending, (state) => {
                state.user.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.data = action?.payload?.data;
                state.user.error = null
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action?.error?.message || 'Something went wrong';
                state.user.data = null;
            })

    }
})


export const { handleModal } = userSlice.actions;

export default userSlice.reducer;    