import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Container, Form, Input, Label, Row} from 'reactstrap';
import {deleteProduct, getAPIData} from '../../../Utils';
import {Btn} from '../../AbstractElements';
import {
    Addtocart, APICallUrl,
    ApplyCoupon,
    CartTotals,
    clearallitems,
    ContinueShopping,
    ConvenienceFee,
    CouponDiscount,
    ProcessCheckout,
    TotalMRP
} from '../../Constant';
import BottomContain from './BottomContain';
import CartData from './CartData';
import CounterCart from './CounterCart';
import ProductActions from "../../Products/Product4ImageContain/ProductActions";
import ElectronicVR from "../../ElectronicDemo/ElectronicVR";
import {
    selectAmountCoupon,
    selectCart, selectCoupon,
    selectSellTotal,
    selectTotal,
    setCart,
    setCoupon,
    setLoadingCart, setLoadingDelete
} from "../../../ReduxToolkit/Slices/CartSlice";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import Shipping from "./Shipping";
import Coupon from "./coupon";
import {Backdrop, CircularProgress} from "@mui/material";
import formatMoney from "../../../Utils/monayFormat";

const ProductCart = ({loading, zIndex}) => {

    const amountCoupon = useSelector(selectAmountCoupon);
    const cart = useSelector(selectCart);
    const total = useSelector(selectTotal);
    const sellTotal = useSelector(selectSellTotal);
    const router = useRouter();

    return (
        <section className='cart-section section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Row>
                    {cart.length > 0 ? (
                            <>
                                {/*<CounterCart />*/}
                                <CartData/>
                                <Col xl='5' xxl='4' className='ms-auto cart-checkout-section top-cart-elements'>
                                    <div className='cart-box' >
                                        <div className='cart-box-details'>
                                            <div className='total-details'>
                                                <div className='top-details' style={{borderBottom: "none"}}>
                                                    <h3>Order Summary</h3>
                                                    {/*<h6>{CouponDiscount} <span>-$25.00</span></h6>*/}
                                                    {/*<h6>{ConvenienceFee}<span><del>$25.00</del></span></h6>*/}
                                                    {/*<h6 className='fw-bold'>*/}
                                                    {/*    Subtotal: <span>${total.toFixed(2)}</span>*/}
                                                    {/*</h6>*/}
                                                    {/*<Shipping/>*/}
                                                    <Coupon/>
                                                    <h2 className='fw-bold' style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "20px 0"
                                                    }}>
                                                        Total:
                                                        <div className="total-cart-details">
                                                            {
                                                                Number(sellTotal) !== 0 &&
                                                                <span className="fw-normal red-font-size"
                                                                      style={{color: "var(--theme-color)"}}>Save {formatMoney(Number(sellTotal) - Number(total) - Number(amountCoupon || 0))}</span>
                                                            }
                                                            <span className="fw-bold" style={{
                                                                display: "flex",
                                                                justifyContent: "end",
                                                                color: "black",
                                                                marginLeft: "8px"
                                                            }}>{formatMoney(Number(total)- Number(amountCoupon||0))}</span>
                                                        </div>
                                                    </h2>
                                                    <div>
                                                        <div className='product-buttons'>
                                                            {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                                            <Link href={'/shop'}
                                                                  className='btn btn-solid btn-transparent hover-solid btn-animation'>
                                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                                <span>Continue Shopping</span>
                                                            </Link>
                                                        </div>
                                                        <div className='product-buttons'>
                                                            {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                                            <Link href={'/checkout'}
                                                                  className='btn btn-solid hover-solid btn-animation'>
                                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                                <span>Checkout</span>
                                                            </Link>

                                                        </div>
                                                    </div>
                                                    {/*<div className='bottom-details'>*/}
                                                    {/*    <Link href={'/page/checkout'}>{ProcessCheckout}</Link>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            </>
                        ) :
                        !loading &&
                        <Col xs='12'>
                            <div className='empty-box text-center'>
                                <img src='/assets/images/cartEmpty.png' className='img-fluid mb-sm-4 mb-3'
                                     alt='empty cart'/>
                                <div className='w-100'>
                                    <h5 className='mb-3 font-dark'>Your shopping cart is empty. Let's add something to
                                        it</h5>
                                    <Btn attrBtn={{
                                        className: 'btn-solid-default',
                                        onClick: () => router.push('/shop')
                                    }}>{ContinueShopping}</Btn>
                                </div>
                            </div>
                        </Col>
                    }
                    {loading &&  cart.length === 0 && (
                        <Backdrop sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + zIndex,
                            backgroundColor: "rgba(255, 255, 255, 0.3)"
                        }} open>
                            <CircularProgress color="primary"/>
                        </Backdrop>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default ProductCart;
