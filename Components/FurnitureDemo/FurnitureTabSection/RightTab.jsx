import Link from 'next/link';
import React from 'react';
import {useSelector} from 'react-redux';
import {Col} from 'reactstrap';
import {image_api} from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import {selectAuth} from "../../../ReduxToolkit/Slices/LoginSlice";
import {persistor} from "../../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";
import formatMoney from "../../../Utils/monayFormat";

const RightTab = ({elem, LeftRightTab, defImg, isProductNew}) => {
        let auth = useSelector(selectAuth);
        return (
            <>
                <Col lg='4' md='6'>
                    <div className='product-list'>
                        {elem?.map((item, i) => {
                            let count = 0;
                            let sum = item.reviews.reduce(function (sum, item, index) {
                                count += item.star;
                                return sum + item.star * (index + 1);
                            }, 0);
                            return (
                                <div className={`${LeftRightTab ? LeftRightTab : 'product-box product-box1'}`} key={i}>
                                    <div className='img-wrapper bg-transparent'>
                                        <div className='top-wishlist'>
                                            {item.quantity > 0 &&
                                                <span style={{marginRight: "4px"}}>Stock</span>}
                                            {item?.price > elem?.front_sale_price &&
                                                <span style={{
                                                    backgroundColor: "black",
                                                    marginRight: "4px"
                                                }}>{((Number(item?.price) - Number(item?.front_sale_price)) / Number(item?.price) * 100).toFixed()}%</span>}

                                            {isProductNew(item.created_at) &&
                                                <span style={{
                                                    backgroundColor: "#5C5CFF",
                                                    marginRight: "4px"
                                                }}>New</span>}
                                            {/*<Link href={'/page/wishlist'} className='heart-wishlist wishlist'>*/}
                                            {/*  <i className='far fa-heart'></i>*/}
                                            {/*</Link>*/}
                                        </div>
                                        <Link href={`/${item?.slugable?.prefix}/${item?.slugable?.key}`}
                                              className='text-center'>
                                            <img width="90" height="120"
                                                // src={`${image_api}/${item.image}`}
                                                 loading="lazy"
                                                 src={defImg === "" ? `${image_api}/${item.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                className='img-fluid'
                                                alt={item?.name} title={item?.name}/>
                                        </Link>
                                    </div>
                                    <div className='product-details'>
                                        <PersistGate loading={null} persistor={persistor}>
                                            {
                                                !auth && (
                                                    <h3 className='theme-color'>
                                                        {formatMoney(
                                                            (item?.front_sale_price !== null || undefined) && item?.price > item?.front_sale_price
                                                                ? item?.front_sale_price
                                                                : item?.price
                                                        )}
                                                        {(item?.front_sale_price !== null || undefined) && item?.price > item?.front_sale_price ? (
                                                            <span className='font-light ms-2 price-money-none'>{formatMoney(item?.price)}</span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </h3>
                                                )
                                            }
                                        </PersistGate>
                                        <Link href={`/${item?.slugable?.prefix}/${item?.slugable?.key}`}
                                              className='font-default'>
                                            <h5>{item?.name}</h5>
                                        </Link>
                                        <DynamicRating data={Math.round(sum / count)}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Col>
            </>
        );
    }
;

export default RightTab;
