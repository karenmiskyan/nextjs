import { createReducer } from "@reduxjs/toolkit";

export const BlogReducer = createReducer({ blogdata: [], Blogdatanew: '' }, {
    'GETBLOGDATA': (state, action) => {
        state.blogdata = action.payload;
        state.Blogdatanew = action.payload;
    }
});