import {configureStore} from "@reduxjs/toolkit";
import currencyReducer from "./CurrencySlice";


export const setupStore = () => {
    return configureStore({
        reducer: currencyReducer
    })
}

export type RootState = ReturnType<typeof currencyReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']