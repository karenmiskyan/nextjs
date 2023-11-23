import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Form, Input, InputGroup, Label, Row} from 'reactstrap';
import {getAPIData} from '../../../Utils';
import {Btn} from '../../AbstractElements';
import {APICallUrl,image_api, CommonPath, EXAMPLECODE, Promocode, Redeem, TotalUSD, Yourcart} from '../../Constant';
import TotalPrice from './TotalPrice';
import {selectAmountCoupon, selectCart, selectTotal} from "../../../ReduxToolkit/Slices/CartSlice";
import Shipping from "../Cart/Shipping";
import Link from "next/link";
import Coupon from "../Cart/coupon";
import {
    setShippingSing,
    setShippingThree,
    setShippingTwo,
    shippingSing,
    shippingThree,
    shippingTwo
} from "../../../ReduxToolkit/Slices/LoginSlice";
import useWindowDimensions from "../../../Utils/useWindowDimensions";
import {Backdrop, CircularProgress} from "@mui/material";


const SideBarCartBox = ({
                            lod,
                            zip,
                            loading, tax,
                            checkout,
                            local_part_1,
                            local_part_2,
                            local_part_3,
                            address,
                            setAddress,
                            address2,
                            address3,
                            setAddress2,
                            setAddress3
                        }) => {

    const [cartData, setCartData] = useState([]);
    const {product, quantity} = useSelector((state) => state.AddToCartReducer);

    const {part_1, part_2, part_3} = checkout;
    const dispatch = useDispatch();

    const selectedShipping = useSelector(shippingSing);
    const selectedShippingTwo = useSelector(shippingTwo);
    const selectedShippingThree = useSelector(shippingThree);
    const [showPickUp, setShowPickUp] = useState(false);
    const [showPickUp2, setShowPickUp2] = useState(false);
    const [showPickUp3, setShowPickUp3] = useState(false);
    const {width} = useWindowDimensions();


    return (
        //     <li>
        //         <p>Loading...</p>
        //     </li> :
        // <li>
        //     <p>Your cart empty.</p>
        // </li>
        <Row>
            <Col lg="12" className="mb-3">
                <h3 className='d-flex text-capitalize'>
                    Order Summary
                    {/*<span className='badge bg-theme new-badge rounded-pill ms-auto bg-dark'>{cartData?.length}</span>*/}
                </h3>
            </Col>


            <Col lg="8" >
                {
                    !lod ?
                        <Row className="g-4">
                            {
                                part_1?.products?.length > 0 &&
                                <Col lg='12' className="your-cart-box-col">
                                    <Row className='your-cart-box cart-table'>
                                        <Col lg="7">
                                            <ul style={{
                                                display: "grid", gap: "20px",
                                                borderRight: width > 991 ? "1px solid #eff2f7" : "none"
                                            }}>
                                                {(
                                                    part_1?.products?.map((elem, i) => {
                                                        return (
                                                            <li className='list-group-item list-group-item-1 lh-condensed'
                                                                key={i}>
                                                                <Row className="g-3  w-100 pb-2"
                                                                     style={{borderTop: i !== 0 ? "1px solid #eff2f7" : ""}}>
                                                                    <Col lg="3"
                                                                         className="align-items-center d-flex justify-content-center">
                                                                        <Link
                                                                            href={`/${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                                                            {/*<div className='checkout-image'>*/}
                                                                            <img
                                                                                style={{maxWidth: "100px"}}
                                                                                src={`${image_api}/${elem?.product?.image}`}
                                                                                alt={elem?.product?.name}
                                                                                title={elem?.product?.name}
                                                                                className='img-fluid'/>
                                                                            {/*</div>*/}
                                                                        </Link>
                                                                    </Col>
                                                                    <Col lg="9">
                                                                        <div style={{display: "grid", gap: "10px"}}>
                                                                            <Link
                                                                                href={`/${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                                                                <h5 className='my-0 fw-bold'
                                                                                    style={{color: "black"}}>{elem?.product?.name}</h5>
                                                                            </Link>
                                                                            <p style={{marginBottom: "0"}}>QTN: {elem?.qty}</p>
                                                                            <span style={{
                                                                                marginLeft: "0",
                                                                                color: "black"
                                                                            }}
                                                                                  className="fw-bold">${(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ? (elem?.product?.front_sale_price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2) : (elem?.product?.price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2)}
                                                                                {(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ?
                                                                                    <span style={{paddingLeft: "8px"}}><del
                                                                                        style={{
                                                                                            color: "var(--theme-color)",
                                                                                            fontSize: "12px"
                                                                                        }}>${(elem?.product?.price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2)}</del></span> : ""}</span>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </li>

                                                        );
                                                    })
                                                )}
                                            </ul>
                                        </Col>

                                        {
                                            part_1?.products?.length > 0 &&
                                            <Col lg="5" className="top-details shipping-info-for-cart">
                                                <h6 className='fw-bold '
                                                    style={width > 991 ? {
                                                        paddingBottom: "12px",
                                                        marginBottom: "20px",
                                                        borderBottom: "1px solid #eff2f7",

                                                    } : {
                                                        paddingTop: "12px",
                                                        marginTop: "20px",
                                                        borderTop: "1px solid #eff2f7"
                                                    }}>
                                                    Shipping: </h6>
                                                <ul style={{display: "grid"}}>
                                                    {
                                                        part_1?.shippingMethods?.length > 0 && part_1?.shippingMethods?.map((el, i) => {
                                                            const handleCheckboxChange = () => {
                                                                dispatch(setShippingSing(el)); // Update the selected shipping option
                                                            };
                                                            const isChecked = selectedShipping?.id === el.id;
                                                            return (
                                                                <li key={i}>
                                                                    <div
                                                                        className='form-check p-0 custome-form-check'>
                                                                        <input
                                                                            className='checkbox_animated check-it'
                                                                            type='checkbox' style={{top: "-2px"}}
                                                                            checked={isChecked}
                                                                            onChange={handleCheckboxChange}
                                                                        />
                                                                        <Label className='form-check-label'
                                                                               style={{marginBottom: "0"}}>
                                                                            {el?.name}:
                                                                            ${Number(el?.price)?.toFixed(2)}</Label>
                                                                        {/*<p className='font-light'>(25)</p>*/}
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                {
                                                    selectedShipping?.shipping_method === "local_pickup" &&
                                                    <>
                                                        {!showPickUp ?
                                                            <h6 className='fw-normal pt-3' style={{color: "#969696"}}>
                                                                Shipping to: <span className="fw-bold"
                                                                                   style={{color: "black"}}>
                                                    {local_part_1.map(el => {
                                                        if (el.id === Number(address)) {
                                                            return el.title
                                                        }

                                                    })}</span>
                                                                <div className="fw-normal " style={{
                                                                    cursor: "pointer",
                                                                    textAlign: "end",
                                                                    padding: "8px 0",
                                                                    color: "var(--theme-color)",
                                                                    textDecoration: "underline"
                                                                }}><a onClick={() => setShowPickUp(true)}>Change
                                                                    Address</a>
                                                                </div>
                                                            </h6>
                                                            :
                                                            <h6 className='fw-normal pt-3' style={{color: "#969696"}}>
                                                                <select
                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                    className='form-select custome-form-select checkout-form'
                                                                    value={address}
                                                                    name="reason">
                                                                    {/*<option disabled value="def">Choose</option>*/}
                                                                    {local_part_1.map((elem, i) => {
                                                                        return <option key={i}
                                                                                       value={elem.id}>{elem?.title}</option>;
                                                                    })}
                                                                </select>
                                                                <div className="fw-normal " style={{
                                                                    cursor: "pointer",
                                                                    textAlign: "end",
                                                                    padding: "8px 0",
                                                                    color: "var(--theme-color)",
                                                                    textDecoration: "underline"
                                                                }}><a onClick={() => setShowPickUp(false)}>Save</a>
                                                                </div>
                                                            </h6>
                                                        }
                                                    </>
                                                }
                                            </Col>
                                        }

                                    </Row>
                                </Col>
                            }

                            {
                                part_2?.products?.length > 0 &&
                                <Col lg='12' className="your-cart-box-col">
                                    <Row className='your-cart-box cart-table'>
                                        <Col lg="7">
                                            <ul style={{
                                                display: "grid", gap: "20px",
                                                borderRight: width > 991 ? "1px solid #eff2f7" : "none"
                                            }}>
                                                {(
                                                    part_2?.products?.map((elem, i) => {
                                                        return (
                                                            <li className='' key={i}>
                                                                <Row className="g-3 w-100 pb-2"
                                                                     style={{borderTop: i !== 0 ? "1px solid #eff2f7" : ""}}>
                                                                    <Col lg="3"
                                                                         className="align-items-center d-flex justify-content-center">
                                                                        <Link
                                                                            href={`/${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>

                                                                            <img
                                                                                style={{maxWidth: "100px"}}
                                                                                src={`${image_api}/${elem?.product?.image}`}
                                                                                alt={elem?.product?.name}
                                                                                title={elem?.product?.name}
                                                                                className='img-fluid'/>

                                                                        </Link>
                                                                    </Col>
                                                                    <Col lg="9">
                                                                        <div style={{display: "grid", gap: "10px"}}>
                                                                            <Link
                                                                                href={`/${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                                                                <h5 className='my-0 fw-bold'
                                                                                    style={{color: "black"}}>{elem?.product?.name}</h5>
                                                                            </Link>
                                                                            <p style={{marginBottom: "0"}}>QTN: {elem?.qty}</p>
                                                                            <span style={{
                                                                                marginLeft: "0",
                                                                                color: "black"
                                                                            }}
                                                                                  className="fw-bold">${(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ? (elem?.product?.front_sale_price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2) : (elem?.product?.price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2)}
                                                                                {(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ?
                                                                                    <span style={{paddingLeft: "8px"}}><del
                                                                                        style={{
                                                                                            color: "var(--theme-color)",
                                                                                            fontSize: "12px"
                                                                                        }}>${(elem?.product?.price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2)}</del></span> : ""}</span>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </li>
                                                        );
                                                    })
                                                )}
                                            </ul>
                                        </Col>
                                        {
                                            part_2?.products?.length > 0 &&

                                            <Col className="top-details shipping-info-for-cart">
                                                <h6 className='fw-bold '
                                                    style={width > 991 ? {
                                                        paddingBottom: "12px",
                                                        marginBottom: "20px",
                                                        borderBottom: "1px solid #eff2f7",

                                                    } : {
                                                        paddingTop: "12px",
                                                        marginTop: "20px",
                                                        borderTop: "1px solid #eff2f7"
                                                    }}>
                                                    Shipping: </h6>
                                                <ul>
                                                    {
                                                        part_2?.shippingMethods?.length > 0 && part_2?.shippingMethods?.map((el, i) => {
                                                            const handleCheckboxChange = () => {
                                                                dispatch(setShippingTwo(el)); // Update the selected shipping option
                                                            };
                                                            const isChecked = selectedShippingTwo?.id === el.id;
                                                            return (
                                                                <li key={i}>
                                                                    <div className='form-check p-0 custome-form-check'>
                                                                        <input
                                                                            className='checkbox_animated check-it'
                                                                            type='checkbox' style={{top: "-2px"}}
                                                                            checked={isChecked}
                                                                            onChange={handleCheckboxChange}
                                                                        />
                                                                        <Label className='form-check-label'
                                                                               style={{marginBottom: "0"}}>
                                                                            {el?.name}:
                                                                            ${Number(el?.price).toFixed(2)}</Label>
                                                                        {/*<p className='font-light'>(25)</p>*/}
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }

                                                </ul>

                                                {
                                                    selectedShippingTwo?.shipping_method === "local_pickup" &&
                                                    <>
                                                        {!showPickUp2 ?
                                                            <h6 className='fw-normal pt-3' style={{color: "#969696"}}>
                                                                Shipping to: <span className="fw-bold"
                                                                                   style={{color: "black"}}>
                                                    {local_part_2.find(el => el.id === Number(address2))?.title}</span>
                                                                <div className="fw-normal " style={{
                                                                    cursor: "pointer",
                                                                    textAlign: "end",
                                                                    padding: "8px 0",
                                                                    color: "var(--theme-color)",
                                                                    textDecoration: "underline"
                                                                }}><a onClick={() => setShowPickUp2(true)}>Change
                                                                    Address</a>
                                                                </div>
                                                            </h6>
                                                            :
                                                            <h6 className='fw-normal pt-3' style={{color: "#969696"}}>
                                                                <select
                                                                    onChange={(e) => setAddress2(e.target.value)}
                                                                    className='form-select custome-form-select checkout-form'
                                                                    value={address2}
                                                                    name="reason">
                                                                    {/*<option disabled value="def">Choose</option>*/}
                                                                    {local_part_2.map((elem, i) => {
                                                                        return <option key={i}
                                                                                       value={elem.id}>{elem?.title}</option>;
                                                                    })}
                                                                </select>
                                                                <div className="fw-normal " style={{
                                                                    cursor: "pointer",
                                                                    textAlign: "end",
                                                                    padding: "8px 0",
                                                                    color: "var(--theme-color)",
                                                                    textDecoration: "underline"
                                                                }}><a onClick={() => setShowPickUp2(false)}>Save</a>
                                                                </div>
                                                            </h6>
                                                        }
                                                    </>
                                                }
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                            }
                            {
                                part_3?.products?.length > 0 &&
                                <Col lg='12' className="your-cart-box-col">
                                    <Row className='your-cart-box cart-table'>
                                        <Col lg="7">
                                            <ul style={{
                                                display: "grid", gap: "20px",
                                                borderRight: width > 991 ? "1px solid #eff2f7" : "none"
                                            }}>
                                                {(
                                                    part_3?.products?.map((elem, i) => {
                                                        return (
                                                            <li key={i}>
                                                                <Row className="g-3 w-100 pb-2"
                                                                     style={{borderTop: i !== 0 ? "1px solid #eff2f7" : ""}}>
                                                                    <Col lg="3"
                                                                         className="align-items-center d-flex justify-content-center">
                                                                        <Link
                                                                            href={`/${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                                                            {/*<div className='checkout-image'>*/}
                                                                            <img width="100" height="100"
                                                                                 style={{maxWidth: "100px"}}
                                                                                 src={`${image_api}/${elem?.product?.image}`}
                                                                                 alt={elem?.product?.name}
                                                                                 title={elem?.product?.name}
                                                                                 className='img-fluid'/>
                                                                            {/*</div>*/}
                                                                        </Link>
                                                                    </Col>
                                                                    <Col lg="9">
                                                                        <div style={{display: "grid", gap: "10px"}}>
                                                                            <Link
                                                                                href={`/${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                                                                <h5 className='my-0 fw-bold'
                                                                                    style={{color: "black"}}>{elem?.product?.name}</h5>
                                                                            </Link>
                                                                            <p style={{marginBottom: "0"}}>QTN: {elem?.qty}</p>
                                                                            <span style={{
                                                                                marginLeft: "0",
                                                                                color: "black"
                                                                            }}
                                                                                  className="fw-bold">${(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ? (elem?.product?.front_sale_price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2) : (elem?.product?.price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2)}
                                                                                {(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ?
                                                                                    <span style={{paddingLeft: "8px"}}><del
                                                                                        style={{
                                                                                            color: "var(--theme-color)",
                                                                                            fontSize: "12px"
                                                                                        }}>${(elem?.product?.price * (elem?.qty > elem.product.quantity && elem.product.quantity !== 0 ? elem.product.quantity : elem?.qty)).toFixed(2)}</del></span> : ""}</span>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </li>


                                                        );
                                                    })
                                                )}
                                            </ul>
                                        </Col>

                                        {
                                            part_3?.products?.length > 0 &&
                                            <Col lg="5" className="top-details shipping-info-for-cart">
                                                <h6 className='fw-bold'
                                                    style={width > 991 ? {
                                                        paddingBottom: "12px",
                                                        marginBottom: "20px",
                                                        borderBottom: "1px solid #eff2f7",

                                                    } : {
                                                        paddingTop: "12px",
                                                        marginTop: "20px",
                                                        borderTop: "1px solid #eff2f7"
                                                    }}>
                                                    Shipping:
                                                </h6>
                                                <ul>
                                                    {
                                                        part_3?.shippingMethods?.length > 0 && part_3?.shippingMethods?.map((el, i) => {
                                                            const handleCheckboxChange = () => {
                                                                dispatch(setShippingThree(el)); // Update the selected shipping option
                                                            };
                                                            const isChecked = selectedShippingThree?.id === el.id;
                                                            return (
                                                                <li key={i}>
                                                                    <div className='form-check p-0 custome-form-check'>
                                                                        <input
                                                                            className='checkbox_animated check-it'
                                                                            type='checkbox' style={{top: "-2px"}}
                                                                            checked={isChecked}
                                                                            onChange={handleCheckboxChange}
                                                                        />
                                                                        <Label className='form-check-label'
                                                                               style={{marginBottom: "0"}}>
                                                                            {el?.name}:
                                                                            ${Number(el?.price)?.toFixed(2)}</Label>
                                                                        {/*<p className='font-light'>(25)</p>*/}
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }

                                                </ul>
                                                {
                                                    selectedShippingThree?.shipping_method === "local_pickup" &&
                                                    <>
                                                        {!showPickUp3 ?
                                                            <h6 className='fw-normal pt-3' style={{color: "#969696"}}>
                                                                Shipping to: <span className="fw-bold"
                                                                                   style={{color: "black"}}>
                                                    {local_part_3.find(el => el.id === Number(address3))?.title}</span>
                                                                <div className="fw-normal " style={{
                                                                    cursor: "pointer",
                                                                    textAlign: "end",
                                                                    padding: "8px 0",
                                                                    color: "var(--theme-color)",
                                                                    textDecoration: "underline"
                                                                }}><a onClick={() => setShowPickUp3(true)}>Change
                                                                    Address</a>
                                                                </div>
                                                            </h6>
                                                            :
                                                            <h6 className='fw-normal pt-3' style={{color: "#969696"}}>
                                                                <select
                                                                    onChange={(e) => setAddress3(e.target.value)}
                                                                    className='form-select custome-form-select checkout-form'
                                                                    value={address3}
                                                                    name="reason">
                                                                    {/*<option disabled value="def">Choose</option>*/}
                                                                    {local_part_3.map((elem, i) => {
                                                                        return <option key={i}
                                                                                       value={elem.id}>{elem?.title}</option>;
                                                                    })}
                                                                </select>
                                                                <div className="fw-normal" style={{
                                                                    cursor: "pointer",
                                                                    textAlign: "end",
                                                                    padding: "8px 0",
                                                                    color: "var(--theme-color)",
                                                                    textDecoration: "underline"
                                                                }}><a onClick={() => setShowPickUp3(false)}>Save</a>
                                                                </div>
                                                            </h6>
                                                        }
                                                    </>
                                                }
                                                {/*<Shipping zip={zip} arr={part_3} title={3}/>*/}
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                            }
                        </Row>
                        :
                        <Col lg='12' className="your-cart-box-col">
                            <Row className='your-cart-box cart-table position-relative' style={{height:"256px"}}>
                                <Backdrop sx={{
                                    color: '#fff',
                                    position: "absolute",
                                    zIndex: (theme) => theme.zIndex.drawer + 1,
                                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                                }} open>
                                    <CircularProgress color="primary"/>
                                </Backdrop>
                            </Row>
                        </Col>
                }
            </Col>
            <Col lg="4" className={`${width > 991 ? "" : "mt-4"}`}>
                <TotalPrice color="#EFF2F7" pos="sticky" tax={tax}/>
            </Col>
        </Row>
    );
};

export default SideBarCartBox;
