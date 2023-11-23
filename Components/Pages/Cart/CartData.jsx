import React, {useState} from 'react';
import {Col, Row} from 'reactstrap';
import {image_api} from '../../Constant';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {Input} from 'reactstrap';
import {Btn} from "../../AbstractElements";
import {
    selectCart,
    selectLoadingCart, selectLoadingDelete,
    setCart,
    setLoadingCart, setLoadingDelete,
    setNewCartProduct
} from "../../../ReduxToolkit/Slices/CartSlice";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import Link from "next/link";
import {Backdrop, CircularProgress} from "@mui/material";
import formatMoney from "../../../Utils/monayFormat";

const CartData = () => {
    const dispatch = useDispatch();
    let cart = useSelector(selectCart);
    let load = useSelector(selectLoadingCart);
    let del = useSelector(selectLoadingDelete);
    const handleQtyChange = (e, elem) => {
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
                    "id": elem?.id,
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
            e.target.value = elem.qty
            fetch(`${APICallUrl}/api/update-cart-data`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
                body: JSON.stringify({
                    "id": elem?.id,
                    "qty": 999
                }),
            })
                .then((res) => res.json()).then((res) => {
                toast.warning(`There are 999 items in stock.`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
                dispatch(setNewCartProduct(res))


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
                    "id": elem?.id,
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

    };

    let loginToken = useSelector(selectLoginToken);
    const removeProduct = (product_id) => {
        // setDeleteLoading(true)
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
                    }
                    dispatch(setCart(res))
                    toast.error('Successfully Remove Product', {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 1000
                    });
                    dispatch(setLoadingDelete(false))
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

    return (
        <Col md='12' xl='7' xxl='8' className=''>
            <Row className=' cart-table-row' style={{position: "relative"}}>
                {cart.length !== 0 &&
                    cart.map((elem, i) => {

                        return (
                            <Col key={i} lg='12'>
                                <Row className="cart-row">
                                    <Col lg='3' md='12'>
                                        <Link
                                            href={`${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                            <img src={`${image_api}/${elem?.product?.image}`}
                                                 alt={elem?.product?.name} title={elem?.product?.name}/>
                                        </Link>
                                    </Col>
                                    <Col md='12' className="col-display-mobile">
                                        <Btn
                                            style={{background: "none", fontSize: "18px"}}
                                            attrBtn={{
                                                type: 'button',
                                                className: 'btn-close d-block',
                                                onClick: () => removeProduct(elem?.id),
                                            }}>
                                            <i className='fas fa-times' style={{color: "var(--theme-color)"}}></i>
                                        </Btn>
                                    </Col>
                                    <Col lg='3' md='12' className="td-left-center">
                                        <div style={{display: "grid", rowGap: "8px"}}>
                                            <Link
                                                href={`${elem?.product?.slugable?.prefix}/${elem?.product?.slugable?.key}`}>
                                                <h3 style={{color: 'black'}}>{elem?.product?.name}</h3></Link>
                                            <div style={{fontSize: "14px"}}><span
                                                className="font-light ml-1">Model</span> <span
                                                className="font-bold ml-1"># {elem?.product?.sku}</span></div>
                                            <div style={{fontSize: "14px"}}><span className="font-light ml-1">Part Number</span>
                                                <span
                                                    className="font-bold ml-1"># {elem?.product?.eclipse_number}</span>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg='3' md='6' xs='7' className="qtny-section"
                                         style={{display: 'flex', alignItems: "center"}}>
                                        <div className='qty-box' style={{display: 'flex', justifyContent: "center"}}>

                                            <h6 className='product-title product-title-2 d-block'
                                                style={{marginRight: "10px"}}>QTY: </h6>
                                            <div id='selectSize'
                                                 className='addeffect-section product-description border-product'
                                                 style={{paddingBottom: "0"}}>
                                                <div className='qty-box'
                                                     style={{
                                                         border: "1px solid rgba(0, 0, 0, 0.1)",
                                                         borderRadius: "8px"
                                                     }}>
                                                    <div className='input-group qty-cart-page'
                                                         style={{display: "flex"}}><span
                                                        className='input-group-prepend'>
                                                          <Btn
                                                              attrBtn={{
                                                                  type: "button",
                                                                  className: "quantity-left-minus btn-right-0",
                                                                  onClick: () => handleQtyChange({target: {value: elem?.qty - 1}}, elem)
                                                              }}
                                                          >
                                <i className="fas fa-minus"></i>
                              </Btn></span>
                                                        <Input
                                                            type='number' name='quantity'
                                                            className='form-control input-number'
                                                            min={1}
                                                            max={999}
                                                            value={elem?.qty}
                                                            // defaultValue={elem?.qty > elem?.product?.quantity ? elem?.product?.quantity : elem?.qty}
                                                            onChange={e => handleQtyChange(e, elem)}

                                                        />
                                                        {
                                                            load && <Backdrop sx={{
                                                                color: '#fff',
                                                                position: "absolute",
                                                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                                                backgroundColor: "rgba(255, 255, 255, 0.3)"
                                                            }} open>
                                                                <CircularProgress color="primary"/>
                                                            </Backdrop>
                                                        }


                                                        <span
                                                            className='input-group-prepend'><Btn
                                                            attrBtn={{
                                                                type: "button",
                                                                className: "quantity-right-plus btn-left-0",
                                                                onClick: () => handleQtyChange({target: {value: elem?.qty + 1}}, elem)
                                                            }}
                                                        >
                                <i className="fas fa-plus"></i>
                              </Btn></span></div>
                                                </div>
                                                <h4 style={{paddingTop: "10px"}}>
                                                    {formatMoney((elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ?
                                                        elem?.product?.front_sale_price :
                                                        elem?.product?.price)}</h4>
                                            </div>

                                        </div>


                                    </Col>
                                    <Col lg='2' md='6' xs='5' className="td-display-none"
                                         style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                                        <h2 className='price-detail'>
                                            {formatMoney((elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ?
                                                elem?.product?.front_sale_price * elem?.qty :
                                                elem?.product?.price * elem?.qty)}
                                            {(elem?.product?.front_sale_price !== null || undefined) && (elem?.product?.price > elem?.product?.front_sale_price) ?
                                                <span><del style={{
                                                    color: "var(--theme-color)",
                                                    fontSize: "16px"
                                                }}>{formatMoney(elem?.product?.price * elem?.qty)}</del></span> : ""}
                                        </h2>

                                    </Col>
                                    <Col lg='1' className="col-display">
                                        <Btn
                                            style={{background: "none", fontSize: "18px"}}
                                            attrBtn={{
                                                type: 'button',
                                                className: 'btn-close d-block',
                                                onClick: () => removeProduct(elem.id),
                                            }}>
                                            <i className='fas fa-times' style={{color: "var(--theme-color)"}}></i>
                                        </Btn>
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}
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
            </Row>

        </Col>
    );
};

export default CartData;
