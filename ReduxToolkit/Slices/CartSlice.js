// create a slice
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {current} from '@reduxjs/toolkit'
import {APICallUrl} from "../../Components/Constant";

const initialState = {
    newCartProduct: {},
    cart: [],
    total: 0,
    sellTotal: 0,
    coupon: "",
    amountCoupon: 0,
    loadingCart: false,
    loadingDelete: false,
    checkoutDetails: {},
    checkoutErrors: 0,
    shippingDetails: {},
    shippingErrors: 0
};
export const getCartProducts = createAsyncThunk('CartSlice/getProducts', async (value) => {


        // return {
        //     initialRememberValue: cookies.moon
        // }

    }
)


export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setNewCartProduct: (state, action) => {
            state.newCartProduct = action.payload
        },
        setCoupon: (state, action) => {
            state.coupon = action.payload.coupon
            state.amountCoupon = action.payload.amount
        },
        setCart: (state, action) => {

            state.cart = action.payload
            // let addPrice = 0;
            state.total = 0
            state.sellTotal = 0
            !(state.cart?.error) && state.cart?.forEach((el) => {
                let price = el?.product?.front_sale_price !== null && el?.product?.front_sale_price !== undefined && el?.product?.price > el?.product?.front_sale_price
                    ? el?.product?.front_sale_price * el?.qty : el?.product?.price * el?.qty
                state.total += parseFloat(price);
                let sellPrice = el?.product?.price * el?.qty
                state.sellTotal += parseFloat(sellPrice);


                // const sellPrice = el?.product?.front_sale_price !== null || undefined) && (el?.product?.price > el?.product?.front_sale_price ?
            });
            !(state.sellTotal > state.total) ? state.sellTotal = 0 : ""
        },
        setLoadingCart: (state, action) => {

            state.loadingCart = action.payload
        },
        setLoadingDelete: (state, action) => {

            state.loadingDelete = action.payload
        },
        setCheckoutDetails: (state, action) => {

            state.checkoutDetails = action.payload
        },
        setCheckoutErrors: (state, action) => {

            state.checkoutErrors = action.payload
        },
        setShippingDetails: (state, action) => {

            state.shippingDetails = action.payload
        },
        setShippingErrors: (state, action) => {

            state.shippingErrors = action.payload
        },


    },
    extraReducers: {
        [getCartProducts.pending]: (state, action) => {

        },
        [getCartProducts.fulfilled]: (state, action) => {
            // state.page = action.payload
        },
        [getCartProducts.rejected]: (state, action) => {

        },
    }
})
export const selectNewCartProduct = (state) => state.CartSlice.newCartProduct;
export const selectCart = (state) => state.CartSlice.cart;
export const selectTotal = (state) => state.CartSlice.total;
export const selectSellTotal = (state) => state.CartSlice.sellTotal;
export const selectCoupon = (state) => state.CartSlice.coupon;
export const selectAmountCoupon = (state) => state.CartSlice.amountCoupon;
export const selectLoadingCart = (state) => state.CartSlice.loadingCart;
export const selectLoadingDelete = (state) => state.CartSlice.loadingDelete;
export const selectCheckoutDetails = (state) => state.CartSlice.checkoutDetails;
export const selectCheckoutErrors = (state) => state.CartSlice.checkoutErrors;
export const selectShippingDetails = (state) => state.CartSlice.shippingDetails;
export const selectShippingErrors = (state) => state.CartSlice.shippingErrors;

export const {
    setNewCartProduct,
    setCoupon,
    setCart,
    setLoadingCart,
    setLoadingDelete,
    setCheckoutDetails,
    setCheckoutErrors, setShippingErrors, setShippingDetails

} = CartSlice.actions;