import {TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {currencySlice} from "../store/CurrencySlice";
import React, {ChangeEvent} from "react";
import {RootState} from "../store";

function InputField(props: { side: string }) {
    const value = useAppSelector(state => state.value[props.side as keyof RootState["value"]])

    const dispatch = useAppDispatch()
    const {setValue} = currencySlice.actions

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.toString()

        // Replace commas with dots
        value = value.replace(",", ".")

        // Remove leading zeros
        if (value.length > 0 ) {
            value = value.replace(/^0+/, '')
            if (value.length === 0) {
                value = "0"
            }
        }

        // Add zero before dot
        if (value[0] === ".") {
            value = "0" + value
        }

        // Not a number
        if (isNaN(Number(value))) {
            return;
        }

        dispatch(setValue({
            side: props.side,
            value: value
        }))
    };

    return (
        <TextField
            id="standard-basic"
            value={value}
            variant="standard"
            InputProps={{style: {fontSize: 30, paddingLeft:12}, disableUnderline: true}}
            inputProps={{ maxLength: 18 }}
            onChange={handleChange}
        />
    )
}

export default InputField