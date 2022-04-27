import {Box, Stack} from "@mui/material";
import InputColumn from "./InputColumn";
import {useAppDispatch} from "../hooks/redux";
import {currencySlice} from "../store/CurrencySlice";

function Layout() {
    const dispatch = useAppDispatch()
    const {swap} = currencySlice.actions

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            padding={2}
            boxSizing={"border-box"}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 1, md: 2 }}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <InputColumn side={"left"} />
                <button className={"swap-button"} onClick={() => dispatch(swap())} />
                <InputColumn side={"right"} />
            </Stack>
        </Box>

    )
}

export default Layout