import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        role: '',
        name: '',
        email: ''
    },
    reducers: {
        getToken: (state, action) => {
            state.token = action.payload.token
        },
        resetTokenLogout: (state, action) => {
            state.token = ''
            state.email = ''
            state.name = ''
            state.role = ''
        },
        keepAuth: (state, action) => {
            state.email = action.payload
            state.name = action.payload
            state.role = action.payload
        }
    }
})

export const { getToken } = authSlice.actions
export default authSlice.reducer