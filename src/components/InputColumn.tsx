import {Paper, Stack, Typography} from "@mui/material";
import SelectCurrency from "./SelectCurrency";
import InputField from "./InputField";
import ExchangeRate from "./ExchangeRate";

function InputColumn(props: { side: string }) {

    let headerText;
    if (props.side === "left") {
        headerText = "У меня есть";
    } else {
        headerText = "Я получу";
    }

    return (
        <Stack
            direction={"column"}
            spacing={2}
            maxWidth={{ xs: '300px', sm: '250px', md: '380px'}}
        >
            <Typography variant={"h6"}>{headerText}</Typography>

            <Paper elevation={2} sx={{paddingBottom: "12px"}}>
                <Stack direction={"column"} spacing={2}>
                    <SelectCurrency side={props.side} />
                    <InputField side={props.side} />
                    <ExchangeRate side={props.side} />
                </Stack>
            </Paper>
        </Stack>
    )
}

export default InputColumn