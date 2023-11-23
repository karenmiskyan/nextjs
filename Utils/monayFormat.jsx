import {Skeleton} from "@mui/material";

export default function formatMoney(amount) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);

    // Check if the formatted amount is '$0.00' and replace it with '1' if true
    return formattedAmount === '$0.00' ?
        <Skeleton variant="text" className="w-50 text-decoration-none m-0"
                                                   style={{fontSize: "unset"}}/> : formattedAmount;
}