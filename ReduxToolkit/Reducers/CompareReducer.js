import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    compareProducts: []
};

export const CompareReducer = createReducer(initialState, {
    'CHANGECOMPARE': (state, action) => {
        state.compareProducts = action.payload
    },
});