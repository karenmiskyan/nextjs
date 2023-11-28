import Link from 'next/link';
import React from 'react';
import {useSelector} from 'react-redux';
import {Col} from 'reactstrap';
import {APIImage} from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import {selectAuth} from "../../../ReduxToolkit/Slices/LoginSlice";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../../ReduxToolkit/store";
import formatMoney from "../../../Utils/monayFormat";
import Image from "next/image";

const MiddleTab = ({elem, LeftRightTab, defImg, isProductNew}) => {

    let count = 0;
    let sum = elem.reviews.reduce(function (sum, item, index) {
        count += item.star;
        return sum + item.star * (index + 1);
    }, 0);
    let auth = useSelector(selectAuth);

    return (
        <Col lg='4' className='order-lg-0 order-1'>
            <div className='product-banner product-banner-circle'>
                <div className={`${LeftRightTab ? LeftRightTab : 'product-box product-box1'}`}>
                    <div className='img-wrapper bg-transparent'>
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
                        </div>

                        <Link href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}>
                            <Image width="310" height="310"
                                // src={`${APICallUrl}/storage/${elem?.image}`}
                                 loading="lazy"
                                 src={defImg === "" ? `${APIImage}/${elem?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                 className='img-fluid' alt={elem?.name}
                                 title={elem?.name}/>
                        </Link>
                    </div>

                    <div className='product-details text-center'>
                        <PersistGate loading={null} persistor={persistor}>
                            {
                                !auth && (
                                    <h3 className='theme-color d-flex justify-content-center'>
                                        {formatMoney(
                                            (elem?.front_sale_price !== null || undefined) && elem?.price > elem?.front_sale_price
                                                ? elem?.front_sale_price
                                                : elem?.price
                                        )}
                                        {(elem?.front_sale_price !== null || undefined) && elem?.price > elem?.front_sale_price ? (
                                            <span className='font-light ms-2 price-money-none'>{formatMoney(elem?.price)}</span>
                                        ) : (
                                            ''
                                        )}
                                    </h3>
                                )
                            }
                        </PersistGate>
                        <Link href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`} className='font-default'>
                            <h5 className='main-title'>{elem?.name}</h5>
                        </Link>
                        <DynamicRating data={Math.round(sum / count)} customeclass={'rating-2'}/>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default MiddleTab;
