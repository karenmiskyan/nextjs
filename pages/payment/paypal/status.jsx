import React, {useEffect, useState} from 'react';
import {Backdrop, CircularProgress} from "@mui/material";
import {APICallUrl} from "../../../Components/Constant";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {
    selectLoginToken,
    selectMyToken,
    selectPaypalToken,
    setMyToken,
    setPaypalToken,
    setShippingSing, setShippingThree, setShippingTwo
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {setCart, setCoupon} from "../../../ReduxToolkit/Slices/CartSlice";
// export async function getServerSideProps({params}) {
//     const product = await fetch(`${APICallUrl}/item/${params?.id}?json=true`);
//
//     const data = {
//         product: await product?.json(),
//         params: params.id
//     }
//     return {props: {data}}
// }
const Status = () => {
    const router = useRouter();
    const paypal = useSelector(selectPaypalToken);
    const myToken = useSelector(selectMyToken);
    const loginToken = useSelector(selectLoginToken);
    const dispatch = useDispatch();
    const [massage, setMassage] = useState("");

    useEffect(() => {
        const modifiedPath = router.asPath.replace('/status/', '/status');

        if (Object.keys(loginToken).length > 0) {

            fetch(`${APICallUrl}${modifiedPath}&paypal_payment_id=${paypal}&json=true`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    // "Host": "https://koa-front.vercel.app/",
                    Authorization: `Bearer ${loginToken.token}`
                }
            })
                .then(res => res.json().then(res => {


                        if (res?.success) {
                            // setMassage(res.success)
                            router.push(`/checkout/${myToken}/success`);
                            dispatch(setPaypalToken(""));
                            dispatch(setMyToken(""));
                            dispatch(setCart([]));
                            dispatch(setShippingSing({}));
                            dispatch(setShippingTwo({}));
                            dispatch(setShippingThree({}));
                            dispatch(setCoupon({
                                coupon: "",
                                amount: 0
                            }));

                        } else {
                            setMassage(res.error)

                            // router.push(`/checkout`)
                            // dispatch(setPaypalToken(""))
                            // dispatch(setMyToken(""))
                        }

                        // setProductData(res)

                    })
                )
        }

    }, [])

    return (
        <Backdrop sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(255, 255, 255, 0.3)"
        }} open>
            <div style={{alignItems: "center", display: "flex", flexDirection: "column"}}>

                <CircularProgress color="primary"/>
                {
                    massage !== "" ? <>
                            <p style={{color: "var(--theme-color)"}}>{massage}</p>
                            <h3 style={{color: "var(--theme-color)"}}>Return to checkout page</h3>
                        </>
                        : ""
                }
            </div>

        </Backdrop>
    );
};

export default Status;