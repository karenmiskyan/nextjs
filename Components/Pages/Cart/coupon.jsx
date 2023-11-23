import React, {useEffect, useState} from 'react';
import {Input} from "reactstrap";
import {selectAmountCoupon, selectCoupon, setCoupon} from "../../../ReduxToolkit/Slices/CartSlice";
import {Btn} from "../../AbstractElements";
import {APICallUrl} from "../../Constant";
import {useDispatch, useSelector} from "react-redux";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Backdrop, CircularProgress} from "@mui/material";

const Coupon = () => {

    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const coupon = useSelector(selectCoupon);
    const amountCoupon = useSelector(selectAmountCoupon);

    const couponCheck = () => {
        setLoading(true);
        fetch(`${APICallUrl}/api/add-coupon`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "coupon": coupon
            })
        })
            .then((res) => res.json()).then((res) => {
            if (res.success === false) {
                if (amountCoupon > 0) {
                    setErr("You already have a used coupon");
                    setLoading(false);

                } else {
                    setErr("Coupon code is not valid")
                    setLoading(false);
                }
            } else {
                fetch(`${APICallUrl}/api/get-coupon`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {
                    if (res.amount !== null && res.coupon !== null) {

                        dispatch(setCoupon(res));
                        setLoading(false);
                    }
                    setLoading(false);

                })
                    .catch((error) => {
                        // Handle general fetch error
                        console.error('Failed to get Coupon', error);
                    });
                setErr("");
            }



        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Coupon', error);
            });
    }
    const removeCoupon = () => {
        setLoading(true)
        fetch(`${APICallUrl}/api/remove-coupon`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {


            if (res.success === true) {
                dispatch(setCoupon({
                    coupon: "",
                    amount: 0
                }));
                setErr("");
                setLoading(false);
            }
            setLoading(false);

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to Delete Coupon', error);
            });
    }


    useEffect(() => {
        setLoading(true);
        fetch(`${APICallUrl}/api/get-coupon`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {
            if (res.amount !== null && res.coupon !== null) {


                dispatch(setCoupon(res))
                setLoading(false);
            }
            setLoading(false);


        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Coupon', error);
            });
    }, [])

    return (
        <div className='promo-section'
             style={{borderBottom: "1px solid #E6E8E9", paddingBottom: "16px", position: 'relative'}}>
            <div className="coupon-block">
                <div className="coupon-input d-flex">
                    <Input type='text' className='form-control' id='number'
                           value={coupon}
                           onChange={(e) => dispatch(setCoupon({
                               coupon: e.target.value,
                               amount: amountCoupon > 0 ? amountCoupon : 0
                           }))}
                           placeholder='Coupon Code'/>
                    <button
                        disabled={coupon === ""}
                        onClick={couponCheck}
                        className='btn coupon btn-solid-default btn'
                        style={{color: "black"}}>Apply
                    </button>
                </div>
            </div>
            {
                err !== "" &&
                <p style={{
                    margin: "8px 0 0 0",
                    fontWeight: "500",
                    color: "var(--theme-color)"
                }}>{err}</p>
            }
            {
                coupon !== "" && amountCoupon > 0 &&
                <h6 className='fw-bold' style={{margin: "8px 0 0 0"}}>
                    Coupon Code: {coupon}
                    <span style={{
                        float: "right",
                        color: "var(--theme-color)",
                        display: "flex"
                    }}>You Save: ${amountCoupon?.toFixed(2)}
                        <Btn
                            style={{
                                background: "none",
                                padding: "0",
                                fontSize: "16px",
                                marginLeft: "6px"
                            }}
                            attrBtn={{
                                type: 'button',
                                className: 'btn-close d-block',
                                onClick: () => removeCoupon(),
                            }}>
                            <i className='fas fa-times'
                               style={{color: "var(--theme-color)"}}></i>
                        </Btn>
                    </span>
                </h6>
            }
            {
                loading &&
                <Backdrop sx={{
                    position: "absolute",
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                }} open>
                    <CircularProgress color="primary"/>
                </Backdrop>
            }

        </div>
    );
};

export default Coupon;