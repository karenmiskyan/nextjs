import Link from 'next/link';
import React from 'react';
import {Col} from 'reactstrap';
import {APICallUrl,APIImage} from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import {useSelector} from "react-redux";
import {selectAuth} from "../../../ReduxToolkit/Slices/LoginSlice";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../../ReduxToolkit/store";
import formatMoney from "../../../Utils/monayFormat";
import Image from "next/image";

const LeftTab = ({elem, LeftRightTab, defImg, isProductNew}) => {

        let auth = useSelector(selectAuth);


        return (
            <Col lg='4' md='6'>
                <div className='product-list'>
                    {elem?.map((result, i) => {

                        let count = 0;
                        let sum = result.reviews.reduce(function (sum, item, index) {
                            count += item.star;
                            return sum + item.star * (index + 1);
                        }, 0);
                        return (
                            <div className={`${LeftRightTab ? LeftRightTab : 'product-box product-box1'}`} key={i}>
                                <div className='img-wrapper bg-transparent'>
                                    <div className='top-wishlist'>
                                        {result.quantity > 0 &&
                                            <span style={{marginRight: "4px"}}>Stock</span>}
                                        {result?.price > result?.front_sale_price &&
                                            <span style={{
                                                backgroundColor: "black",
                                                marginRight: "4px"
                                            }}>{((Number(result?.price) - Number(result?.front_sale_price)) / Number(result?.price) * 100).toFixed()}%</span>}

                                        {isProductNew(result.created_at) &&
                                            <span style={{
                                                backgroundColor: "#5C5CFF",
                                                marginRight: "4px"
                                            }}>New</span>}
                                        {/*<Link href={'/page/wishlist'} className='heart-wishlist wishlist'>*/}
                                        {/*  <i className='far fa-heart'></i>*/}
                                        {/*</Link>*/}
                                    </div>
                                    <Link href={`/${result?.slugable?.prefix}/${result?.slugable?.key}`}
                                          className='text-center'>
                                        <Image width="90" height="120"
                                             loading="lazy"
                                            // src={imageLoaded ? `${APICallUrl}/storage/${result.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                             src={defImg === "" ? `${APIImage}/${result.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                             className='img-fluid'
                                             alt={result?.name} title={result?.name}/>
                                    </Link>
                                    <div className='circle-shape'></div>
                                </div>
                                <div className='product-details'>
                                    <PersistGate loading={null} persistor={persistor}>
                                        {!auth && (
                                            <h3 className='theme-color'>
                                                {formatMoney(
                                                    (result?.front_sale_price !== null || undefined) && result?.price > result?.front_sale_price
                                                        ? result?.front_sale_price
                                                        : result?.price
                                                )}
                                                {(result?.front_sale_price !== null || undefined) && result?.price > result?.front_sale_price ? (
                                                    <span
                                                        className='font-light ms-2 price-money-none'>{formatMoney(result?.price)}</span>
                                                ) : (
                                                    ''
                                                )}
                                            </h3>
                                        )}
                                    </PersistGate>

                                    <Link href={`/${result?.slugable?.prefix}/${result?.slugable?.key}`}
                                          className='font-default'>
                                        <h5>{result?.name}</h5>
                                    </Link>
                                    <DynamicRating data={Math.round(sum / count)}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Col>
        );
    }
;

export default LeftTab;
