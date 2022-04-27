import axios from "axios";
import {ICurrency} from "../model/ICurrency";
import {AppDispatch} from "../store";
import {currencySlice} from "../store/CurrencySlice";

export const fetchCurrencies = () => {
    const {setCurrencies} = currencySlice.actions

    return (dispatch: AppDispatch) => {
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
            .then(res => {
                let currencies: Record<string, ICurrency> = {}
                for (let key in res.data["Valute"]) {
                    let item = res.data["Valute"][key]
                    currencies[key] = {
                        code: item["CharCode"],
                        name: item["Name"],
                        value: item["Value"]
                    }
                }
                currencies["RUB"] = {
                    code: "RUB",
                    name: "Российский рубль",
                    value: 1,
                }

                // Sort by currency code
                currencies = Object.fromEntries(Object.entries(currencies).sort())

                dispatch(setCurrencies(currencies))
            })
    }
}