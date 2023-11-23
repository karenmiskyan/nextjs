import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TotalUSD} from '../../Constant';
import {selectAmountCoupon, selectCart, selectCoupon, selectTotal} from "../../../ReduxToolkit/Slices/CartSlice";
import Coupon from "../Cart/coupon";
import {shippingSing, shippingThree, shippingTwo} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Btn} from "../../AbstractElements";
import formatMoney from "../../../Utils/monayFormat";

const TotalPrice = ({color, pos, coupon, tax}) => {
    const selectedShipping = useSelector(shippingSing);
    const selectedShippingTwo = useSelector(shippingTwo);
    const selectedShippingThree = useSelector(shippingThree);
    const cart = useSelector(selectCart);
    const total = useSelector(selectTotal);
    const amountCoupon = useSelector(selectAmountCoupon);
    const c = useSelector(selectCoupon);

    function formatPrice(price) {
        return `$${Number(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }

    return (
        <div style={{padding: "20px", backgroundColor: color, borderRadius: "8px", position: pos, top: "140px"}}>
            {
                !coupon &&
                <div className="top-details">
                    {/*<Shipping zip={zip}/>*/}
                    <Coupon/>
                </div>
            }

            <div
                style={{
                    padding: "15px calc(15px + 10 * (100vw - 991px) / 929)",
                    display: "grid",
                    gridGap: "10px"
                }}>
                {cart.length === 0 || cart.length === undefined ?
                    "" :
                    <div
                        className='list-group-item d-flex lh-condensed justify-content-between align-items-center'>
                        <span className='fw-normal'>Subtotal ({cart?.length} items):</span>
                        <span>{formatMoney((Number(total) - Number(amountCoupon)))}</span>
                    </div>
                }
                <div
                    className='list-group-item d-flex lh-condensed justify-content-between align-items-center'>
                    <span className='fw-normal'>Shipping:</span>
                    <span>{formatPrice(Number(selectedShipping.price || 0) + Number(selectedShippingTwo.price || 0) + Number(selectedShippingThree.price || 0))}</span>
                </div>

                <div
                    className='list-group-item d-flex lh-condensed justify-content-between align-items-center'>
                    <span className='fw-normal'>Tax:</span>
                    <span>{formatPrice(Number(total) * Number(tax?.tax) / 100)}</span>
                </div>
                {
                    c !== "" && amountCoupon > 0 &&
                    <div className='list-group-item d-flex lh-condensed justify-content-between align-items-center'>
                        <span className='fw-normal'>Coupon save: </span>
                        <span>{formatMoney(amountCoupon)}</span>
                    </div>
                }
                <div
                    className='list-group-item d-flex lh-condensed justify-content-between align-items-center'>
                    <h3 className='fw-bold'>Total</h3>
                    <strong>{formatMoney((Number(total) - Number(amountCoupon)) + Number(selectedShipping.price || 0) + Number(selectedShippingTwo.price || 0) + Number(selectedShippingThree.price || 0) + (Number(total) * Number(tax?.tax) / 100))}</strong>
                </div>
            </div>
        </div>
    );
};

export default TotalPrice;
