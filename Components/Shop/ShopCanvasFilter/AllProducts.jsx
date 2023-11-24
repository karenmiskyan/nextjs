import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {APICallUrl, CommonPath, APIImage} from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import SkeletonLoader from '../../Element/SkeletonLoader';
import {Btn} from "../../AbstractElements";
import {selectAuth, toggleDivVisibility} from "../../../ReduxToolkit/Slices/LoginSlice";
import {selectLoading, setLoading} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import formatMoney from "../../../Utils/monayFormat";

const AllProducts = ({currentData, defImg}) => {
        const {initialGrid} = useSelector((state) => state.AllGridReducer);
        const dispatch = useDispatch();
        const auth = useSelector(selectAuth);
        const router = useRouter();
        const isLoading = useSelector(selectLoading);

        let toLogin = () => {
            if (window.innerWidth <= 575) {
                router.push("/my-account")

            } else {
                dispatch(toggleDivVisibility(true))
            }
        }

        const isProductNew = (creationDateStr) => {
            const currentDate = new Date();
            const creationDate = new Date(creationDateStr);

            const twoMonthsInMilliseconds = 2 * 30 * 24 * 60 * 60 * 1000;  // Assuming an average of 30 days in a month

            return currentDate - creationDate <= twoMonthsInMilliseconds;
        }
        return (
            <div
                className={`row g-sm-4 g-3 gx-sm-4 gx-3 mt-1 row-cols-1 row-cols-sm-2 row-cols-xl-4 custom-gy-5 product-style-2 ratio_asos product-list-section ${initialGrid}`}>
                {currentData?.map((elem) => {

                    return (
                        <Fragment key={elem.id}>

                            {isLoading ? (
                                <SkeletonLoader/>
                            ) : (
                                <div className="product-style-1" style={{padding: "0"}}>
                                    <div className='product-box'
                                         style={{backgroundColor: "white", padding: "16px", borderRadius: "20px"}}>
                                        <div className='img-wrapper' style={{
                                            display: "flex",
                                            alignItems: "center",
                                            backgroundColor: "white"
                                        }}>
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
                                                  style={{
                                                      margin: "0 auto",
                                                      display: "flex",
                                                      alignItems: "flex-end",
                                                      minHeight: "160px",
                                                  }}
                                                  className='text-center'>
                                                <img width="160" height="160"
                                                     src={defImg === "" ? `${APIImage}/${elem?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                     style={{maxHeight: "160px", maxWidth: "160px", objectFit: 'contain'}}
                                                     className='bg-img'
                                                     alt={elem?.name} title={elem?.name}
                                                />
                                            </Link>
                                        </div>

                                        <div className='product-details'>
                                            <Link href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}
                                                  className='font-default'>
                                                <h5 style={{margin: "10px 0"}}>{elem.name}</h5>
                                            </Link>
                                            <div style={{margin: "10px 0", height: "64px"}}>
                                                <div className='font-light ml-1'
                                                     style={{fontSize: "14px"}}># {elem?.sku}</div>
                                                <div className='font-light ml-1'
                                                     style={{fontSize: "14px"}}># {elem?.eclipse_number}</div>
                                            </div>
                                            <ul style={{listStylePosition: "inside", margin: "10px 0"}}>
                                                {
                                                    elem?.branch_qty === 0 &&
                                                    <li className="li-home-products" style={{display: "block"}}>Special
                                                        Order
                                                    </li>
                                                }
                                                <li className="li-home-products" style={{display: "block"}}>Free
                                                    Store Pick-up
                                                </li>
                                                <li className="li-home-products" style={{display: "block"}}>Free
                                                    Shipping $1K+ Orders
                                                </li>
                                                {
                                                    elem?.branch_qty !== 0 &&
                                                    <li style={{display: "block", height: "24px"}}></li>
                                                }
                                            </ul>

                                            {!auth && (
                                                <h3 className='theme-color fw-6-1' style={{margin: "10px 0"}}>
                                                    {formatMoney(
                                                        (elem?.front_sale_price !== null || undefined) && elem?.price > elem?.front_sale_price
                                                            ? elem?.front_sale_price
                                                            : elem?.price
                                                    )}
                                                    {(elem?.front_sale_price !== null || undefined) && elem?.price > elem?.front_sale_price ? (
                                                        <span className='font-light ms-2'>{formatMoney(elem?.price)}</span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </h3>
                                            )}
                                            <DynamicRating data={elem?.ratingStars}/>
                                            <div style={{textAlign: "center", margin: "20px 0 0"}}
                                                 className="product-buttons">
                                                {
                                                    !auth ?
                                                        <Link href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}
                                                              className='btn btn-solid hover-solid btn-animation'>
                                                            {/*<i className='fa fa-shopping-cart'></i>*/}
                                                            Buy Now
                                                        </Link> : <div
                                                            onClick={toLogin}
                                                            className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                                            <span>Login for Price</span>
                                                        </div>
                                                }
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            )}
                        </Fragment>
                    );
                })}
            </div>
        );
    }
;

export default AllProducts;
