import React, {useCallback, useEffect, useState} from 'react';
import {Col, Container, Label, Modal, ModalBody, Row} from "reactstrap";
import NavSection from "../../Products/Common/NavSection";
import {APICallUrl,APIImage} from "../../Constant";
import {useSelector} from "react-redux";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Btn} from "../../AbstractElements";
import {IoMdDownload} from "react-icons/io";
import ReactPaginate from "react-paginate";
import {Backdrop, CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import formatMoney from "../../../Utils/monayFormat";

const MyStartReturnSection = () => {
    const loginToken = useSelector(selectLoginToken);
    const [active, setActive] = useState(1);

    const [orders, setOrders] = useState({});
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [selectPage, setSelectPage] = useState(1);
    const [statusLabelsArray, setStatusLabelsArray] = useState([]);
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");
    const [dataRange, setDataRange] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router?.query?.order_id) {
            viewOrder(router?.query?.order_id)
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        fetch(`${APICallUrl}/api/order-returns`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {
            // dispatch(setNewCartProduct(res))
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
        fetch(`${APICallUrl}/api/order-returns/detail/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            if (res?.orderReturn) {
                setOrder(res?.orderReturn);
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


    const paginate = (e) => {
        setLoading(true);
        fetch(`${orders?.return_orders?.path}?json=true&page=${e.selected + 1}`, {
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
            const response = await fetch(`${APICallUrl}/api/order-returns?search=${inputValue}${status !== "" ? `&return_status=${status}` : ""}${dataRange !== "" ? `&date_range=${dataRange}` : ""}`, {
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
        setActive(value.id);
        setLoading(true);
        setStatus(value?.value);

        fetch(`${APICallUrl}/api/order-returns?return_status=${value?.value}&search=${value.text}${value.dataRange !== "" ? `&date_range=${value.dataRange}` : ""}`, {
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
        fetch(`${APICallUrl}/api/order-returns?date_range=${e}&search=${text}${status !== "" ? `&return_status=${status}` : ""}`, {
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
                    <h2 style={{marginBottom: "26px"}}>Start a Return</h2>
                    <Col lg="12">
                        <Row style={{gridGap: "24px 0"}}>

                            <Col lg="12">
                                <Row className="g-3">
                                    <Col lg="3">
                                        <div className="my-orders-section-filter">
                                            <h5>PO Number, Order #, Reference #</h5>
                                            <input type='text' className='form-control checkout-form'
                                                   name='return-orders-po' value={text}
                                                   onChange={(e) => handleChange(e)}
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
                                                {/*<div className="my-orders-section-info-name"><h5>RETURN</h5></div>*/}
                                                <div className="my-orders-section-info-name"><h5>DATE</h5></div>
                                                <div className="my-orders-section-info-name"><h5>ORDER #</h5></div>
                                                {/*<div className="my-orders-section-info-name"><h5>PO #</h5></div>*/}
                                                {/*<div className="my-orders-section-info-name"><h5>REFERENCE #</h5></div>*/}
                                                <div className="my-orders-section-info-name"><h5>STATUS</h5></div>
                                                {/*<div className="my-orders-section-info-name"><h5>TOTAL</h5></div>*/}
                                                <div className="my-orders-section-info-name"><h5>ITEMS</h5></div>
                                                {/*<div className="my-orders-section-info-name"><h5>Image</h5></div>*/}
                                                <div className="my-orders-section-info-name"></div>
                                                {/*<div data-tag="allowRowEvents"><a href="#javascript"><i*/}
                                                {/*    className="far fa-eye"></i></a></div>*/}
                                            </div>
                                        </Col>
                                        {
                                            orders?.return_orders?.current_page !== undefined && orders?.return_orders?.data?.length > 0 ? (
                                                orders?.return_orders?.data
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
                                                            ${el?.return_status?.value === "canceled" ? "canceled" :
                                                                            el?.return_status?.value === "completed" ? "picked" : "shipped"}`}>
                                                                        <h5>{el?.return_status?.label}</h5></div>
                                                                </div>
                                                                {/*<div className="my-orders-section-single-product-name">*/}
                                                                {/*    <h5>${el?.amount}</h5></div>*/}
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5>{el?.items_count}</h5></div>
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
                                                        position:"absolute",
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
                                                    <Col lg="12">
                                                        <h2>Return Product(s) Information</h2>
                                                        <p>Order number: <span className="fw-bold">{order?.code}</span>
                                                        </p>
                                                        <p>Return Created: <span
                                                            className="fw-bold">{formatDate(order?.created_at)}</span>
                                                        </p>

                                                        <p>Return status: <span
                                                            className="fw-bold">{order?.return_status?.label}</span></p>

                                                    </Col>
                                                    <Col lg="12">
                                                        <h2>Order detail</h2>
                                                        <div className="pt-3">
                                                            {
                                                                order?.items?.map((el, i) => {
                                                                    return (
                                                                        <Row key={i}
                                                                             className={`g-3 align-items-center d-flex text-center orders-details ${i === 0 ? 'first-row' : ''}`}>
                                                                            <Col lg="1" xs="1">
                                                                                <p>{i + 1}.</p>
                                                                            </Col>
                                                                            <Col lg="2" md="3" xs='3'>
                                                                                <img style={{maxHeight: "60px"}}
                                                                                     src={`${APIImage}/${el?.product_image}`}/>
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
                                                                                <p className='form-label'>Reason</p>
                                                                                <p>{el?.reason?.label}</p>
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
                    orders?.return_status?.current_page !== undefined && orders?.return_status?.data?.length > 0 ?
                        <nav className={`page-section`}>
                            <ReactPaginate
                                pageCount={orders?.return_orders?.last_page}
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
                        </nav> : ""
                }
            </Container>
        </section>
    );
};

export default MyStartReturnSection;