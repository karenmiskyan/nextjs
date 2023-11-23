import { createReducer } from "@reduxjs/toolkit";
import { ConfigDB } from "../../Config/ThemeConfigSettings";
const Values = {
    direction: ConfigDB.layoutDirection,
    mode: ConfigDB.darkMode,
    primaryColor: ConfigDB.primaryColor
}
export const ThemeCustomizerReducer = createReducer(Values, {
    'ISDIRECTION': (state, action) => {
        state.direction = action.payload
    },
    'ISMODE': (state, action) => {
        state.mode = action.payload
    },
    'ISPRIMARYCOLOR': (state, action) => {
        state.primaryColor = action.payload
    }
}
)