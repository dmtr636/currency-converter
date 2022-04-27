import {useAppSelector} from "../hooks/redux";
import {Typography} from "@mui/material";
import Decimal from "decimal.js";

function ExchangeRate(props: {side: string}) {
    const currency = useAppSelector(state => state.currency)
    const currencies = useAppSelector(state => state.currencies)

    let value
    if (props.side === "left") {
        value = new Decimal(currencies[currency.left].value / currencies[currency.right].value)
            .toDecimalPlaces(4)
            .toString()
    } else {
        value = new Decimal(currencies[currency.right].value / currencies[currency.left].value)
            .toDecimalPlaces(4)
            .toString()
    }

    return (
        <>
            {props.side === "left"
                ? <Typography variant={"body1"} paddingLeft={"14px"}>1 {currency.left} = {value} {currency.right}</Typography>
                : <Typography variant={"body1"} paddingLeft={"14px"}>1 {currency.right} = {value} {currency.left}</Typography>
            }
        </>
    )
}

export default ExchangeRate