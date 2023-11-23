import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    compareProducts: []
};

export const CompareProduct = createReducer(initialState, {
    'CHANGECOMPARE': (state, action) => {
        state.compareProducts = action.payload
    },
});