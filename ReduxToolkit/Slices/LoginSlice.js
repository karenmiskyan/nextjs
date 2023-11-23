// create a slice
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginToken: {},
    auth: true,
    authUser: {},
    openModal: false,
    shipping: {},
    shippingTwo: {},
    shippingThree: {},
    shippingAll: [],
    shippingYups: [],
    paypalToken: "",
    myToken: ""
};
export const getLoginId = createAsyncThunk('login/getId', async (value) => {



        // return {
        //     initialRememberValue: cookies.moon
        // }

    }
)

export const LoginTokenSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginToken: (state, action) => {
            state.loginToken = action.payload
        },
        setAuth: (state, action) => {
            state.auth = action.payload
        },
        setUser: (state, action) => {
            state.authUser = action.payload
        },
        signOut: (state, action) => {
            state.loginToken = {}
            state.auth = true
            state.authUser = {}
        },
        toggleDivVisibility: (state, action) => {
            state.openModal = action.payload;

        },
        setShippingSing: (state, action) => {

            state.shipping = action.payload
        },
        setShippingTwo: (state, action) => {

            state.shippingTwo = action.payload
        },
        setShippingThree: (state, action) => {

            state.shippingThree = action.payload
        },
        setShippingAll: (state, action) => {

            state.shippingAll = action.payload
        },
        setShippingYups: (state, action) => {

            state.shippingYups = action.payload
        },
        setPaypalToken: (state, action) => {

            state.paypalToken = action.payload
        },
        setMyToken: (state, action) => {

            state.myToken = action.payload
        },
    },
    extraReducers: {
        [getLoginId.pending]: (state, action) => {

        },
        [getLoginId.fulfilled]: (state, action) => {
            // state.page = action.payload
        },
        [getLoginId.rejected]: (state, action) => {

        },
    }
})
export const selectLoginToken = (state) => state.LoginTokenSlice.loginToken;
export const selectAuth = (state) => state.LoginTokenSlice.auth;
export const selectAuthUser = (state) => state.LoginTokenSlice.authUser;
export const selectOpenModal = (state) => state.LoginTokenSlice.openModal;
export const shippingSing = (state) => state.LoginTokenSlice.shipping;
export const shippingTwo = (state) => state.LoginTokenSlice.shippingTwo;
export const shippingThree = (state) => state.LoginTokenSlice.shippingThree;
export const shippingAll = (state) => state.LoginTokenSlice.shippingAll;
export const selectShippingYups = (state) => state.LoginTokenSlice.shippingYups;
export const selectPaypalToken = (state) => state.LoginTokenSlice.paypalToken;
export const selectMyToken = (state) => state.LoginTokenSlice.myToken;


export const {
    setLoginToken,
    setAuth,
    setUser,
    signOut,
    toggleDivVisibility,
    setShippingSing,
    setShippingTwo,
    setShippingThree,
    setShippingAll,
    setShippingYups,
    setPaypalToken,
    setMyToken
} = LoginTokenSlice.actions;