// import React, { useState} from "react";
// import {Col, Row, Label} from "reactstrap";
// import * as Yup from "yup";
// import {useFormik} from "formik";
// import {Addtocart, APICallUrl} from "../Constant";
// import {useDispatch, useSelector} from "react-redux";
// import {
//     selectLoginToken,
//     setShippingSing,
//     setShippingThree,
//     setShippingTwo,
//     shippingSing, shippingThree, shippingTwo
// } from "../../ReduxToolkit/Slices/LoginSlice";
// import {
//     selectAmountCoupon,
//     selectCheckoutDetails,
//     selectCheckoutErrors, selectShippingDetails,
//     selectTotal, setCoupon
// } from "../../ReduxToolkit/Slices/CartSlice";
// import {useRouter} from "next/router";
// import Link from "next/link";
//
//
// const AuthorizeNet = ({setIsLoading, customToken, address, address2, address3, check, tax}) => {
//
//     const loginToken = useSelector(selectLoginToken);
//     const checkoutDetails = useSelector(selectCheckoutDetails);
//     const checkoutErrors = useSelector(selectCheckoutErrors);
//     const shippingDetails = useSelector(selectShippingDetails);
//     const total = useSelector(selectTotal);
//     const amountCoupon = useSelector(selectAmountCoupon);
//     const selectedShipping = useSelector(shippingSing);
//     const selectedShippingTwo = useSelector(shippingTwo);
//     const selectedShippingThree = useSelector(shippingThree);
//     const [isChecked, setIsChecked] = useState(false);
//
//     const router = useRouter();
//     const dispatch = useDispatch();
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };
//
//
//     const initialValues = {
//         cardNumber: "",
//         cardExpiry: "",
//         cardCsv: ""
//
//     }
//
//     const validationSchema = Yup.object({
//         cardNumber: Yup.string()
//             .required("Card Number is required")
//             .matches(/^(\d{4}\s?){3}\d{4}$/, "Card Number must be exactly 16 digits"),
//         cardExpiry: Yup.string()
//             .required("Card Expiry is required")
//             .min(4, "Card Expiry must have at least 4 digits")
//             .matches(/^(\d{2}\s?\/\s?\d{2})$/, "Card Expiry format is invalid"),
//         cardCsv: Yup.string().required("Card Expiry is required")
//             .min(3, "Card CSV must be at least 3 digits"),
//     })
//
//     const formik = useFormik({
//         initialValues,
//         validationSchema,
//     })
//
//
//     function ltrim(str) {
//         if (!str) return str;
//         return str.replace(/^\s+/g, '');
//     }
//
//     let [err, setErr] = useState("")
//     const order = () => {
//         setIsLoading(true)
//
//         const requestBody = {
//             payment_method: "authorize",
//             token: customToken,
//             shipping_address: check ? shippingDetails : null,
//             payment_details: {
//                 credit_card_number: formik.values.cardNumber.replace(/\s/g, ""),
//                 expiration_date: formik.values.cardExpiry.replace(/\s/g, ""),
//                 cvv: formik.values.cardCsv,
//             },
//             shipping_options: {
//                 "part_1": {
//                     "method": selectedShipping?.shipping_method,
//                     "option": selectedShipping?.id,
//                     "address": selectedShipping?.shipping_method === "local_pickup" ? address : undefined
//
//                 },
//                 "part_2": {
//                     "method": selectedShippingTwo?.shipping_method,
//                     "option": selectedShippingTwo?.id,
//                     "address": selectedShippingTwo?.shipping_method === "local_pickup" ? address2 : undefined
//
//
//                 },
//                 "part_3": {
//                     "method": selectedShippingThree?.shipping_method,
//                     "option": selectedShippingThree?.id,
//                     "address": selectedShippingThree?.shipping_method === "local_pickup" ? address3 : undefined
//                 }
//             },
//             address: checkoutDetails,
//             amount: ((Number(total) - Number(amountCoupon)) + Number(selectedShipping.price || 0) + Number(selectedShippingTwo.price || 0) + Number(selectedShippingThree.price || 0) + (Number(total) * Number(tax?.tax) / 100)).toFixed(2),
//             currency: "USD",
//         };
//
//
//
//         fetch(`${APICallUrl}/api/checkout-process`, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json;charset=UTF-8",
//                 Authorization: `Bearer ${loginToken.token}`
//             },
//             body: JSON.stringify(requestBody),
//         })
//             .then((res) => res.json()).then((res) => {
//
//             if (res.error === false) {
//                 fetch(`${APICallUrl}/api/checkout/${customToken}/success`, {
//                     method: 'GET',
//                     headers: {
//                         "Content-Type": "application/json;charset=UTF-8",
//                         Authorization: `Bearer ${loginToken.token}`
//                     },
//                 })
//                     .then(res => res.json().then(res => {
//
//
//                             dispatch(setShippingSing({}));
//                             dispatch(setShippingTwo({}));
//                             dispatch(setShippingThree({}));
//                             dispatch(setCoupon({
//                                 coupon: "",
//                                 amount: 0
//                             }));
//                             router.push(`checkout/${res.token}/success`)
//                             setIsLoading(false);
//
//                         })
//                     )
//
//             } else {
//                 setErr(res.message);
//                 setIsLoading(false);
//             }
//         })
//             .catch((error) => {
//                 // Handle general fetch error
//                 setIsLoading(false)
//                 console.error('Failed to Order:', error);
//             });
//     }
//
//     return (
//         <Col lg="6" className="form-container-authorize">
//
//             <form onSubmit={handleSubmit}>
//                 <Row>
//                     <Col lg="12">
//                         <Row className="g-4 ">
//                             <Col lg="12">
//                                 <Label className='form-label required-label'>Card Number</Label>
//
//                                 <input
//                                     type="text"
//                                     name="cardNumber"
//                                     className="form-control checkout-form"
//                                     placeholder="1234 1234 1234 1234"
//                                     value={formik.values.cardNumber}
//                                     style={{color: formik.touched.cardNumber && formik.errors.cardNumber && 'var(--theme-color)'}}
//                                     onChange={(e) => {
//                                         const input = e.target.value;
//                                         const onlyNumbers = input.replace(/[^\d]/g, "");
//                                         let formattedValue = "";
//
//                                         for (let i = 0; i < Math.min(onlyNumbers.length, 16); i += 4) {
//                                             formattedValue += onlyNumbers.substr(i, 4) + " ";
//                                         }
//
//                                         formik.setFieldValue("cardNumber", formattedValue.trim());
//                                     }}
//                                     onBlur={formik.handleBlur}
//                                     inputMode="numeric" // Enable entering numbers on mobile touch devices
//                                     pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
//                                 />
//                                 {formik.touched.cardNumber && formik.errors.cardNumber && (
//                                     <span style={{color: 'var(--theme-color)'}}>{formik.errors.cardNumber}</span>
//                                 )}
//
//                             </Col>
//                             <Col lg="6">
//                                 <Label className='form-label required-label'>Exp. Date</Label>
//                                 {/*<div className='form-control checkout-form'>*/}
//                                 <input type='text' name="cardExpiry" className='form-control checkout-form'
//                                        style={{color: formik.touched.cardExpiry && formik.errors.cardExpiry && 'var(--theme-color)'}}
//                                        placeholder="MM / YY"
//                                        value={formik.values.cardExpiry}
//                                        onChange={(e) => {
//                                            const input = e.target.value;
//                                            const onlyNumbers = input.replace(/[^\d]/g, "");
//                                            let formattedValue = "";
//
//                                            if (onlyNumbers.length >= 2) {
//                                                formattedValue = onlyNumbers.slice(0, 2);
//
//                                                if (onlyNumbers.length >= 3) {
//                                                    formattedValue += " / " + onlyNumbers.slice(2, 4);
//                                                }
//                                            } else {
//                                                formattedValue = onlyNumbers;
//                                            }
//
//                                            formik.setFieldValue("cardExpiry", formattedValue);
//                                        }}
//                                        onBlur={formik.handleBlur}
//                                        inputMode="numeric"
//                                        pattern="\d{2} / \d{2}"
//                                 />
//                                 {formik.touched.cardExpiry && formik.errors.cardExpiry && (
//                                     <span style={{color: 'var(--theme-color)'}}>{formik.errors.cardExpiry}</span>
//                                 )}
//
//                             </Col>
//                             <Col lg="6">
//                                 <Label className='form-label required-label'>CSV Code</Label>
//                                 {/*<div className='form-control checkout-form'>*/}
//                                 <input
//                                     type="text"
//                                     style={{color: formik.touched.cardCsv && formik.errors.cardCsv && 'var(--theme-color)'}}
//                                     className="form-control checkout-form"
//                                     name="cardCsv"
//                                     placeholder="CVC"
//                                     value={formik.values.cardCsv}
//                                     onChange={(e) => {
//                                         const onlyNumbers = e.target.value.replace(/[^\d]/g, "");
//                                         formik.setFieldValue("cardCsv", onlyNumbers);
//                                     }}
//                                     onBlur={formik.handleBlur}
//                                     maxLength={3}
//                                     inputMode="numeric"
//                                     pattern="[0-9]*"
//                                 />
//                                 {formik.touched.cardCsv && formik.errors.cardCsv && (
//                                     <span style={{color: 'var(--theme-color)'}}>{formik.errors.cardCsv}</span>
//                                 )}
//
//                             </Col>
//                             <Col lg="12">
//                                 <div className='form-check p-0 custome-form-check'>
//                                     <input
//                                         className='checkbox_animated check-it'
//                                         type='checkbox'
//                                         onChange={() => setIsChecked(prev => !prev)}
//                                         checked={isChecked}/>
//                                     <p className='form-check-label'
//                                        style={{marginBottom: "0"}}>I have read and agree to the website
//                                         <Link href={`/terms-conditions`}> terms and conditions</Link> * </p>
//                                     {/*<p className='font-light'>(25)</p>*/}
//                                 </div>
//                             </Col>
//                             <Col md='12'>
//                                 <div className='product-buttons' style={{flexDirection: "column"}}>
//                                     <button className='btn btn-solid hover-solid btn-animation'
//                                             onClick={order}
//                                             disabled={!isChecked || !formik.values.cardNumber || !formik.values.cardExpiry || !formik.values.cardCsv || !checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.country || !checkoutDetails.zip_code || !checkoutDetails.city || !checkoutDetails.address || checkoutErrors !== 0}
//                                     >Place Order
//                                     </button>
//                                     <span style={{
//                                         color: 'var(--theme-color)',
//                                         marginTop: "10px"
//                                     }}>{err?.length > 0 && err}{(!formik.values.cardNumber || !formik.values.cardExpiry || !formik.values.cardCsv || !checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.country || !checkoutDetails.zip_code || !checkoutDetails.city || !checkoutDetails.address || checkoutErrors !== 0) && "All fields must be completed"}</span>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Col>
//                 </Row>
//             </form>
//         </Col>
//     );
// };
// export default AuthorizeNet;

import React, {useState} from "react";
import {Col, Row, Label} from "reactstrap";
import * as Yup from "yup";
import {useFormik} from "formik";
import creditCardType from 'credit-card-type';
import {Addtocart, APICallUrl} from "../Constant";
import {useDispatch, useSelector} from "react-redux";
import {
    selectLoginToken,
    setShippingSing,
    setShippingThree,
    setShippingTwo,
    shippingSing,
    shippingThree,
    shippingTwo
} from "../../ReduxToolkit/Slices/LoginSlice";
import {
    selectAmountCoupon,
    selectCheckoutDetails,
    selectCheckoutErrors,
    selectShippingDetails,
    selectTotal,
    setCoupon
} from "../../ReduxToolkit/Slices/CartSlice";
import {useRouter} from "next/router";
import Link from "next/link";

const AuthorizeNet = ({setIsLoading, customToken, address, address2, address3, check, tax}) => {
    const loginToken = useSelector(selectLoginToken);
    const checkoutDetails = useSelector(selectCheckoutDetails);
    const checkoutErrors = useSelector(selectCheckoutErrors);
    const shippingDetails = useSelector(selectShippingDetails);
    const total = useSelector(selectTotal);
    const amountCoupon = useSelector(selectAmountCoupon);
    const selectedShipping = useSelector(shippingSing);
    const selectedShippingTwo = useSelector(shippingTwo);
    const selectedShippingThree = useSelector(shippingThree);
    const [isChecked, setIsChecked] = useState(false);
    const [type, setType] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const initialValues = {
        cardNumber: "",
        cardExpiry: "",
        cardCsv: ""
    };


    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .required("Card Number is required")
            .test("cardNumberPattern", "Card Number must be exactly.", function (value) {
                const cardType = creditCardType(value)[0]?.niceType.toLowerCase();

                if (cardType === 'american express') {
                    return /^\d{15}$/.test(value.replace(/ /g, '')); // Enforce 15 digits for American Express
                } else {
                    return /^\d{16}$/.test(value.replace(/ /g, '')); // Enforce 16 digits for other card types
                }
            }),
        cardExpiry: Yup.string()
            .required("Card Expiry is required")
            .min(4, "Card Expiry must have at least 4 digits")
            .matches(/^(\d{2}\s?\/\s?\d{2})$/, "Card Expiry format is invalid"),
        cardCsv: Yup.string()
            .required("Card CSV is required")
            .test("americanExpressCsv", "Card CSV must be at least 4 digits for American Express", function (value) {
                const cardNumber = this.parent.cardNumber;
                if (cardNumber) {
                    const cardType = creditCardType(cardNumber)[0]?.niceType.toLowerCase();
                    if (cardType === 'american express') {
                        return value && value.length >= 4;
                    } else {
                        return value && value.length <= 3;
                    }
                }
                return true;
            })
            .min(3, "Card CSV must be at least 3 digits"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
    });

    const handleCardNumberChange = (e) => {
        const input = e.target.value;
        const cardNumber = input.replace(/[^\d]/g, "");
        let formattedValue = cardNumber;

        // Detect the card type
        const cardTypes = creditCardType(cardNumber);


        if (cardTypes.length > 0) {
            const cardType = cardTypes[0].niceType.toLowerCase();
            const maxLength = cardType === 'american express' ? 4 : 3; // Set maxLength based on card type
            setType(cardType)
            // Adjust the formatting based on the card type
            if (cardType === 'american express') {
                formattedValue = formattedValue.replace(/\s/g, ''); // Remove existing spaces
                let formattedWithSpaces = '';
                for (let i = 0; i < formattedValue.length; i++) {
                    formattedWithSpaces += formattedValue[i];
                    if (i === 3 || i === 9) {
                        formattedWithSpaces += ' ';
                    }
                }
                formattedValue = formattedWithSpaces.trim();
                formattedValue = formattedValue.slice(0, 17); // Adjust the le
            } else {
                formattedValue = formattedValue.replace(/\s/g, ''); // Remove existing spaces
                let formattedWithSpaces = '';
                for (let i = 0; i < formattedValue.length; i++) {
                    formattedWithSpaces += formattedValue[i];
                    if ((i + 1) % 4 === 0) {
                        formattedWithSpaces += ' ';
                    }
                }
                formattedValue = formattedWithSpaces.trim();
                formattedValue = formattedValue.slice(0, 19);
            }

            formik.setFieldValue("cardNumber", formattedValue);

            document.querySelector('[name="cardCsv"]').maxLength = maxLength;
        } else {
            formattedValue = formattedValue.replace(/\s/g, ''); // Remove existing spaces
            let formattedWithSpaces = '';
            for (let i = 0; i < formattedValue.length; i++) {
                formattedWithSpaces += formattedValue[i];
                if ((i + 1) % 4 === 0) {
                    formattedWithSpaces += ' ';
                }
            }
            formattedValue = formattedWithSpaces.trim();
            formattedValue = formattedValue.slice(0, 19);

            formik.setFieldValue("cardNumber", formattedValue);

        }
    };


    let [err, setErr] = useState("")
    const order = () => {
        setIsLoading(true)

        const requestBody = {
            payment_method: "authorize",
            token: customToken,
            shipping_address: check ? shippingDetails : null,
            payment_details: {
                credit_card_number: formik.values.cardNumber.replace(/\s/g, ""),
                expiration_date: formik.values.cardExpiry.replace(/\s/g, ""),
                cvv: formik.values.cardCsv,
            },
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
        <Col lg="6" className="form-container-authorize">
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="12">
                        <Row className="g-4 ">
                            <Col lg="12">
                                <Label className="form-label required-label">Card Number</Label>
                                <div className="authorize-col">

                                    <input
                                        type="text"
                                        name="cardNumber"
                                        className="form-control checkout-form"
                                        placeholder="1234 1234 1234 1234"
                                        value={formik.values.cardNumber}
                                        style={{color: formik.touched.cardNumber && formik.errors.cardNumber && 'var(--theme-color)'}}
                                        onChange={handleCardNumberChange}
                                        onBlur={formik.handleBlur}
                                        inputMode="numeric"
                                        pattern={type === "american express" ? `[0-9]{4} [0-9]{6} [0-9]{5}` : `[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}`}
                                    />
                                    <img width="40" height="26" src={`/assets/images/payment-icon-auth/${
                                        type === "mastercard" ? 2 : type === "maestro" ? 3 : type === "american express" ? 5 : 1
                                    }.png`}/>
                                </div>

                                {formik.touched.cardNumber && formik.errors.cardNumber && (
                                    <span style={{color: 'var(--theme-color)'}}>{formik.errors.cardNumber}</span>
                                )}

                            </Col>
                            <Col lg="6">
                                <Label className="form-label required-label">Exp. Date</Label>
                                <input type="text" name="cardExpiry" className="form-control checkout-form"
                                       style={{color: formik.touched.cardExpiry && formik.errors.cardExpiry && 'var(--theme-color)'}}
                                       placeholder="MM / YY"
                                       value={formik.values.cardExpiry}
                                       onChange={(e) => {
                                           const input = e.target.value;
                                           const onlyNumbers = input.replace(/[^\d]/g, "");
                                           let formattedValue = "";

                                           if (onlyNumbers.length >= 2) {
                                               formattedValue = onlyNumbers.slice(0, 2);

                                               if (onlyNumbers.length >= 3) {
                                                   formattedValue += " / " + onlyNumbers.slice(2, 4);
                                               }
                                           } else {
                                               formattedValue = onlyNumbers;
                                           }

                                           formik.setFieldValue("cardExpiry", formattedValue);
                                       }}
                                       onBlur={formik.handleBlur}
                                       inputMode="numeric"
                                       pattern="\d{2} / \d{2}"
                                />
                                {formik.touched.cardExpiry && formik.errors.cardExpiry && (
                                    <span style={{color: 'var(--theme-color)'}}>{formik.errors.cardExpiry}</span>
                                )}
                            </Col>
                            <Col lg="6">
                                <Label className="form-label required-label">CSV Code</Label>
                                <input
                                    type="text"
                                    style={{color: formik.touched.cardCsv && formik.errors.cardCsv && 'var(--theme-color)'}}
                                    className="form-control checkout-form"
                                    name="cardCsv"
                                    placeholder="CVC"
                                    value={formik.values.cardCsv}
                                    onChange={(e) => {
                                        const onlyNumbers = e.target.value.replace(/[^\d]/g, "");
                                        formik.setFieldValue("cardCsv", onlyNumbers);
                                    }}
                                    onBlur={formik.handleBlur}
                                    maxLength={3}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                                {formik.touched.cardCsv && formik.errors.cardCsv && (
                                    <span style={{color: 'var(--theme-color)'}}>{formik.errors.cardCsv}</span>
                                )}
                            </Col>
                            <Col lg="12">
                                <div className="form-check p-0 custome-form-check">
                                    <input
                                        className="checkbox_animated check-it"
                                        type="checkbox"
                                        onChange={() => setIsChecked(prev => !prev)}
                                        checked={isChecked}
                                    />
                                    <p className="form-check-label" style={{marginBottom: "0"}}>
                                        I have read and agree to the website <Link href="/terms-conditions/">terms and
                                        conditions</Link> *
                                    </p>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="product-buttons" style={{flexDirection: "column"}}>
                                    <button
                                        className="btn btn-solid hover-solid btn-animation"
                                        onClick={order}
                                        disabled={
                                            !isChecked ||
                                            !formik.values.cardNumber ||
                                            !formik.values.cardExpiry ||
                                            !formik.values.cardCsv ||
                                            formik.errors.cardNumber ||
                                            formik.errors.cardExpiry ||
                                            formik.errors.cardCsv ||
                                            !checkoutDetails.name ||
                                            !checkoutDetails.email ||
                                            !checkoutDetails.phone ||
                                            !checkoutDetails.country ||
                                            !checkoutDetails.zip_code ||
                                            !checkoutDetails.city ||
                                            !checkoutDetails.address ||
                                            checkoutErrors !== 0
                                        }
                                    >
                                        Place Order
                                    </button>
                                    <span style={{color: 'var(--theme-color)', marginTop: "10px"}}>
                                        {err?.length > 0 && err}
                                        {(
                                                !formik.values.cardNumber ||
                                                !formik.values.cardExpiry ||
                                                !formik.values.cardCsv ||
                                                !checkoutDetails.name ||
                                                !checkoutDetails.email ||
                                                !checkoutDetails.phone ||
                                                !checkoutDetails.country ||
                                                !checkoutDetails.zip_code ||
                                                !checkoutDetails.city ||
                                                !checkoutDetails.address ||
                                                checkoutErrors !== 0) &&
                                            "All fields must be completed"}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Col>
    );
};

export default AuthorizeNet;