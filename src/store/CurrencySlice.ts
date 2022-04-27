import Decimal from "decimal.js";
import {ICurrency} from "../model/ICurrency";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISetValuePayload} from "../model/ISetValuePayload";
import {ISetCurrencyPayload} from "../model/ISetCurrencyPayload";
import {RootState} from "./index";

Decimal.set({ toExpPos: 100 })

interface CurrencyState {
    currency: {
        left: string
        right: string
    },
    value: {
        left: string
        right: string
    },
    currencies: Record<string, ICurrency>
}

const initialState: CurrencyState = {
    currency: {
        left: "RUB",
        right: "USD"
    },
    value: {
        left: "0",
        right: "0"
    },
    currencies: {}
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrencies(state, action: PayloadAction<Record<string, ICurrency>>) {
            state.currencies = action.payload
        },
        setCurrency(state, action: PayloadAction<ISetCurrencyPayload>) {
            if (action.payload.side === "left") {
                state.currency.left = action.payload.code
            } else {
                state.currency.right = action.payload.code
            }
            state.value.right = calcValue(state, state.value.left, "left")
        },
        swap(state) {
            [state.currency.left, state.currency.right] = [state.currency.right, state.currency.left]
            state.value.right = calcValue(state, state.value.left, "left")
        },
        setValue(state, action: PayloadAction<ISetValuePayload>) {
            let side = action.payload.side
            let value = action.payload.value

            state.value[side as keyof RootState["value"]] = value
            if (side === "left") {
                state.value.right = calcValue(state, value, side)
            } else {
                state.value.left = calcValue(state, value, side)
            }
        }
    }
})

function calcValue(state: RootState, sourceValue: string, sourceSide: string) {
    let leftExchangeRate = new Decimal(state.currencies[state.currency.left].value)
    let rightExchangeRate = new Decimal(state.currencies[state.currency.right].value)
    if (sourceValue.length === 0) {
        sourceValue = "0"
    } else if (sourceValue.endsWith(".")) {
        sourceValue = sourceValue + "0"
    }
    let sourceValueDecimal = new Decimal(sourceValue)
    if (sourceSide === "left") {
        sourceValueDecimal = sourceValueDecimal.mul(leftExchangeRate.div(rightExchangeRate))
    } else {
        sourceValueDecimal = sourceValueDecimal.mul(rightExchangeRate.div(leftExchangeRate))
    }
    return sourceValueDecimal.toDecimalPlaces(4).toString()
}

export default currencySlice.reducer