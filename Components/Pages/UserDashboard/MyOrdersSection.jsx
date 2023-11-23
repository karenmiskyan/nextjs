import React, {useCallback, useEffect, useState} from 'react';
import {APICallUrl,image_api} from "../../Constant";
import {Button, Col, Container, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import NavSection from "../../Products/Common/NavSection";
import {useSelector} from "react-redux";
import {selectLoginToken, setShippingSing} from "../../../ReduxToolkit/Slices/LoginSlice";
import {IoMdDownload} from "react-icons/io";
import {Btn} from "../../AbstractElements";
import {Backdrop, CircularProgress, Select} from "@mui/material";
import {setCoupon} from "../../../ReduxToolkit/Slices/CartSlice";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";
import {setLoading} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import myOrders from "../../../pages/my-account/my-orders";
import formatMoney from "../../../Utils/monayFormat";

const MyOrdersSection = () => {

        const loginToken = useSelector(selectLoginToken);
        const [loading, setLoading] = useState(false);
        const [active, setActive] = useState(1);
        const [orders, setOrders] = useState({});
        const [order, setOrder] = useState({});
        const [showModal, setShowModal] = useState(false);
        const [selectPage, setSelectPage] = useState(1);
        const [statusLabelsArray, setStatusLabelsArray] = useState([]);
        const [text, setText] = useState("");
        const [status, setStatus] = useState("");
        const [dataRange, setDataRange] = useState("");
        const router = useRouter();


        const [returnItems, setReturnItems] = useState([]);
        const [toReturn, setToReturn] = useState(false);

        const [err, setErr] = useState({});

        useEffect(() => {
            if (router?.query?.order_id) {
                viewOrder(router?.query?.order_id)
            }
        }, [])

        const reason = ['No longer want', 'Damaged', 'Defective', 'Incorrect item', 'Arrived late', 'Not as described', 'Other']


        useEffect(() => {
            setLoading(true);
            fetch(`${APICallUrl}/api/orders`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                }
            })
                .then((res) => res.json()).then((res) => {

                setOrders(res);
                setStatusLabelsArray(Object?.values(res?.filters?.statuses).map(status => status));
                setLoading(false);

            })
                .catch((error) => {
                    // Handle general fetch error
                    console.error('Failed to get info', error);
                    setLoading(false);

                });
        }, [loginToken]);

        function formatDate(inputDate) {
            const options = {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };

            const date = new Date(inputDate);
            return date.toLocaleDateString('en-US', options);
        }

        const viewOrder = (id) => {
            setLoading(true);
            fetch(`${APICallUrl}/api/order/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                }
            })
                .then((res) => res.json()).then((res) => {

                if (res?.order) {
                    setOrder(res?.order);
                    setShowModal(true)
                    setLoading(false);

                } else {
                    setLoading(false);

                }
            })
                .catch((error) => {
                    console.error('Failed to get order', error);
                    setLoading(false);
                });
        }

        const handleReturnItemChange = (productId, isChecked, newQty, newReason) => {
            if (isChecked) {
                setReturnItems(prevItems => [
                    ...prevItems,
                    {
                        is_return: productId,
                        order_item_id: productId,
                        qty: newQty,
                        reason: newReason
                    }
                ]);
            } else {
                // Remove the item from the returnItems array
                setReturnItems(prevItems => prevItems.filter(item => item.is_return !== productId));
            }
        };

        const handleSelectChange = (productId, property, newValue) => {
            const updatedReturnItems = returnItems.map(item => {
                if (item.is_return === productId) {
                    return {
                        ...item,
                        [property]: newValue,
                    };
                }
                return item;
            });

            setReturnItems(updatedReturnItems);
        };
        const returnRequest = () => {
            setLoading(true);
            fetch(`${APICallUrl}/api/order/return-order`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
                body: JSON.stringify({
                    "order_id": order?.id,
                    "return_items": returnItems
                }),
            })
                .then((res) => res.json()).then((res) => {

                if (res?.success && res?.success === true) {
                    toast.success(res.message, {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000
                    });
                    setShowModal(false);
                    setOrder({});
                    setToReturn(false);
                    setReturnItems([]);
                    setErr({});
                    setLoading(false);

                }
                if (res.errors) {
                    setErr(res)
                    setLoading(false);
                }

            })
                .catch((error) => {
                    console.error('Failed', error);
                });

        }

        const paginate = (e) => {
            setLoading(true);
            fetch(`${orders?.orders?.path}?json=true&page=${e.selected + 1}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                }
            })
                .then(res => res.json().then(res => {
                        window.scrollTo(0, 0)
                        setSelectPage(e.selected + 1);
                        setOrders(res);
                        setLoading(false);
                    }
                ));
        }

        const handleChange = async (e) => {
            setLoading(true);
            const inputValue = e.target.value;
            setText(inputValue);
            try {
                const response = await fetch(`${APICallUrl}/api/orders?search=${inputValue}${status !== "" ? `&status=${status}` : ""}${dataRange !== "" ? `&date_range=${dataRange}` : ""}`, {
                    headers: {
                        "Authorization": `Bearer ${loginToken?.token}`
                    }
                });
                const data = await response.json();

                setOrders(data);
                setSelectPage(1);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        const handleClick = useCallback((value) => {
            setLoading(true);
            setActive(value.id);
            setStatus(value?.value);
            fetch(`${APICallUrl}/api/orders?status=${value?.value}&search=${value.text}${value.dataRange !== "" ? `&date_range=${value.dataRange}` : ""}`, {
                headers: {
                    "Authorization": `Bearer ${loginToken?.token}`
                }
            })
                .then((res) => res.json()).then((res) => {

                setOrders(res);
                setSelectPage(1);
                setLoading(false);

            })
                .catch((error) => {
                    console.error('Failed', error);
                    setLoading(false);
                });
        }, []);

        const changeDataRange = (e) => {

            fetch(`${APICallUrl}/api/orders?date_range=${e}&search=${text}${status !== "" ? `&status=${status}` : ""}`, {
                headers: {
                    "Authorization": `Bearer ${loginToken?.token}`
                }
            })
                .then((res) => res.json()).then((res) => {

                setOrders(res);
                setSelectPage(1);
                setLoading(false);

            })
                .catch((error) => {
                    console.error('Failed', error);
                    setLoading(false);
                });


        };

        return (
            <section className='section-b-space' style={{backgroundColor: "white"}}>
                <Container>
                    <Row>
                        <h2 style={{marginBottom: "26px"}}>My Orders</h2>
                        <Col lg="12">
                            <Row className="g-3">
                                <Col xl="3" lg="4">
                                    <div className="my-orders-section-filter">
                                        <h5>PO Number, Order #, Reference #</h5>
                                        <input type='text' className='form-control checkout-form' value={text}
                                               onChange={(e) => handleChange(e)}
                                               name='po-number'
                                               style={{
                                                   fontSize: "14px",
                                                   borderColor: "#ced4da",
                                                   border: "1px solid #eff2f7"
                                               }}
                                               placeholder='Enter Number Here...'/>
                                    </div>
                                </Col>

                                <Col lg="3">
                                    <div className="my-orders-section-filter">
                                        <h5>Date Range</h5>
                                        <select className='form-select checkout-form form-control'
                                                value={dataRange}
                                                onChange={(e) => {
                                                    setLoading(true);
                                                    const match = e.target.value.match(/\d+/);
                                                    if (match) {
                                                        setDataRange(parseInt(match[0]));
                                                        changeDataRange(parseInt(match[0]))
                                                    } else {
                                                        setDataRange("");
                                                        changeDataRange("")
                                                    }

                                                }}>
                                            <option value="">All Orders</option>
                                            <option value="30">Last 30 days</option>
                                            <option value="60">Last 60 days</option>
                                            <option value="90">Last 90 days</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col lg="2">
                                    <div className="my-orders-section-filter" style={{
                                        height: "100%", flexDirection: "column",
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}>
                                        <div className='product-buttons' style={{marginBottom: "0"}}>
                                            <a onClick={() => {
                                                handleClick({
                                                    id: 1,
                                                    title: 'All',
                                                    value: "",
                                                    text: "",
                                                    dataRange: ""
                                                }),
                                                    setText("");
                                                setDataRange("");
                                            }}
                                               className='btn btn-solid btn-transparent hover-solid btn-animation'>
                                                <span>Clear</span>
                                            </a>
                                        </div>
                                    </div>
                                </Col>


                            </Row>
                        </Col>
                        <Col lg="12">
                            <Row>
                                <Col lg="12" className="cloth-review" style={{margin: "26px 0"}}>
                                    <NavSection active={active} handleClick={handleClick} array={[...[
                                        {
                                            id: 1,
                                            title: 'All',
                                            value: "",
                                            text,
                                            dataRange
                                        }
                                    ], ...statusLabelsArray.map((el, i) => {
                                        return {
                                            id: 2 + i,
                                            title: el.label,
                                            value: el.value,
                                            text,
                                            dataRange
                                        }
                                    })]}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="12">
                            <Row className="table-responsive">
                                <div className="sc-dmctIk WQNxq">
                                    <Col lg="12" style={{display: "table"}}>
                                        <div className="my-orders-section-info">
                                            <div className="my-orders-section-info-name"><h5>DATE</h5></div>
                                            <div className="my-orders-section-info-name"><h5>ORDER #</h5></div>
                                            {/*<div className="my-orders-section-info-name"><h5>PO #</h5></div>*/}
                                            {/*<div className="my-orders-section-info-name"><h5>REFERENCE #</h5></div>*/}
                                            <div className="my-orders-section-info-name"><h5>STATUS</h5></div>
                                            <div className="my-orders-section-info-name"><h5>TOTAL</h5></div>
                                            <div className="my-orders-section-info-name"><h5>ITEMS</h5></div>
                                            {/*<div className="my-orders-section-info-name"><h5>Image</h5></div>*/}
                                            <div className="my-orders-section-info-name"></div>
                                            {/*<div data-tag="allowRowEvents"><a href="#javascript"><i*/}
                                            {/*    className="far fa-eye"></i></a></div>*/}
                                        </div>
                                    </Col>

                                    {
                                        orders?.orders?.data?.length > 0 ? (
                                            orders?.orders?.data
                                                .slice() // Create a copy of the array to avoid mutating the original data
                                                .sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)) // Sort by created_at date
                                                .map((el, i) => (
                                                    <Col lg="12" style={{display: "table"}} key={i}>
                                                        <div className="my-orders-section-single-product">
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatDate(el?.created_at)}</h5>
                                                            </div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{el?.code}</h5></div>
                                                            {/*<div className="my-orders-section-single-product-name"><h5>Chandon</h5></div>*/}
                                                            {/*<div className="my-orders-section-single-product-name"><h5>-</h5></div>*/}
                                                            <div className="my-orders-section-single-product-name">
                                                                <div
                                                                    className={`picked-cancelled 
                                                            ${el?.status?.value === "canceled" ? "canceled" :
                                                                        el?.status?.value === "completed" ? "picked" : "shipped"}`}>
                                                                    <h5>{el?.status?.label}</h5></div>
                                                            </div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatMoney(el?.amount)}</h5></div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{el?.products_count}</h5></div>
                                                            {/*<div className="my-orders-section-single-product-name">*/}
                                                            {/*    <img src="/assets/images/fashion/product/front/1.jpg"/>*/}
                                                            {/*</div>*/}

                                                            <Col lg="2" className="my-orders-section-filter"
                                                                 style={{marginLeft: "auto"}}>
                                                                <div className='product-buttons'
                                                                     style={{marginBottom: "0"}}>
                                                                    <a onClick={() => viewOrder(el?.id)}
                                                                       className='btn btn-solid btn-transparent hover-solid btn-animation view-details'>
                                                                        <span>View Details</span>
                                                                    </a>
                                                                </div>
                                                            </Col>
                                                        </div>

                                                    </Col>
                                                ))
                                        ) : !loading ? (
                                            <h4 className="d-flex justify-content-center mt-5">Orders not found</h4>
                                        ) : ""
                                    }

                                    <Modal scrollable={true}
                                           zIndex={1400}
                                           size='lg'
                                           toggle={() => {
                                               setShowModal(!showModal);
                                               setOrder({});
                                           }}
                                           isOpen={showModal}>
                                        <ModalBody>
                                            <Btn
                                                style={{
                                                    background: "none",
                                                    fontSize: "18px",
                                                    overflow: "visible",
                                                    position: "absolute",
                                                    top: "12px",
                                                    right: "18px"
                                                }}
                                                attrBtn={{
                                                    type: 'button',
                                                    className: 'btn-close d-block p-0',
                                                    onClick: () => {
                                                        setShowModal(false);
                                                        setOrder({});
                                                    },
                                                }}>
                                                <i className='fas fa-times' style={{color: "var(--theme-color)"}}></i>
                                            </Btn>

                                            <Row className="modal-success g-3">
                                                {/*<FaCheckCircle color="green" size={30}/>*/}
                                                <Col lg="6">
                                                    <h2>Order information</h2>
                                                    <p>Order number: <span className="fw-bold">{order?.code}</span></p>
                                                    <p>Order created: <span
                                                        className="fw-bold">{formatDate(order?.created_at)}</span></p>
                                                    <p>Payment method: <span
                                                        className="fw-bold">{order?.payment_method?.label}</span></p>
                                                    <p>Amount: <span className="fw-bold">{formatMoney(order?.amount)}</span></p>
                                                    <p>Tax: <span className="fw-bold">{formatMoney(order?.tax_amount)}</span></p>
                                                    <p>Shipping fee: <span
                                                        className="fw-bold">{formatMoney(order?.shipping_amount)}</span></p>
                                                </Col>
                                                <Col lg="6">
                                                    <h2>Customer information</h2>
                                                    <p>Full Name: <span className="fw-bold">{order?.address?.name}</span>
                                                    </p>
                                                    <p>Phone: <span
                                                        className="fw-bold">{order?.address?.phone}</span></p>
                                                    <p>Address: <span className="fw-bold">{order?.address?.address}</span>
                                                    </p>
                                                    <p>City: <span className="fw-bold">{order?.address?.city}</span></p>
                                                    {/*<p>State: <span className="fw-bold">${order?.address?.tax_amount}</span></p>*/}
                                                    {/*<p>Country: <span className="fw-bold">{order?.address?.shipping_amount}</span></p>*/}
                                                </Col>
                                                <Col lg="12">
                                                    <h2>Order detail</h2>
                                                    <div className="pt-3">
                                                        {
                                                            order?.products?.map((el, i) => {
                                                                return (
                                                                    <Row key={i}
                                                                         className={`g-3 align-items-center d-flex text-center orders-details ${i === 0 ? 'first-row' : ''}`}>
                                                                        <Col lg="1" xs="1">
                                                                            <p>{i + 1}.</p>
                                                                        </Col>
                                                                        <Col lg="2" md="3" xs='3'>
                                                                            <img style={{maxHeight: "60px"}}
                                                                                 src={`${image_api}/${el?.product_image}`}/>
                                                                        </Col>
                                                                        <Col lg="3" md="8" xs="8">
                                                                            <p className="text-start">{el?.product_name}</p>
                                                                        </Col>
                                                                        <Col lg="2" md="4" xs="4">
                                                                            <p>{formatMoney(el?.price)}</p>
                                                                        </Col>
                                                                        <Col lg="2" md="4" xs="4">
                                                                            <p>QTY: x{el?.qty}</p>
                                                                        </Col>
                                                                        <Col lg="2" md="4" xs="4">
                                                                            <p className="fw-bold">{formatMoney(el?.qty * el?.price)}</p>
                                                                        </Col>
                                                                    </Row>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Col>
                                                <Col lg="12">
                                                    <Row className="g-2">
                                                        {
                                                            order?.status?.value === "completed" &&
                                                            <Col lg="6">
                                                                <h2>Shipping Information</h2>
                                                                <p>Shipping Status: <span
                                                                    className="fw-bold">{order?.status?.label}</span>
                                                                </p>
                                                                <p>Date Shipped: <span
                                                                    className="fw-bold">{formatDate(order?.completed_at)}</span>
                                                                </p>
                                                            </Col>
                                                        }
                                                        {
                                                            order?.is_invoice_aviable &&
                                                            <Col lg="3" className="d-flex align-items-end">
                                                                <div className='product-buttons'
                                                                     style={{marginBottom: "0", width: "100%"}}>
                                                                    <a onClick={() => {
                                                                        fetch(`${APICallUrl}/api/orders/print/${order.id}`, {
                                                                            method: 'GET',
                                                                            headers: {
                                                                                "Authorization": `Bearer ${loginToken?.token}`
                                                                            }
                                                                        })
                                                                            .then(response => response.blob())
                                                                            .then(blob => {
                                                                                // Create a blob URL and initiate download
                                                                                const url = window.URL.createObjectURL(blob);
                                                                                const link = document.createElement('a');
                                                                                link.href = url;
                                                                                link.setAttribute('download', `invoice-${order.id}.pdf`); // Update the filename as needed
                                                                                document.body.appendChild(link);
                                                                                link.click();
                                                                            })
                                                                            .catch(error => {
                                                                                console.error('Error:', error);
                                                                            });
                                                                    }}
                                                                       style={{padding: "calc(2px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"}}
                                                                       className='btn btn-solid hover-solid btn-animation'>
                                                                    <span style={{fontSize: "14px"}}>
                                                                        <IoMdDownload/> Download invoice</span>
                                                                    </a>
                                                                </div>

                                                            </Col>
                                                        }

                                                        {
                                                            order?.can_refound &&
                                                            <Col lg="3" className="d-flex align-items-end">
                                                                <div className='product-buttons'
                                                                     style={{marginBottom: "0", width: "100%"}}>
                                                                    <a
                                                                        onClick={() => setToReturn(true)}
                                                                        style={{padding: "calc(2px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"}}
                                                                        className='btn btn-solid btn-transparent hover-solid btn-animation'>
                                                                    <span
                                                                        style={{fontSize: "14px"}}>Return Product(s)</span>
                                                                    </a>
                                                                </div>
                                                            </Col>
                                                        }

                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ModalBody>
                                    </Modal>

                                    <Modal scrollable={true}
                                           zIndex={1600}
                                           size='lg'
                                           toggle={() => {
                                               setToReturn(!toReturn);
                                               setReturnItems([]);
                                               setErr({});
                                           }}
                                           isOpen={toReturn}>

                                        <ModalBody>
                                            <Btn
                                                style={{
                                                    background: "none",
                                                    fontSize: "18px",
                                                    overflow: "visible",
                                                    position: "absolute",
                                                    top: "12px",
                                                    right: "18px"
                                                }}
                                                attrBtn={{
                                                    type: 'button',
                                                    className: 'btn-close d-block p-0',
                                                    onClick: () => {
                                                        setToReturn(false);
                                                        setReturnItems([]);
                                                        setErr({});
                                                    },
                                                }}>
                                                <i className='fas fa-times' style={{color: "var(--theme-color)"}}></i>
                                            </Btn>

                                            <Row className="modal-success g-3">
                                                {/*<FaCheckCircle color="green" size={30}/>*/}
                                                <Col lg="6">
                                                    <h2>Order information</h2>
                                                    <p>Order number: <span className="fw-bold">{order?.code}</span></p>
                                                    <p>Order created: <span
                                                        className="fw-bold">{formatDate(order?.created_at)}</span></p>
                                                </Col>
                                                <Col lg="6">
                                                    <h2>Shipping Information</h2>
                                                    <p>Shipping Status: <span
                                                        className="fw-bold">{order?.status?.label}</span>
                                                    </p>
                                                    <p>Date Shipped: <span
                                                        className="fw-bold">{formatDate(order?.completed_at)}</span>
                                                    </p>
                                                </Col>
                                                <Col lg="12">
                                                    <h2>Choose products</h2>
                                                    <div className="pt-3">
                                                        {
                                                            order?.products?.map((el, i) => {
                                                                return (
                                                                    <Row key={i}
                                                                         className={`g-3 align-items-center d-flex text-center orders-details ${i === 0 ? 'first-row' : ''}`}>
                                                                        <Col lg="1" xs="1">
                                                                            <input className='checkbox_animated check-it'
                                                                                   type='checkbox' style={{top: "0px"}}
                                                                                   checked={returnItems.some(item => item.is_return === el.id)} // Check if the product is in returnItems
                                                                                   onChange={(e) =>
                                                                                       handleReturnItemChange(
                                                                                           el.id,
                                                                                           e.target.checked,
                                                                                           parseInt(e.target.parentNode.parentNode.querySelector('select[name="qty"]').value), // Parse the quantity as an integer
                                                                                           e.target.parentNode.parentNode.querySelector('select[name="reason"]').value.toLowerCase().replace(/ /g, '_')
                                                                                       )
                                                                                   }
                                                                            />
                                                                        </Col>
                                                                        <Col lg="2" md="3" xs='3'>
                                                                            <img style={{maxHeight: "60px"}}
                                                                                 src={`${image_api}/${el?.product_image}`}/>
                                                                        </Col>
                                                                        <Col lg="3" md="6" xs="5">
                                                                            <p className="text-start">{el?.product_name}</p>
                                                                        </Col>
                                                                        <Col lg="2" xs="2">
                                                                            <p>{formatMoney(el?.price)}</p>
                                                                        </Col>
                                                                        <Col lg="2" xs="6">
                                                                            <p className='form-label required-label'>QTY:</p>
                                                                            <select
                                                                                className='form-select custome-form-select checkout-form'
                                                                                defaultValue={el.qty} name="qty"
                                                                                onChange={(e) => handleSelectChange(el.id, 'qty', e.target.value)}
                                                                            >
                                                                                {Array.from({length: el.qty}, (_, index) => index + 1).map((value) => (
                                                                                    <option key={value}
                                                                                            value={value}>{value}</option>
                                                                                ))}
                                                                            </select>
                                                                        </Col>
                                                                        <Col lg="2" xs="6">
                                                                            <p className='form-label required-label'>Reason</p>
                                                                            <select
                                                                                onChange={(e) => handleSelectChange(el.id, 'reason', e.target.value.toLowerCase().replace(/ /g, '_'))}
                                                                                className='form-select custome-form-select checkout-form'
                                                                                defaultValue="def" name="reason">
                                                                                <option disabled value="def">Choose</option>
                                                                                {reason.map((elem, i) => {
                                                                                    return <option key={i}>{elem}</option>;
                                                                                })}
                                                                            </select>
                                                                        </Col>

                                                                    </Row>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Col>
                                                <Col lg="4"
                                                     className="d-flex align-items-end">
                                                    <div className='product-buttons'
                                                         style={{marginBottom: "0", width: "100%"}}>
                                                        <Button
                                                            disabled={returnItems.length === 0 || returnItems.some(item => item.reason === "" || item.reason === "def")}
                                                            onClick={returnRequest}
                                                            style={{padding: "calc(2px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"}}
                                                            className='btn btn-solid hover-solid btn-animation'>
                                                            <span style={{fontSize: "14px"}}>Submit Return Request</span>
                                                        </Button>

                                                    </div>

                                                </Col>
                                                <Col lg="12"
                                                     className="d-flex align-items-end">
                                                    {err.errors && (
                                                        <span
                                                            style={{
                                                                color: 'var(--theme-color)',
                                                                fontWeight: "500",
                                                                fontSize: "14px"
                                                            }}>{err.message}</span>
                                                    )}

                                                </Col>
                                            </Row>
                                        </ModalBody>
                                    </Modal>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    {loading && (
                        <Backdrop sx={{
                            // position: "absolute",
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 2000,
                            backgroundColor: "rgba(255, 255, 255, 0.3)"
                        }} open>
                            <CircularProgress color="primary"/>
                        </Backdrop>
                    )}
                    {
                        orders?.orders?.current_page !== undefined && orders?.orders?.data?.length > 0 ?

                            <nav className={`page-section`}>
                                <ReactPaginate
                                    pageCount={orders?.orders.last_page}
                                    forcePage={selectPage - 1}
                                    breakLabel="..."
                                    nextLabel=">"
                                    previousLabel="<"
                                    className="pagination"
                                    pageClassName={`page-item `}
                                    pageLinkClassName="page-link"
                                    // onPageChange={handlePageClick}
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    pageRangeDisplayed={3}
                                    renderOnZeroPageCount={null}
                                    disabledClassName="d-none"
                                    onPageChange={(e) => paginate(e)}
                                />
                            </nav>
                            : ""}


                </Container>
            </section>
        );
    }
;

export default MyOrdersSection;