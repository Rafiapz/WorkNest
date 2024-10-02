import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/axios";
import { jsonConfig } from "../../utils/apiUtils";


export const userSignup = createAsyncThunk("user/signup", async (form: FormData, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/user/signup', form, jsonConfig);
        localStorage.setItem('WorkNestToken', response?.data?.token)
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const userLogin = createAsyncThunk('/user/login', async (form: FormData, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/user/login', form, jsonConfig)
        localStorage.setItem('WorkNestToken', response?.data?.token)
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const fetchUser = createAsyncThunk('/user/fetch-user', async () => {
    try {
        const response = await apiClient.get('/user/fetch-user')
        return response?.data
    } catch (error: any) {
        throw new Error(error)
    }
})

