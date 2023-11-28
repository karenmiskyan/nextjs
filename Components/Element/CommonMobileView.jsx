import React from 'react';
import Link from 'next/link';
import {AlignJustify, Heart, Home, ShoppingBag, User} from 'react-feather';
import {useSelector} from 'react-redux';
import {Account, Cart, Homes} from '../Constant';
import {selectAuth} from "../../ReduxToolkit/Slices/LoginSlice";
import {selectCart} from "../../ReduxToolkit/Slices/CartSlice";
import {useRouter} from "next/router";
import {persistor} from "../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";

const CommonMobileView = () => {
    const router = useRouter()
    const auth = useSelector(selectAuth);
    const cart = useSelector(selectCart);

    const quantitySum = cart.length > 0 ? cart?.map(item => Number(item?.qty > item.product.quantity && item.product.quantity !== 0 ? item.product.quantity : item?.qty)).reduce((accumulator, currentValue) => accumulator + currentValue, 0) : []

    return (
        <div className='mobile-menu d-sm-none'>
            <ul>
                <li>
                    <Link href={'/'} className={`${router.asPath === "/" ? "active" : ""}`}>
                        <Home/>
                        <span>{Homes}</span>
                    </Link>
                </li>
                <li className='toggle-category'>
                    <Link href='/shop' className={`${router.asPath === "/shop/" ? "active" : ""}`}>
                        <AlignJustify/>
                        <span>Shop</span>
                    </Link>
                </li>
                <PersistGate loading={null} persistor={persistor}>
                    {
                        !auth && <>
                            <li>
                                <Link href='/cart/' className={`${router.asPath === "/cart/" ? "active" : ""}`}
                                      style={{position: "relative"}}>
                                    {
                                        quantitySum.length !== 0 && <p className="qty" style={{
                                            color: "white",
                                            position: "absolute",
                                            top: "-6px",
                                            right: "calc(6px + 12 * (100vw - 180px) / 1000)",
                                            fontWeight: "700",
                                            backgroundColor: "var(--theme-color)",
                                            borderRadius: "6px",
                                            padding: "0 4px"
                                        }}>{quantitySum}</p>
                                    }
                                    <ShoppingBag/>
                                    <span>{Cart}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/my-account/manage-projects'
                                      className={`${router.asPath === "/my-account/manage-projects/" ? "active" : ""}`}>
                                    <Heart/>
                                    <span>Projects</span>
                                </Link>
                            </li>
                        </>
                    }
                </PersistGate>

                <li>
                    <Link href='/my-account'
                          className={`${router.asPath === "/my-account/" || router.asPath === "/sign-in/" ? "active" : ""}`}>
                        <User/>
                        <PersistGate loading={null} persistor={persistor}>
                            <span>{!auth ? "Account" : "Sign In"}</span>
                        </PersistGate>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default CommonMobileView;
