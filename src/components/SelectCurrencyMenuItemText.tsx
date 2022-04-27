import {Typography} from "@mui/material";

function SelectCurrencyMenuItemText(props: { code: string; name: string }) {
    return (
        <Typography sx={{textOverflow: "ellipsis", display: "block", overflow: "hidden"}}>
            <span style={{ width: "45px", display: "inline-block"}}>
                {props.code}
            </span>
            <span style={{ color: "#71767A"}}>
                {props.name}
            </span>
        </Typography>
    )
}

export default SelectCurrencyMenuItemText