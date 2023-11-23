import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import UserNav from "./UserNav";
import {Addtocart, APICallUrl, CommonPath, ShopNow} from "../../Constant";
import {Btn} from "../../AbstractElements";
import {selectLoginToken, signOut} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {Backdrop, CircularProgress, Skeleton} from "@mui/material";

const MyAccountMainSection = () => {
    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true);
        fetch(`${APICallUrl}/api/account-inquire`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {
            setOrders(res);
            // setLoading(false);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);
                // setLoading(false);
            });
    }, [loginToken]);

    function formatMoney(amount) {
        const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);

        // Check if the formatted amount is '$0.00' and replace it with '1' if true
        return isNaN(Number(amount))
            ? <Skeleton variant="text" className="w-50 text-decoration-none m-0" style={{fontSize: "unset"}}/>
            : formattedAmount;
    }

    return (
        <section className='section-b-space'>
            <Container>
                <Row>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h2 style={{marginBottom: "16px"}}>My Account</h2>
                        {
                            window.innerWidth <= 575 ?
                                <Button onClick={() => dispatch(signOut())} style={{
                                    height: "32px",
                                    padding: "0 calc(10px + 10 * (100vw - 320px) / 1600)",
                                    border: "none",
                                    backgroundColor: "var(--theme-color)"
                                }}>Sign Out</Button>
                                : ""
                        }
                    </div>

                    <Col lg="5">
                        <Row>
                            <Col lg="12">
                                <div className="account-section-div size-180" style={{backgroundColor: "#FFD84F"}}>
                                    <div className='for-size-180'>
                                        <Link href={"my-account/my-orders"}>
                                            <img src={`${CommonPath}/my-account/1.png`}/>
                                        </Link>
                                        {/*<h4>My Orders</h4>*/}
                                    </div>
                                    <div className="for-size-180-button">
                                        <Link href={"my-account/my-orders"}>
                                            <h3 style={{color: "var(--theme-color)"}}>View Orders</h3>
                                        </Link>
                                    </div>
                                </div>
                            </Col>

                            <Col lg="6" style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}>
                                <Col lg="12">
                                    <div className="account-section-div size-150" style={{
                                        backgroundColor: "#00B6CB",

                                    }}>
                                        <div className='for-size-302'>
                                            <div className="img-div">
                                                <Link href={"my-account/account-history"}>
                                                    <img src={`${CommonPath}/my-account/5.png`}/>
                                                </Link>
                                            </div>
                                            <Link href={"my-account/account-history"}>
                                                <h3 style={{color: "white"}}>Account History</h3>
                                            </Link>
                                        </div>
                                    </div>

                                </Col>
                                <Col lg="12">
                                    <div className="account-section-div size-150" style={{
                                        backgroundColor: "#079AEF",
                                    }}>
                                        <div className="for-size-302-button">
                                            <div className="img-div">
                                                <Link href={"my-account/account-inquiry"}>
                                                    <img src={`${CommonPath}/my-account/11.png`}/>
                                                </Link>
                                            </div>
                                            <Link href={"my-account/account-inquiry"}>
                                                <h3 style={{color: "white"}}>Account Inquiry</h3>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                {/*<div className="account-section-div size-302" style={{backgroundColor: "#00B6CB"}}>*/}
                                {/*    <div className='for-size-302 pt-4 pb-4'>*/}
                                {/*        <div className="img-div">*/}
                                {/*            <img src={`${CommonPath}/my-account/5.png`}/>*/}
                                {/*        </div>*/}
                                {/*        <Link href={"my-account/account-history"} >*/}
                                {/*            <h3 style={{color: "white"}}>Account History</h3>*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*    <div className="main-div-for-300"/>*/}
                                {/*    <div className="for-size-302-button">*/}

                                {/*        <Link href={"my-account/account-inquiry"} >*/}
                                {/*        <h3 style={{color: "white"}}>Account Inquiry</h3>*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </Col>
                            <Col lg="6">
                                <div className="account-section-div size-302" style={{backgroundColor: "#A3E7ED"}}>
                                    <div className='for-size-302'>
                                        <div className="img-div">
                                            <Link href={"my-account/order-returns"}>
                                                <img src={`${CommonPath}/my-account/6.png`}/>
                                            </Link>
                                        </div>
                                        {/*<h4>Returns</h4>*/}
                                    </div>
                                    <div className="main-div-for-300"/>
                                    <div className="for-size-302-button">
                                        <Link href={"my-account/order-returns"}>
                                            <h3>Return Status</h3>
                                        </Link>
                                        {/*<h3>Start a Return</h3>*/}
                                    </div>
                                </div>
                            </Col>
                            <Col lg="12">
                                <div className="account-section-div size-180" style={{backgroundColor: "#B62427"}}>
                                    <div className='for-size-180'>
                                        <Link href={"my-account/manage-projects"}>
                                            <img src={`${CommonPath}/my-account/10.png`}/>
                                        </Link>
                                        {/*<h4 style={{color: "white"}}>My Projects</h4>*/}
                                    </div>
                                    <div className="for-size-180-button">
                                        <Link href={"my-account/manage-projects"}>
                                            <h3 style={{color: "white"}}>View Projects</h3>
                                        </Link>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="2">
                        <Row style={{
                            height: " 100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                            <Col lg="12">
                                <div className="account-section-div size-302 size-340"
                                     style={{backgroundColor: "#CACDFE"}}>
                                    <div className='for-size-302'>
                                        <div className="img-div">
                                            <Link href={"my-account/my-orders"}>
                                                <img src={`${CommonPath}/my-account/2.png`}/>
                                            </Link>
                                        </div>

                                        {/*<h4>Order Tools</h4>*/}
                                    </div>
                                    <div className="main-div-for-300"/>
                                    <div className="for-size-302-button">
                                        <Link href={"my-account/my-orders"}>
                                            <h3>My List</h3>
                                        </Link>
                                        {/*<h3>Quick Order</h3>*/}
                                        {/*<h3>Recent Purchases</h3>*/}
                                    </div>
                                </div>
                            </Col>
                            <Col lg="12">

                                <div className="account-section-div size-302 size-340"
                                     style={{backgroundColor: "#FFD84F"}}>
                                    <div className='for-size-302'>
                                        <div className="img-div">
                                            <Link href={"my-account/edit-account"}>
                                                <img src={`${CommonPath}/my-account/7.png`}/>
                                            </Link>
                                        </div>
                                        {/*<h4>Account</h4>*/}
                                    </div>
                                    <div className="main-div-for-300"/>
                                    <div className="for-size-302-button">
                                        <Link href={"my-account/edit-account"}>
                                            <h3>Account Details</h3>
                                        </Link>
                                        <Link href={"my-account/edit-address"}>
                                            <h3>Edit Address</h3>
                                        </Link>
                                        <Link href={"my-account/change-password"}>
                                            <h3>Change Password</h3>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="5">
                        <Row>
                            <Col lg="12">
                                <div className="account-section-div size-300"
                                     style={{backgroundColor: "#B62427", justifyContent: "space-between"}}>
                                    <div className="for-size-300 dNone480">
                                        <Link href={"my-account/account-inquiry"}>
                                            <img src={`${CommonPath}/my-account/3.png`} style={{maxWidth: "70px"}}/>
                                        </Link>
                                        <div>
                                            <h5 style={{color: "white"}}>Current Balance</h5>
                                            <h2 style={{
                                                color: "white",
                                                marginTop: "6px"
                                            }}>{formatMoney(Number(orders?.balanceDue))}
                                                {/*${!isNaN(Number(orders?.creditLimit)) ? formatMoney(Number(orders?.balanceDue)) : 0}*/}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="for-size-300" style={{alignItems: "center"}}>
                                        <img src={`${CommonPath}/my-account/4.png`}
                                             style={{margin: "0 auto", maxWidth: "190px", position: "absolute"}}/>
                                        <div style={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-end"
                                        }}>
                                            <div className='product-buttons'
                                                 style={{position: "relative", marginBottom: "10px"}}>
                                                <Link href={"my-account/account-inquiry"}
                                                      className='btn btn-solid hover-solid btn-animation'
                                                      style={{backgroundColor: "white", color: "var(--theme-color)"}}>
                                                    <span>Make a Payment</span>
                                                </Link>
                                            </div>
                                            <Link href={"my-account/account-inquiry"} style={{zIndex: "10"}}
                                                  className="text-center">

                                                <h5 style={{
                                                    cursor: "pointer",
                                                    color: "white",
                                                    margin: "0 auto",
                                                    textDecoration: "underline"
                                                }}>View Payment History</h5></Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="12">
                                <div className="account-section-div size-180" style={{backgroundColor: "#8FED94"}}>
                                    <div className='for-size-180'>
                                        <Link href={"specials/"}>
                                            <img src={`${CommonPath}/my-account/8.png`}/>
                                        </Link>
                                        {/*<h4>Promos</h4>*/}
                                    </div>
                                    <div className="for-size-180-button">
                                        <Link href={"specials/"}>
                                            <h3>View Promos</h3>
                                        </Link>
                                    </div>

                                </div>
                            </Col>
                            <Col lg="12">
                                <div className="account-section-div size-180" style={{backgroundColor: "#FFA451"}}>
                                    <div className='for-size-180'>
                                        <Link href={"terms-conditions/"}>
                                            <img src={`${CommonPath}/my-account/9.png`}/>
                                        </Link>
                                        {/*<h4 style={{color: "white"}}>My Projects</h4>*/}
                                    </div>
                                    <div className="for-size-180-button">
                                        {/*<h3 style={{color: "white"}}>Website Support</h3>*/}
                                        {/*<h3 style={{color: "white"}}>Orders & Invocies</h3>*/}
                                        <Link href={"terms-conditions/"}>
                                            <h3 style={{color: "white"}}>Shipping & Pickup</h3>
                                        </Link>
                                    </div>

                                </div>
                            </Col>

                        </Row>

                    </Col>

                </Row>
                {/*{loading && (*/}
                {/*    <Backdrop sx={{*/}
                {/*        // position: "absolute",*/}
                {/*        color: '#fff',*/}
                {/*        zIndex: (theme) => theme.zIndex.drawer + 2000,*/}
                {/*        backgroundColor: "rgba(255, 255, 255, 0.3)"*/}
                {/*    }} open>*/}
                {/*        <CircularProgress color="primary"/>*/}
                {/*    </Backdrop>*/}
                {/*)}*/}

            </Container>
        </section>
    );
};

export default MyAccountMainSection;