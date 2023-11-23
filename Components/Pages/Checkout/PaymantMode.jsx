import React, {Fragment, useEffect, useState} from "react";
import {Col, Input, Label, Row} from "reactstrap";
import {APICallUrl, Payment, PayPal} from "../../Constant";
import {HostedForm} from 'react-acceptjs';
import AuthorizeNet from "../../Element/AuthorizeNet";
import {
    selectLoginToken,
    setShippingSing, setShippingThree, setShippingTwo,
    shippingSing,
    shippingThree,
    shippingTwo
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalBody} from 'reactstrap';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import Paypal from "./Paypal";
import TotalPrice from "./TotalPrice";
import {
    selectAmountCoupon,
    selectCheckoutDetails,
    selectCheckoutErrors, selectShippingDetails,
    selectTotal,
    setCoupon
} from "../../../ReduxToolkit/Slices/CartSlice";
import Link from "next/link";
import {useRouter} from "next/router";

const authData = {
    apiLoginID: '8gF889jSLdRy',
    clientKey: '72dm9C57842wKnN6',
};

const PaymantMode = ({isFormData, setIsLoading, address, address2, address3, tax, checkout, check, onAccount}) => {
    const [isRadio, setISRadio] = useState("stripe");
    const [customToken, setCustomToken] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const selectedShipping = useSelector(shippingSing);
    const selectedShippingTwo = useSelector(shippingTwo);
    const selectedShippingThree = useSelector(shippingThree);
    const loginToken = useSelector(selectLoginToken);
    const checkoutDetails = useSelector(selectCheckoutDetails);
    const shippingDetails = useSelector(selectShippingDetails);
    const checkoutErrors = useSelector(selectCheckoutErrors);
    const [isChecked, setIsChecked] = useState(false);
    const total = useSelector(selectTotal);
    const amountCoupon = useSelector(selectAmountCoupon);
    const [arr, setArr] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        setISRadio("stripe")


    }, []);


    useEffect(() => {
        let tempArr = [];

        if (Object.keys(selectedShipping).length > 0) {
            tempArr.push(selectedShipping);
        }

        if (Object.keys(selectedShippingTwo).length > 0) {
            tempArr.push(selectedShippingTwo);
        }

        if (Object.keys(selectedShippingThree).length > 0) {
            tempArr.push(selectedShippingThree);
        }

        setArr(tempArr);
    }, [selectedShipping, selectedShippingTwo, selectedShippingThree])

    useEffect(() => {
        const crypto = require('crypto');

        function generateCustomToken() {
            const uniqueId = generateUniqueId(); // Generate a unique identifier
            const timestamp = Date.now().toString(); // Get the current timestamp

            // Concatenate the uniqueId and timestamp
            let tokenData = uniqueId + timestamp;

            // Trim the token data to 12 characters if it exceeds the limit
            if (tokenData.length > 12) {
                tokenData = tokenData.substring(0, 12);
            }

            // Generate a cryptographic hash of the token data
            const token = crypto
                .createHash('sha256')
                .update(tokenData)
                .digest('hex');

            return token;
        }

        function generateUniqueId() {
            // Generate a unique identifier using a library or custom logic
            // Here's an example using UUID
            const {v4: uuidv4} = require('uuid');
            return uuidv4().substring(0, 8); // Use only the first 8 characters of the UUID
        }

        setCustomToken(generateCustomToken().slice(0, 32))

    }, [])


    const order = (method) => {
        setIsLoading(true)
        // setIsLoading(true)
        // const mergedObj = {...formik.values, ...selectedValues, ...interested};

        const requestBody = {
            payment_method: method,
            token: customToken,
            shipping_address: check ? shippingDetails : null,
            shipping_options: {
                "part_1": {
                    "method": selectedShipping?.shipping_method,
                    "option": selectedShipping?.id,
                    "address": selectedShipping?.shipping_method === "local_pickup" ? address : undefined

                },
                "part_2": {
                    "method": selectedShippingTwo?.shipping_method,
                    "option": selectedShippingTwo?.id,
                    "address": selectedShippingTwo?.shipping_method === "local_pickup" ? address2 : undefined


                },
                "part_3": {
                    "method": selectedShippingThree?.shipping_method,
                    "option": selectedShippingThree?.id,
                    "address": selectedShippingThree?.shipping_method === "local_pickup" ? address3 : undefined
                }
            },
            address: checkoutDetails,
            amount: ((Number(total) - Number(amountCoupon)) + Number(selectedShipping.price || 0) + Number(selectedShippingTwo.price || 0) + Number(selectedShippingThree.price || 0) + (Number(total) * Number(tax?.tax) / 100)).toFixed(2),
            currency: "USD",
        };

        // Conditionally add shipping_method field if selectedShipping?.shipping_method exists
        // if (selectedShipping?.shipping_method) {
        //     requestBody.shipping_method = selectedShipping.shipping_method;
        // }

        fetch(`${APICallUrl}/api/checkout-process`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json()).then((res) => {
            if (res.error === false) {
                fetch(`${APICallUrl}/api/checkout/${customToken}/success`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    },
                })
                    .then(res => res.json().then(res => {
                            dispatch(setShippingSing({}));
                            dispatch(setShippingTwo({}));
                            dispatch(setShippingThree({}));
                            dispatch(setCoupon({
                                coupon: "",
                                amount: 0
                            }));
                            router.push(`checkout/${res.token}/success`)
                            setIsLoading(false);
                        })
                    )
                // setIsLoading(false)

            } else {
                setErr(res.message);
                setIsLoading(false);
            }
        })
            .catch((error) => {
                // Handle general fetch error
                setIsLoading(false)
                console.error('Failed to Order:', error);
            });
    }

    return (
        <Row className="position-relative">
            <h3 className="mb-3">{Payment}</h3>
            <Col className="d-block my-3">
                {arr?.every(el => el?.shipping_method === "local_pickup") &&
                    <div className="form-check custome-radio-box">
                        <Input className="form-check-input" type="radio"
                               checked={isRadio === "pickup"}
                               name="flexRadioDefault" onChange={() => setISRadio("pickup")}/>
                        <Label className="form-check-label" htmlFor="stripe" onClick={() => setISRadio("pickup")}>
                            Pay on Pickup
                        </Label>
                    </div>
                }
                <div className="form-check custome-radio-box">
                    <Input className="form-check-input" type="radio"
                           checked={isRadio === "stripe"}
                           name="flexRadioDefault" onChange={() => setISRadio("stripe")}/>
                    <Label className="form-check-label" htmlFor="stripe" onClick={() => setISRadio("stripe")}>
                        {"Authorize.net"}
                    </Label>
                </div>
                <div className="form-check custome-radio-box">
                    <Input className="form-check-input" type="radio" name="flexRadioDefault"
                           checked={isRadio === "paypal"} onChange={() => setISRadio("paypal")}/>
                    <Label className="form-check-label" htmlFor="paypal" onClick={() => setISRadio("paypal")}>
                        {PayPal}
                    </Label>
                </div>
                {onAccount &&
                    <div className="form-check custome-radio-box">
                        <Input className="form-check-input" type="radio"
                               checked={isRadio === "balance"}
                               name="flexRadioDefault" onChange={() => setISRadio("balance")}/>
                        <Label className="form-check-label" htmlFor="balance" onClick={() => setISRadio("balance")}>
                            On Account
                        </Label>
                    </div>
                }
            </Col>
            {/*<Col lg="4">*/}
            {/*    <TotalPrice color="white" pos="relative"/>*/}
            {/*</Col>*/}
            <Row className="justify-content-between">

                {isRadio === "stripe" ? (
                    <AuthorizeNet setIsLoading={setIsLoading} customToken={customToken} formToken={"loginToken"} tax={tax}
                                  address={address} address2={address2} address3={address3} check={check}/>


                ) : isRadio === "pickup" && arr?.every(el => el?.shipping_method === "local_pickup") ?
                    <Col lg="6">
                        <Row className="g-3">
                            <Col lg="12">
                                <p>Pay with cash or credit card upon pickup.</p>
                            </Col>
                            <Col lg="12">
                                <div className='form-check p-0 custome-form-check'>
                                    <input
                                        className='checkbox_animated check-it'
                                        type='checkbox'
                                        onChange={() => setIsChecked(prev => !prev)}
                                        checked={isChecked}/>
                                    <p className='form-check-label'
                                       style={{marginBottom: "0"}}>I have read and agree to the website
                                        <Link href={`/terms-conditions`}> terms and conditions</Link> * </p>
                                    {/*<p className='font-light'>(25)</p>*/}
                                </div>
                            </Col>
                            <Col md='12'>
                                <div className='product-buttons' style={{flexDirection: "column"}}>
                                    <button className='btn btn-solid hover-solid btn-animation'
                                            onClick={() => order("cod")}
                                            disabled={!isChecked || !checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.country || !checkoutDetails.zip_code || !checkoutDetails.city || !checkoutDetails.address || checkoutErrors !== 0}
                                    >Place Order
                                    </button>
                                    <span style={{
                                        color: 'var(--theme-color)',
                                        marginTop: "10px"
                                    }}>{err?.length > 0 && err}{(!checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.country || !checkoutDetails.zip_code || !checkoutDetails.city || !checkoutDetails.address || checkoutErrors !== 0) && "All fields must be completed"}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    : (
                        isRadio === "balance" && onAccount ?
                            <Col lg="6">
                                <Row className="g-3">
                                    {/*<Col lg="12">*/}
                                    {/*    <p>Pay with Balance.</p>*/}
                                    {/*</Col>*/}
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input
                                                className='checkbox_animated check-it'
                                                type='checkbox'
                                                onChange={() => setIsChecked(prev => !prev)}
                                                checked={isChecked}/>
                                            <p className='form-check-label'
                                               style={{marginBottom: "0"}}>I have read and agree to the website
                                                <Link href={`/terms-conditions`}> terms and conditions</Link> * </p>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col md='12'>
                                        <div className='product-buttons' style={{flexDirection: "column"}}>
                                            <button className='btn btn-solid hover-solid btn-animation'
                                                    onClick={() => order("on_account")}
                                                    disabled={!isChecked || !checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.country || !checkoutDetails.zip_code || !checkoutDetails.city || !checkoutDetails.address || checkoutErrors !== 0}
                                            >Place Order
                                            </button>
                                            <span style={{
                                                color: 'var(--theme-color)',
                                                marginTop: "10px"
                                            }}>{err?.length > 0 && err}{(!checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.country || !checkoutDetails.zip_code || !checkoutDetails.city || !checkoutDetails.address || checkoutErrors !== 0) && "All fields must be completed"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            :
                            <Col lg="6">
                                {/*<PayPalScriptProvider*/}
                                {/*    options={{clientId: "AdTomoL9x9F5h9cvocPIZvD4qXtMpAPHav3ADyWYPis7S7ArFH6Sig6w6mdrO46onJY-AElqEgUnBdV8"}}>*/}
                                {/*    <PayPalButtons style={{layout: "horizontal"}}/>*/}
                                {/*</PayPalScriptProvider>*/}
                                <Paypal setIsLoading={setIsLoading} customToken={customToken} check={check} tax={tax}
                                        address={address} address2={address2} address3={address3}/>
                            </Col>
                    )}
                <Col lg="4">
                    <TotalPrice color="white" coupon={true} tax={tax}/>
                </Col>
            </Row>
        </Row>
    );
};

export default PaymantMode;
