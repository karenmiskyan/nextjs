import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {APICallUrl} from "../../Constant";
import {Col, Container, Modal, ModalBody, Row} from "reactstrap";
import NavSection from "../../Products/Common/NavSection";
import {Btn} from "../../AbstractElements";
import {Backdrop, CircularProgress} from "@mui/material";
import ReactPaginate from "react-paginate";
import formatMoney from "../../../Utils/monayFormat";

const MyAccountHistorySection = () => {
    const loginToken = useSelector(selectLoginToken);
    const [active, setActive] = useState(1);

    const [originalOrders, setOriginalOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [selectPage, setSelectPage] = useState(1);
    const [statusLabelsArray, setStatusLabelsArray] = useState([]);
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");
    const [dataRange, setDataRange] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Set initial currentPage to 0
    const [perPage] = useState(10); // Number of items per page


    useEffect(() => {
        setLoading(true);
        fetch(`${APICallUrl}/api/account-histories`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {
            // dispatch(setNewCartProduct(res))
            setOrders(res);
            setOriginalOrders(res); // Save the original data here
            setCurrentPage(0);
            // setStatusLabelsArray(Object?.values(res?.filters?.statuses).map(status => status));
            setLoading(false);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);
                setLoading(false);
            });
    }, [loginToken]);


    const getCurrentPageData = () => {
        const startIndex = currentPage * perPage;
        return orders.slice(startIndex, startIndex + perPage);
    };

    // useEffect(() => {
    //     const startIndex = (currentPage - 1) * perPage;
    //     const ordersToShow = orders?.slice(startIndex, startIndex + perPage);
    //
    // }, [currentPage])

    function formatDate(inputDate) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        };

        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', options);
    }

    const viewOrder = (id) => {
        setLoading(true);
        fetch(`${APICallUrl}/api/account-histories/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            if (res) {
                setOrder(res);
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


    const handlePageChange = (selectedPage) => {
        window.scrollTo(0, 0)
        setCurrentPage(selectedPage.selected);
    };


    const handleChange = (e) => {
        setLoading(true);
        const inputValue = e.target.value;
        setText(inputValue);
        if (dataRange === "") {

            const filteredOrders = originalOrders.filter((order) => order.invoice.toLowerCase().includes(inputValue.toLowerCase()));
            setOrders(filteredOrders);
            setCurrentPage(0);
            setLoading(false);
        } else {
            fetch(`${APICallUrl}/api/account-histories?date_range=${dataRange}`, {
                headers: {
                    "Authorization": `Bearer ${loginToken?.token}`
                }
            })
                .then((res) => res.json()).then((res) => {

                const filteredOrders = res.filter((order) => order.invoice.toLowerCase().includes(inputValue.toLowerCase()));
                // setOriginalOrders(filteredOrders);
                setOrders(filteredOrders);
                setCurrentPage(0);
                setLoading(false);

            })
                .catch((error) => {
                    console.error('Failed', error);
                    setLoading(false);
                });
        }


    }

    const changeDataRange = (e) => {

        fetch(`${APICallUrl}/api/account-histories?date_range=${e}`, {
            headers: {
                "Authorization": `Bearer ${loginToken?.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            const filteredOrders = res.filter((order) => order.invoice.toLowerCase().includes(text.toLowerCase()));
            // setOriginalOrders(filteredOrders);
            setOrders(filteredOrders);
            setCurrentPage(0);
            setLoading(false);

        })
            .catch((error) => {
                console.error('Failed', error);
                setLoading(false);
            });


    };
    const clear = () => {
        setLoading(true);
        setText("");
        setDataRange("");
        fetch(`${APICallUrl}/api/account-histories`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            setOrders(res);
            setOriginalOrders(res);
            setCurrentPage(0);
            setLoading(false);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);
                setLoading(false);
            });
    }


    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Row>
                    <h2 style={{marginBottom: "26px"}}>Account History</h2>
                    <Col lg="12">
                        <Row style={{gridGap: "24px 0"}}>
                            <Col lg="12">
                                <Row className="g-3">
                                    <Col lg="3">
                                        <div className="my-orders-section-filter">
                                            <h5>PO Number, Order #, Reference #</h5>
                                            <input type='text' className='form-control checkout-form'
                                                   name='return-orders-po' value={text}
                                                   onChange={(e) => handleChange(e)} disabled={loading}
                                                   style={{
                                                       fontSize: "14px",
                                                       borderColor: "#ced4da",
                                                       border: "1px solid #eff2f7"
                                                   }}
                                                   placeholder='Enter Number Here...'/>
                                        </div>
                                    </Col>
                                    <Col lg="2">
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
                                                <a onClick={clear}
                                                   className='btn btn-solid btn-transparent hover-solid btn-animation'>
                                                    <span>Clear</span>
                                                </a>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                            {/*<Col lg="12">*/}
                            {/*    <Row>*/}
                            {/*        <Col lg="12" className="cloth-review" style={{margin: "26px 0"}}>*/}
                            {/*            <NavSection active={active} handleClick={handleClick} array={[...[*/}
                            {/*                {*/}
                            {/*                    id: 1,*/}
                            {/*                    title: 'All',*/}
                            {/*                    value: "",*/}
                            {/*                    text,*/}
                            {/*                    dataRange*/}
                            {/*                }*/}
                            {/*            ], ...statusLabelsArray.map((el, i) => {*/}
                            {/*                return {*/}
                            {/*                    id: 2 + i,*/}
                            {/*                    title: el.label,*/}
                            {/*                    value: el.value,*/}
                            {/*                    text,*/}
                            {/*                    dataRange*/}
                            {/*                }*/}
                            {/*            })]}/>*/}
                            {/*        </Col>*/}
                            {/*    </Row>*/}
                            {/*</Col>*/}
                            <Col lg="12">
                                <Row className="table-responsive">
                                    <div className="sc-dmctIk WQNxq">
                                        <Col lg="12" style={{display: "table"}}>
                                            <div className="my-orders-section-info">
                                                <div className="my-orders-section-info-name"><h5>Invoice #</h5></div>
                                                <div className="my-orders-section-info-name"><h5>Order Date</h5></div>
                                                <div className="my-orders-section-info-name"><h5>Ship Date</h5></div>
                                                <div className="my-orders-section-info-name"><h5>Amount</h5></div>
                                                <div className="my-orders-section-info-name"><h5>Balance</h5></div>
                                                <div className="my-orders-section-info-name"></div>
                                                {/*<div data-tag="allowRowEvents"><a href="#javascript"><i*/}
                                                {/*    className="far fa-eye"></i></a></div>*/}
                                            </div>
                                        </Col>
                                        {
                                            orders?.length > 0 ? (
                                                getCurrentPageData()
                                                    .slice()
                                                    .sort((a, b) => new Date(b?.orderDate) - new Date(a?.orderDate))
                                                    .map((el, i) => (
                                                        <Col lg="12" style={{display: "table"}} key={i}>
                                                            <div className="my-orders-section-single-product">
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5 onClick={() => viewOrder(el?.invoice)}
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            color: "var(--theme-color)"
                                                                        }}>{el?.invoice}</h5></div>
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5>{formatDate(el?.orderDate)}</h5>
                                                                </div>
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5>{formatDate(el?.shipDate)}</h5>
                                                                </div>
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5>{formatMoney(Number(el?.amount))}</h5></div>
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5>{formatMoney(Number(el?.balance))}</h5></div>
                                                                <Col lg="2" className="my-orders-section-filter"
                                                                     style={{marginLeft: "auto"}}>
                                                                    <div className='product-buttons'
                                                                         style={{marginBottom: "0"}}>
                                                                        <a onClick={() => viewOrder(el?.invoice)}
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
                                                    <i className='fas fa-times'
                                                       style={{color: "var(--theme-color)"}}></i>
                                                </Btn>

                                                <Row className="modal-success g-3">
                                                    {/*<FaCheckCircle color="green" size={30}/>*/}
                                                    <Col lg="6">
                                                        <h2>Information</h2>
                                                        <p>Invoice: <span className="fw-bold">{order?.invoice}</span>
                                                        </p>
                                                        <p>Invoice Date: <span
                                                            className="fw-bold">{formatDate(order?.invoiceDate)}</span>
                                                        </p>
                                                        <p>Invoice Due Date: <span
                                                            className="fw-bold">{formatDate(order?.invoiceDueDate)}</span>
                                                        </p>
                                                        <p>Amount Due: <span
                                                            className="fw-bold">{formatMoney(Number(order?.amountDue))}</span>
                                                        </p>

                                                        <p>Bill To: <span
                                                            className="fw-bold">{order?.billToName}</span></p>
                                                    </Col>
                                                    <Col lg="6">
                                                        <h2>Amount Information</h2>
                                                        <p>Subtotal: <span
                                                            className="fw-bold">{formatMoney(Number(order?.total?.subtotal))}</span>
                                                        </p>
                                                        <p>Tax: <span
                                                            className="fw-bold">{formatMoney(Number(order?.total?.tax))}</span>
                                                        </p>
                                                        <p>Total: <span
                                                            className="fw-bold">{formatMoney(Number(order?.total?.total))}</span>
                                                        </p>

                                                        <p>Payment: <span
                                                            className="fw-bold">{formatMoney(Number(order?.total?.payment))}</span>
                                                        </p>
                                                    </Col>
                                                    <Col lg="12">
                                                        <h2>Order detail</h2>
                                                        <div className="pt-3">

                                                            {
                                                                order?.item?.map((el, i) => {
                                                                    return (
                                                                        <Row key={i}
                                                                             className={`g-3 align-items-center d-flex text-center orders-details ${i === 0 ? 'first-row' : ''}`}>
                                                                            <Col lg="1" xs="1">
                                                                                <p>{i + 1}.</p>
                                                                            </Col>
                                                                            {/*<Col lg="2" md="3" xs='3'>*/}
                                                                            {/*    <p className='form-label'>Price</p>*/}
                                                                            {/*    <p>{el?.reason?.label}</p>*/}
                                                                            {/*</Col>*/}
                                                                            <Col lg="5" md="11" xs="11">
                                                                                <p className="text-start">{el?.itemDesc}</p>
                                                                            </Col>
                                                                            <Col lg="2" md="4" xs="4">
                                                                                <p>QTY: x{el?.qty}</p>
                                                                            </Col>

                                                                            <Col lg="2" md="4" xs="4">
                                                                                <p>Price:</p>
                                                                                <p>{formatMoney(Number(el?.price))}</p>
                                                                            </Col>
                                                                            <Col lg="2" md="4" xs="4">
                                                                                <p>Extended Price:</p>
                                                                                <p>{formatMoney(Number(el?.extendPriceString))}</p>
                                                                            </Col>

                                                                        </Row>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </Row>
                            </Col>
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
                    orders.length > 0 ?
                        <nav className={`page-section`}>
                            <ReactPaginate
                                pageCount={Math.ceil(orders.length / perPage)}
                                forcePage={currentPage}
                                onPageChange={handlePageChange}
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
                                // onPageChange={(e) => paginate(e)}
                            />
                        </nav> : ""
                }
            </Container>
        </section>
    );
};

export default MyAccountHistorySection;