import { createReducer } from "@reduxjs/toolkit";

export const PortfolioReducer = createReducer({ portfoliodata: '' }, {
    "GETPORTFOLIODATA": (state, action) => {
        state.portfoliodata = action.payload
    }
}
)