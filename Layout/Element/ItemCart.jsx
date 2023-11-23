import React, {useEffect, useRef, useState} from 'react';
import {ShoppingBag, ShoppingCart} from 'react-feather';
import {Col, Input, Media, Row} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProduct, getAPIData} from '../../Utils';
import {APICallUrl, CommonPath} from '../../Components/Constant';
import {Btn} from '../../Components/AbstractElements';
import TotalPrice from './TotalPrice';
import {toast} from 'react-toastify';
import {selectAuth, selectLoginToken, toggleDivVisibility} from "../../ReduxToolkit/Slices/LoginSlice";
import {
    selectCart, selectLoadingCart, selectLoadingDelete,
    selectNewCartProduct, selectSellTotal,
    selectTotal,
    setCart, setLoadingCart, setLoadingDelete,
    setNewCartProduct
} from "../../ReduxToolkit/Slices/CartSlice";
import Link from "next/link";
import BeforeSignInAccount from "../../Components/Pages/UserDashboard/BeforeSignInAccount";
import {Backdrop, CircularProgress} from "@mui/material";
import formatMoney from "../../Utils/monayFormat";

const ItemCart = () => {

        const [isCartOpen, setIsCartOpen] = useState(false);
        const dispatch = useDispatch();
        const divRef = useRef();

        const load = useSelector(selectLoadingCart);
        const del = useSelector(selectLoadingDelete);
        const loginToken = useSelector(selectLoginToken);
        const newCartProduct = useSelector(selectNewCartProduct);
        const cart = useSelector(selectCart);
        const total = useSelector(selectTotal);
        const auth = useSelector(selectAuth);


        useEffect(() => {
            if (Object.keys(loginToken).length === 0) {
                dispatch(setCart([]))
                dispatch(setLoadingCart(false))
                dispatch(setLoadingDelete(false))
            } else {
                fetch(`${APICallUrl}/api/get-card`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    },
                })
                    .then((res) => res.json()).then((res) => {
                    if (res.error === true) {


                        dispatch(setCart([]))
                        dispatch(setLoadingCart(false))
                        dispatch(setLoadingDelete(false))


                    } else {
                        dispatch(setCart(res))
                        dispatch(setLoadingCart(false))
                        dispatch(setLoadingDelete(false))
                    }

                })
                    .catch((error) => {
                        // Handle general fetch error
                        console.error('Failed to get Cart', error);
                    });
            }

        }, [loginToken, newCartProduct]);


        const removeProduct = (product_id) => {
            dispatch(setLoadingDelete(true))
            fetch(`${APICallUrl}/api/remove-from-card`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
                body: JSON.stringify({
                    "id": product_id
                })
            })
                .then((res) => res.json()).then((res) => {
                if (res.success === true) {
                    fetch(`${APICallUrl}/api/get-card`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Authorization: `Bearer ${loginToken.token}`
                        },
                    })
                        .then((res) => res.json()).then((res) => {
                        if (res.error === true) {
                            dispatch(setCart([]))
                            dispatch(setLoadingDelete(false))
                        } else {
                            dispatch(setCart(res))
                            toast.error('Successfully Remove Product', {
                                position: toast.POSITION.BOTTOM_LEFT,
                                autoClose: 1000
                            });
                            dispatch(setLoadingDelete(false))
                        }

                    })
                        .catch((error) => {
                            console.error('Failed to get Cart', error);
                        });
                }
            })
                .catch((error) => {
                    // Handle general fetch error
                    console.error('Failed to Delete Item', error);
                });
        };
        useEffect(() => {
            if (isCartOpen) {
                document.body.style.overflow = 'hidden'; // Hide body overflow
            } else {
                document.body.style.overflow = 'visible'; // Restore body overflow
            }
        }, [isCartOpen]);

        useEffect(() => {

            const handleOutsideClick = (event) => {
                if (divRef.current && !divRef.current.contains(event.target)) {
                    dispatch(toggleDivVisibility(false));
                    setIsCartOpen(false)
                }
            };
            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }, []);

        const isOpen = () => {
            setIsCartOpen(!isCartOpen);
        };

        let quantitySum = cart.length > 0 ? cart?.map(item => Number(item?.qty)).reduce((accumulator, currentValue) => accumulator + currentValue, 0) : []
        return (
            <li className={`onhover-dropdown cart-dropdown${isCartOpen ? " show" : ''}`}>
                {/*<Btn*/}
                {/*    attrBtn={{*/}
                {/*      type: 'button',*/}
                {/*      className: 'btn-solid-default btn-spacing',*/}
                {/*      onClick: () => isOpen(),*/}
                {/*    }}*/}
                {/*>*/}
                {/*  */}
                {/*</Btn>*/}
                <div className="cart-media" onClick={() => setIsCartOpen(true)}>
                    {
                        quantitySum.length !== 0 && <p className="qty">{quantitySum}</p>
                    }

                    <ShoppingCart/>
                    {/*<span>*/}
                    {/*  {symbol}*/}
                    {/*  {(getTotalPrice() * currencyValue).toFixed(2)}*/}
                    {/*</span>*/}
                </div>
                {
                    auth ? <BeforeSignInAccount isOpen={isOpen} divRef={divRef} setIsCartOpen={setIsCartOpen}/> :
                        <div className="login" ref={divRef}>
                            <div className='cart-menu' style={{position: "relative"}}>
                                <div className='cart-title'>
                                    <h6>
                                        <ShoppingBag/>
                                        {cart.length === 0 || cart.length === undefined ?
                                            "" : <span className='label label-theme rounded-pill'>{quantitySum}</span>}
                                    </h6>
                                    <span className=" d-block" style={{cursor: "pointer"}} onClick={() => isOpen()}>
              <i className='fas fa-arrow-right back-cart'></i>
            </span>
                                </div>
                                <ul>
                                    {cart?.length > 0 ? (
                                        cart?.map((item) => {


                                            return (
                                                <li key={item.id}>
                                                    <Media>
                                                        <Row>
                                                            <Col lg='3' xs="3"> <Link onClick={() => setIsCartOpen(false)}
                                                                                      href={`/${item?.product?.slugable?.prefix}/${item?.product?.slugable?.key}`}>
                                                                <div className="image-cart">
                                                                    <img
                                                                        src={`${APICallUrl}/storage/${item?.product?.image}`}
                                                                        className='img-fluid' title={item?.product?.name}
                                                                        alt={item?.product?.name}/>
                                                                </div>
                                                            </Link>
                                                            </Col>
                                                            <Col lg='7' xs="7">
                                                                <Media body style={{display: 'block'}}>
                                                                    <Link onClick={() => setIsCartOpen(false)}
                                                                          href={`/${item?.product?.slugable?.prefix}/${item?.product?.slugable?.key}`}>
                                                                        <h6 style={{color: "black"}}>
                                                                            {item?.product?.name.length > 26 ? `${item?.product?.name.substring(0, 26)}...` : item?.product?.name}</h6>
                                                                    </Link>
                                                                    <div className='qty-with-price'>
                                                  <span>{formatMoney(
                                                      (item?.product?.front_sale_price !== null || undefined) &&
                                                      item?.product?.price > item?.product?.front_sale_price
                                                          ? item?.product?.front_sale_price
                                                          : item?.product?.price
                                                  )}</span> <span style={{position: "relative"}}>
                          <Input type='number' className='form-control'
                              // defaultValue={item.qty > item.product.quantity ? item.product.quantity : item.qty}
                                 value={item?.qty}
                                 min={1}
                                 max={999}
                                 onChange={(e) => {
                                     dispatch(setLoadingCart(true))

                                     const value = parseInt(e.target.value);

                                     if (isNaN(value)) {
                                         // If the entered value is not a number, set it to the minimum value
                                         e.target.value = 1;
                                     } else if (value < 1) {
                                         // If the entered value is less than 1, set it to the minimum value
                                         e.target.value = 1;
                                         fetch(`${APICallUrl}/api/update-cart-data`, {
                                             method: 'PUT',
                                             headers: {
                                                 "Content-Type": "application/json;charset=UTF-8",
                                                 Authorization: `Bearer ${loginToken.token}`
                                             },
                                             body: JSON.stringify({
                                                 "id": item?.id,
                                                 "qty": 1
                                             }),
                                         })
                                             .then((res) => res.json()).then((res) => {
                                             dispatch(setNewCartProduct(res))
                                         })
                                             .catch((error) => {
                                                 // Handle general fetch error
                                                 console.error('Failed to update to cart', error);
                                             });
                                     } else if (value >= 999) {

                                         // If the entered value is greater than the maximum quantity, set it to the maximum value
                                         e.target.value = item.qty;
                                         fetch(`${APICallUrl}/api/update-cart-data`, {
                                             method: 'PUT',
                                             headers: {
                                                 "Content-Type": "application/json;charset=UTF-8",
                                                 Authorization: `Bearer ${loginToken.token}`
                                             },
                                             body: JSON.stringify({
                                                 "id": item?.id,
                                                 "qty": 999
                                             }),
                                         })
                                             .then((res) => res.json()).then((res) => {

                                             dispatch(setNewCartProduct(res))

                                             toast.warning(`There are 999 items in stock.`, {
                                                 position: toast.POSITION.BOTTOM_LEFT,
                                                 autoClose: 2000
                                             });
                                         })
                                             .catch((error) => {
                                                 // Handle general fetch error
                                                 console.error('Failed to update to cart', error);
                                             });
                                     } else {
                                         fetch(`${APICallUrl}/api/update-cart-data`, {
                                             method: 'PUT',
                                             headers: {
                                                 "Content-Type": "application/json;charset=UTF-8",
                                                 Authorization: `Bearer ${loginToken.token}`
                                             },
                                             body: JSON.stringify({
                                                 "id": item?.id,
                                                 "qty": e.target.value
                                             }),
                                         })
                                             .then((res) => res.json()).then((res) => {
                                             dispatch(setNewCartProduct(res));
                                         })
                                             .catch((error) => {
                                                 // Handle general fetch error
                                                 console.error('Failed to update to cart', error);
                                             });
                                     }
                                 }}
                          />
                                                                        {
                                                                            load && <Backdrop sx={{
                                                                                color: '#fff',
                                                                                position: "absolute",

                                                                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                                                                backgroundColor: "rgba(255, 255, 255, 0.3)"
                                                                            }} open>
                                                                                <CircularProgress style={{height: "100%"}}
                                                                                                  color="primary"/>
                                                                            </Backdrop>
                                                                        }

                                                                        </span>
                                                                    </div>
                                                                </Media>
                                                            </Col>
                                                            <Col lg='1' xs="1">
                                                                <Btn
                                                                    attrBtn={{
                                                                        type: 'button',
                                                                        className: 'btn-close d-block',
                                                                        onClick: () => removeProduct(item.id),
                                                                    }}>
                                                                    <i className='fas fa-times'
                                                                       style={{color: "var(--theme-color)"}}></i>
                                                                </Btn>
                                                            </Col>
                                                        </Row>

                                                    </Media>

                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li>
                                            <img src={`${CommonPath}/cartEmpty.png`} className='img-fluid' alt='cartEmpty'/>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {
                                del && <Backdrop sx={{
                                    color: '#fff',
                                    position: "absolute",
                                    zIndex: (theme) => theme.zIndex.drawer + 1,
                                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                                }} open>
                                    <CircularProgress color="primary"/>
                                </Backdrop>
                            }
                            <TotalPrice total={total}/>
                        </div>
                }

            </li>
        );
    }
;
export default ItemCart;
