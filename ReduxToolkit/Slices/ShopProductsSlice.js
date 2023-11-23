// create a slice
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {APICallUrl} from "../../Components/Constant";

const initialState = {
    shopCategory: {},
    perPage: "12",
    filterBrands: [],
    filterAttribute: [],
    filterCategory: [],
    priceRange: [],

    delete: "",
    resetAll: false,

    loading: false,
    popStateValue: false,
    first: false
};


export const ShopProductsSlice = createSlice({
    name: "shopProductsSlice",
    initialState,
    reducers: {
        setShop: (state, action) => {

            state.shop = action.payload
        },
        setPerPage: (state, action) => {

            state.perPage = action.payload
        },
        setShopCategory: (state, action) => {

            state.shopCategory = action.payload
        },
        setFilterBrands: (state, action) => {

            state.filterBrands = action.payload
        },
        setFilterAttribute: (state, action) => {

            state.filterAttribute = action.payload
        },
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload
        },
        setDelete: (state, action) => {

            state.delete = action.payload;
        },
        setResetAll: (state, action) => {

            // state.resetAll = action.payload.length >0? ["priceReset", ...action.payload] : [];
            state.resetAll = action.payload;
        },
        setLoading: (state, action) => {

            state.loading = action.payload
        },
        setPopState: (state, action) => {

            state.popStateValue = action.payload
        },
        setFirst: (state, action) => {

            state.first = action.payload
        },


    },
    // extraReducers: (builder) => {
    //     builder.addCase(getShopProducts.fulfilled, (state, action) => {
    //         state.all  = action.payload;
    //     });
    // },
})

export const selectShopCategory = (state) => state.ShopProductsSlice.shopCategory;
export const selectPerPage = (state) => state.ShopProductsSlice.perPage;
export const selectFilterBrands = (state) => state.ShopProductsSlice.filterBrands;
export const selectFilterAttribute = (state) => state.ShopProductsSlice.filterAttribute;
export const selectFilterCategory = (state) => state.ShopProductsSlice.filterCategory;
export const selectPriceRange = (state) => state.ShopProductsSlice.priceRange;
export const selectResetAll = (state) => state.ShopProductsSlice.resetAll;
export const selectDelete = (state) => state.ShopProductsSlice.delete;
export const selectLoading = (state) => state.ShopProductsSlice.loading;
export const selectPopState = (state) => state.ShopProductsSlice.popStateValue;
export const selectFirst = (state) => state.ShopProductsSlice.first;

export const {
    setShopCategory,
    setPerPage,
    setFilterBrands,
    setFilterAttribute,
    setFilterCategory,
    setPriceRange,
    setResetAll,
    setDelete,
    setLoading,
    setPopState,
    setFirst
} = ShopProductsSlice.actions;