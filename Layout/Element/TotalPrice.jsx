import React from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {Btn} from "../../Components/AbstractElements";
import {ProceedTOPayment, Total} from "../../Components/Constant";
import {Col, Row} from "reactstrap";
import {selectAmountCoupon, selectCoupon} from "../../ReduxToolkit/Slices/CartSlice";
import formatMoney from "../../Utils/monayFormat";

const TotalPrice = ({total}) => {
    const {symbol, currencyValue} = useSelector(
        (state) => state.CurrencyReducer
    );
    const router = useRouter();
    const amountCoupon = useSelector(selectAmountCoupon);
    const coupon = useSelector(selectCoupon);
    const redirectTo = () => {
        router.push("/cart");
    };
    return (
        <div className="cart-btn">
            {/*<h6 className="cart-total" style={{color:"black"}}>*/}
            {/*    Coupon Code: {coupon}*/}
            {/*    <span style={{*/}
            {/*        float: "right",*/}
            {/*        color: "var(--theme-color)",*/}
            {/*        display: "flex"*/}
            {/*    }}>You Save: ${amountCoupon?.toFixed(2)} </span>*/}

            {/*</h6>*/}
            <h6 className="cart-total">
                <span className="font-light">{Total}:</span> {formatMoney(Number(total) - Number(amountCoupon))}
                {
                    coupon !== "" && amountCoupon > 0 &&
                    <div style={{fontSize:"10px", margin:"6px 0"}}>
                        <span className="font-light" >Coupon Code:</span> {coupon} <span className="font-light"> You Save:</span> {formatMoney(amountCoupon)}</div>

                }

            </h6>
            <Row>
                <Col lg="6" md='6' sm="6">
                    <Btn
                        attrBtn={{
                            type: "button",
                            className: "btn-solid-default btn-block",
                            onClick: () => router.push("/cart"),
                        }}
                    >
                        Cart
                    </Btn>
                </Col>
                <Col lg="6" md='6' sm="6">
                    <Btn
                        attrBtn={{
                            type: "button",
                            className: "btn-solid-default btn-block",
                            onClick: () => router.push("/checkout"),
                        }}
                    >
                        Checkout
                    </Btn>
                </Col>
            </Row>


        </div>
    );
};
export default TotalPrice;
