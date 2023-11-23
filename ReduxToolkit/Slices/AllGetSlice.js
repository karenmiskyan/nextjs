import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {APICallUrl} from "../../Components/Constant";

const initialState = {
    mainMenu: [],
    slider: {},
    specialOffer: [],
    shopByCategory: [],
    newArrival: [],
    newOffer: {},
    brands: {},
    footerLeft: [],
    footerCenter: [],
    footerRight: [],
};

export const getMainMenu = createAsyncThunk(
    'GetAllSlice/getMainMenu',
    async () => {
        const response = await fetch(`${APICallUrl}/api/main-menu?slug=main-menu`);
        return await response.json();
    }
);

export const getSlider = createAsyncThunk(
    'GetAllSlice/getSlider',
    async () => {
        const response = await fetch(`${APICallUrl}/api/home-slider`);
        return await response.json();
    }
);

export const getSpecialOffer = createAsyncThunk(
    'GetAllSlice/getSpecialOffer',
    async (loginToken) => {
        const response = await fetch(`${APICallUrl}/api/get-products-with-categories-by-collection?collection=special-offer`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token || ""}`
            }
        });
        return await response.json();
    }
);

export const getShopByCategory = createAsyncThunk(
    'GetAllSlice/getShopByCategory',
    async () => {
        const response = await fetch(`${APICallUrl}/api/get-featured-product-categories`);
        return await response.json();
    }
);

export const getNewArrival = createAsyncThunk(
    'GetAllSlice/getNewArrival',
    async (loginToken) => {
        // const response = await fetch(`${APICallUrl}/api/get-products-by-collection?collection=new-arrival`, {
            const response = await fetch(`${APICallUrl}/item?json=true&per_page=40&new_products=true`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token || ""}`
            }
        });
        return await response.json();
    }
);

export const getNewOffer = createAsyncThunk(
    'GetAllSlice/getNewOffer',
    async () => {
        const response = await fetch(`${APICallUrl}/api/brands?per_page=2&page=1&new_offer=true`);
        return await response.json();
    }
);

export const getBrands = createAsyncThunk(
    'GetAllSlice/getBrands',
    async () => {
        const response = await fetch(`${APICallUrl}/api/brands?per_page=13&page=1&is_featured=true`);
        return await response.json();
    }
);

export const getFooterLeft = createAsyncThunk(
    'GetAllSlice/getFooterLeft',
    async () => {
        const response = await fetch(`${APICallUrl}/api/main-menu?slug=footer`);
        return await response.json();
    }
);

export const getFooterCenter = createAsyncThunk(
    'GetAllSlice/getFooterCenter',
    async () => {
        const response = await fetch(`${APICallUrl}/api/main-menu?slug=categories`);
        return await response.json();
    }
);

export const getFooterRight = createAsyncThunk(
    'GetAllSlice/getFooterRight',
    async () => {
        const response = await fetch(`${APICallUrl}/api/main-menu?slug=get-help`);
        return await response.json();
    }
);

export const GetAllSlice = createSlice({
    name: "getAllSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMainMenu.fulfilled, (state, action) => {
            state.mainMenu = action.payload;
        });
        builder.addCase(getSlider.fulfilled, (state, action) => {
            state.slider = action.payload;
        });
        builder.addCase(getSpecialOffer.fulfilled, (state, action) => {
            state.specialOffer = action.payload;
        });
        builder.addCase(getShopByCategory.fulfilled, (state, action) => {
            state.shopByCategory = action.payload;
        });
        builder.addCase(getNewArrival.fulfilled, (state, action) => {
            state.newArrival = action.payload?.products?.data;
        });
        builder.addCase(getNewOffer.fulfilled, (state, action) => {
            state.newOffer = action.payload;
        });
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
        });
        builder.addCase(getFooterLeft.fulfilled, (state, action) => {
            state.footerLeft = action.payload;
        });
        builder.addCase(getFooterCenter.fulfilled, (state, action) => {
            state.footerCenter = action.payload;
        });
        builder.addCase(getFooterRight.fulfilled, (state, action) => {
            state.footerRight = action.payload;
        });
    },
});

export const selectMainMenu = (state) => state.GetAllSlice.mainMenu;
export const selectSlider = (state) => state.GetAllSlice.slider;
export const selectSpecialOffer = (state) => state.GetAllSlice.specialOffer;
export const selectShopByCategory = (state) => state.GetAllSlice.shopByCategory;
export const selectNewArrival = (state) => state.GetAllSlice.newArrival;
export const selectNewOffer = (state) => state.GetAllSlice.newOffer;
export const selectBrands = (state) => state.GetAllSlice.brands;
export const selectFooterLeft = (state) => state.GetAllSlice.footerLeft;
export const selectFooterCenter = (state) => state.GetAllSlice.footerCenter;
export const selectFooterRight = (state) => state.GetAllSlice.footerRight;

export const {} = GetAllSlice.actions;
