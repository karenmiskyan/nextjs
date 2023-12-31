import React, {Fragment, useEffect, useState} from 'react';
import Link from "next/link";
import {APICallUrl, NewArrival,APIImage} from "../Constant";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../ReduxToolkit/store";
import DynamicRating from "../Element/DynamicRating";
import {Button, Col, Container, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectLoginToken, toggleDivVisibility} from "../../ReduxToolkit/Slices/LoginSlice";
import {setNewCartProduct} from "../../ReduxToolkit/Slices/CartSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import SectionHeader from "../Element/SectionHeader";
import formatMoney from "../../Utils/monayFormat";

const Accessories = ({acc, addToCart, title}) => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    const loginToken = useSelector(selectLoginToken);
    const router = useRouter();
    let toLogin = () => {
        if (window.innerWidth <= 575) {
            router.push("/my-account")

        } else {
            dispatch(toggleDivVisibility(true))
        }
    }
    useEffect(() => {
        setDefImg("");
    }, []);
    const isProductNew = (creationDateStr) => {
        const currentDate = new Date();
        const creationDate = new Date(creationDateStr);

        const twoMonthsInMilliseconds = 2 * 30 * 24 * 60 * 60 * 1000;  // Assuming an average of 30 days in a month

        return currentDate - creationDate <= twoMonthsInMilliseconds;
    }
    const AddToCart = (singleProduct) => {

        fetch(`${APICallUrl}/api/add-card`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "product_id": singleProduct,
                "qty": 1
            }),
        })
            .then((res) => res.json()).then((res) => {

            if (res.error !== true) {
                dispatch(setNewCartProduct(res))
                toast.success(`Item successfully added.`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
            } else {
                toast.error(`${res?.message}`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
            }
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to Add to cart', error);
            });

    };
    return (
        <Container>

            <Row className="slide-7 product-style-1 product-wrapper justify-content-center"
                 style={{padding: "0 calc(40px + (50 - 10) * ((100vw - 320px) / (1920 - 320))) 0"}}>
                <Col>
                    <SectionHeader title={title ? title : NewArrival} subTitle={title ? title : NewArrival}/>
               <Row className="justify-content-center">
                {
                    acc?.map((elem, i) => {

                        // let count = 0;
                        // let sum = elem.reviews.reduce(function (sum, item, index) {
                        //     count += item.star;
                        //     return sum + item.star * (index + 1);
                        // }, 0);
                        return (
                            <Col lg="3" key={i}>
                                {/*{elem.id === 'vr' && (*/}
                                <div>
                                    <div className='product-box'>
                                        <div className='img-wrapper'>
                                            <div className='top-wishlist'>
                                                {elem.quantity > 0 &&
                                                    <span style={{marginRight: "4px"}}>Stock</span>}
                                                {elem?.price > elem?.front_sale_price &&
                                                    <span style={{
                                                        backgroundColor: "black",
                                                        marginRight: "4px"
                                                    }}>{((Number(elem?.price) - Number(elem?.front_sale_price)) / Number(elem?.price) * 100).toFixed()}%</span>}

                                                {isProductNew(elem.created_at) &&
                                                    <span style={{
                                                        backgroundColor: "#5C5CFF",
                                                        marginRight: "4px"
                                                    }}>New</span>}
                                                {/*<Link href={'/page/wishlist'} className='heart-wishlist wishlist'>*/}
                                                {/*  <i className='far fa-heart'></i>*/}
                                                {/*</Link>*/}
                                            </div>
                                            <Link href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}
                                                  className='text-center'>
                                                <img height="115" width="150"
                                                     src={defImg === "" ? `${APIImage}/${elem?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                     className='img-fluid'
                                                     title={elem?.name}
                                                     alt={elem?.name} key={i}/>
                                            </Link>
                                        </div>
                                        <div className='product-details'>
                                            <Link href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}
                                                  className='font-default'>
                                                <h5 style={{margin: "10px 0"}}>{elem?.name}</h5>
                                            </Link>
                                            <div style={{margin: "10px 0", height: "64px"}}>
                                                <div className='font-light ml-1'
                                                     style={{fontSize: "14px"}}># {elem?.sku} </div>
                                                <div className='font-light ml-1'
                                                     style={{fontSize: "14px"}}> # {elem?.eclipse_number}</div>
                                            </div>
                                            <ul style={{listStylePosition: "inside", margin: "10px 0"  }}>
                                                {
                                                    elem?.branch_qty === 0 &&
                                                    <li className="li-home-products" style={{display: "block"}}>Special
                                                        Order
                                                    </li>
                                                }
                                                <li className="li-home-products" style={{display: "block"}}>Free Store
                                                    Pick-up
                                                </li>
                                                <li className="li-home-products" style={{display: "block"}}>Free
                                                    Shipping $1K+ Orders
                                                </li>
                                                {
                                                    elem?.branch_qty !== 0 &&
                                                    <li style={{display: "block",height:"24px"}}></li>
                                                }
                                            </ul>
                                            <PersistGate loading={null} persistor={persistor}>
                                                {
                                                    !auth && (
                                                        <h3 className='theme-color fw-6-1' style={{ margin: '10px 0' }}>
                                                            {formatMoney(
                                                                (elem?.front_sale_price !== null || undefined) && elem?.price > elem?.front_sale_price
                                                                    ? elem?.front_sale_price.toFixed(2)
                                                                    : elem?.price.toFixed(2)
                                                            )}
                                                            {(elem?.front_sale_price !== null || undefined) && elem?.price > elem?.front_sale_price ? (
                                                                <span className='font-light ms-2 price-money-none'>{formatMoney(elem?.price.toFixed(2))}</span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </h3>
                                                    )
                                                }
                                            </PersistGate>
                                            <DynamicRating data={elem.ratingStars}/>

                                        </div>
                                        <div style={{textAlign: "center", margin: "20px 0 0"}}
                                             className="product-buttons">
                                            {/*<Btn attrBtn={{className: "m-1 btn-solid-default btn-sm"}}>*/}
                                            {/*    Buy Now*/}
                                            {/*</Btn>*/}
                                            <PersistGate loading={null} persistor={persistor}>
                                                {
                                                    !auth ?
                                                        addToCart ?
                                                            <Button onClick={() => AddToCart(elem.id)}
                                                                    style={{border: "none"}}
                                                                    className='btn btn-solid hover-solid btn-animation'>
                                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                                <span>Add to Cart</span>
                                                            </Button> :
                                                            <Link
                                                                href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}
                                                                className='btn btn-solid hover-solid btn-animation'>
                                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                                <span>Buy Now</span>
                                                            </Link> : <div
                                                            onClick={toLogin}
                                                            className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                                            <span>Login for Price</span>
                                                        </div>
                                                }
                                            </PersistGate>
                                        </div>

                                    </div>
                                </div>
                                {/*)}*/}
                            </Col>
                        );
                    })}
               </Row>

                </Col>
            </Row>
        </Container>

    );
};

export default Accessories;