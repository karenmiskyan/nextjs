import { createReducer } from '@reduxjs/toolkit';

const initialGrid = 'row-cols-lg-4 row-cols-md-3';
export const AllGridReducer = createReducer({ initialGrid: 'row-cols-lg-3 row-cols-md-3' }, {
    'SET_GRID': (state, action) => {
        state.initialGrid = action.payload;
    }
});