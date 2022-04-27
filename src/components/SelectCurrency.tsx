import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {currencySlice} from "../store/CurrencySlice"
import {RootState} from "../store";

function SelectCurrency(props: { side: string; }) {
    const currency = useAppSelector(state => state.currency[props.side as keyof RootState["currency"]])
    const currencies = useAppSelector(state => state.currencies)

    const dispatch = useAppDispatch()
    const {setCurrency} = currencySlice.actions

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setCurrency({
            side: props.side,
            code: event.target.value
        }))
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            defaultValue={currency}
            onChange={handleChange}
            MenuProps={MenuProps}
        >
            {Object.keys(currencies).map(key =>
                <MenuItem value={currencies[key].code} key={key}>
                    <Typography sx={{textOverflow: "ellipsis", display: "block", overflow: "hidden"}}>
                    <span style={{ width: "45px", display: "inline-block"}}>
                        {currencies[key].code}
                    </span>
                    <span style={{ color: "#71767A"}}>
                        {currencies[key].name}
                    </span>
                    </Typography>
                </MenuItem>
            )}
        </Select>
    )
}

export default SelectCurrency

