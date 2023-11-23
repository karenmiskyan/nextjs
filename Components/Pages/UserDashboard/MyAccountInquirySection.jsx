import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Input, Form, Label, Modal, ModalBody, Row} from "reactstrap";
import PaginationComp from "../../Element/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuthUser,
    selectLoginToken,
    setShippingSing, setShippingThree, setShippingTwo,
    shippingSing,
    shippingThree,
    shippingTwo
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {APICallUrl, Emailaddress} from "../../Constant";
import {Backdrop, CircularProgress, Skeleton} from "@mui/material";
import ReactPaginate from "react-paginate";
import {Btn} from "../../AbstractElements";
import useWindowDimensions from "../../../Utils/useWindowDimensions";
import Link from "next/link";
import {
    selectAmountCoupon,
    selectCheckoutDetails,
    selectCheckoutErrors,
    selectShippingDetails, selectTotal, setCoupon, setShippingDetails, setShippingErrors
} from "../../../ReduxToolkit/Slices/CartSlice";
import {useRouter} from "next/router";
import * as Yup from "yup";
import {useFormik} from "formik";
import {OrderSuccessSvg} from "../../../Data/SVG";
import StateField from "../Checkout/StateField";
import {Autocomplete} from "@react-google-maps/api";
import {MdOutlinePendingActions, MdPendingActions} from "react-icons/md";

const MyAccountInquirySection = ({loadError, isLoaded}) => {
    const loginToken = useSelector(selectLoginToken);
    const user = useSelector(selectAuthUser);
    const [originalOrders, setOriginalOrders] = useState({});
    const [orders, setOrders] = useState({});
    const [ordersItems, setOrdersItems] = useState([]);

    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showPayModal, setShowPayModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Set initial currentPage to 0
    const [perPage] = useState(10); // Number of items per page
    const {width} = useWindowDimensions();
    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false); // Track if all items are selected
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [payed, setPayed] = useState([])

    const [stateG, setState] = useState([]);
    const [citi, setCiti] = useState({});

    useEffect(() => {
        // setLoading(true);
        fetch(`${APICallUrl}/api/account-inquire`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            setOrders(res);
            setOriginalOrders(res.items);
            setOrdersItems(res.items);
            setCurrentPage(0);
            setLoading(false);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);
                setLoading(false);
            });
        fetch(`${APICallUrl}/api/payment-inquire`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            setPayed(res)
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);
                setLoading(false);
            });

        fetch(`${APICallUrl}/api/payment-inquire`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            setPayed(res)
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);
            });
    }, [loginToken]);



    const getCurrentPageData = () => {
        const startIndex = currentPage * perPage;
        return ordersItems.slice(startIndex, startIndex + perPage);
    };

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
        if (width > 991) {
            window.scrollTo(0, 500)
        }
        if (width <= 991 && width > 767) {
            window.scrollTo(0, 900)
        }
        if (width <= 767) {
            window.scrollTo(0, 1000)
        }
        setCurrentPage(selectedPage.selected);
    };


    const handleChange = (e) => {
        const inputValue = e.target.value;
        setText(inputValue);
        const filteredOrders = originalOrders?.filter((order) => order.invoice.toLowerCase().includes(inputValue.toLowerCase()));
        setOrdersItems(filteredOrders);
        setCurrentPage(0);
    }


    function formatMoney(amount) {
        const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);

        // Check if the formatted amount is '$0.00' and replace it with '1' if true
        return isNaN(Number(amount))
            ?
            <Skeleton variant="text" className=" text-decoration-none m-0" style={{fontSize: "unset", width: "60px"}}/>
            : formattedAmount;
    }


    const handlePayClick = () => {
        if (isAllSelected) {
            // If all items are selected, clear selectedItems and set isAllSelected to false
            setSelectedItems([]);
        } else {
            // If not all items are selected, add all items to selectedItems
            const itemsToAdd = ordersItems.filter((item) => !payed.includes(item.invoice));
            setSelectedItems([...selectedItems, ...itemsToAdd]);
        }

        // Toggle the isAllSelected state
        setIsAllSelected(!isAllSelected);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };


    const initialValues = {
        cardNumber: "",
        cardExpiry: "",
        cardCsv: "",
        name: "",
        email: "",
        phone: "",
        country: 3,
        zip_code: "",
        city: "",
        addr: ""
    }

    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .required("Card Number is required")
            .matches(/^(\d{4}\s?){3}\d{4}$/, "Card Number must be exactly 16 digits"),
        cardExpiry: Yup.string()
            .required("Card Expiry is required")
            .min(4, "Card Expiry must have at least 4 digits")
            .matches(/^(\d{2}\s?\/\s?\d{2})$/, "Card Expiry format is invalid"),
        cardCsv: Yup.string().required("Card Expiry is required")
            .min(3, "Card CSV must be at least 3 digits"),
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),
        zip_code: Yup.string()
            .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code")
            .required("Required"),
        city: Yup.string().required("Required"),
        addr: Yup.string().required("Required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })


    const orderPay = (amount, invoices) => {
        setLoading(true)

        fetch(`${APICallUrl}/api/checkout-inquiry`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                payment_method: "authorize",
                payment_details: {
                    amount: amount,
                    credit_card_number: formik.values.cardNumber.replace(/\s/g, ""),
                    expiration_date: formik.values.cardExpiry.replace(/\s/g, ""),
                    cvv: formik.values.cardCsv,
                },
                address: {
                    name: formik.values.name,
                    email: formik.values.email,
                    phone: formik.values.phone,
                    country: formik.values.country,
                    zip_code: formik.values.zip_code,
                    city: formik.values.city,
                    address: formik.values.addr,
                    state: citi?.id,
                },
                invoices: invoices
            }),
        })
            .then((res) => res.json()).then((res) => {

            if (res.success === true) {
                setSuccess(true);
                setSuccessMessage(res.message)
                setLoading(false);
                fetch(`${APICallUrl}/api/payment-inquire`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {

                    setPayed(res)
                })
                    .catch((error) => {
                        // Handle general fetch error
                        console.error('Failed to get info', error);
                    });
            } else {
                setErr(res.error);
                // setSuccess(true);
                setLoading(false);
            }
        })
            .catch((error) => {
                // Handle general fetch error
                setLoading(false)
                console.error('Failed to Order:', error);
            });
    }


    const [addressDetails, setAddressDetails] = useState({
        address: "",
        city: "",
        state: '',
        zipCode: ""
    });


    useEffect(() => {

        formik.validateForm();
        fetch(`${APICallUrl}/api/get-states`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
        })
            .then((res) => res.json()).then((res) => {

            setState(res)

        })
            .catch((error) => {
                console.error('Failed to get States', error);
            });
    }, []);


    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }


    const searchBoxRef = useRef(null);


    const handlePlacesChanged = useCallback((place) => {
        if (place) {

            let address = '', city = '', state = '', zipCode = '';
            if (place && Array.isArray(place.address_components)) {
                for (let component of place?.address_components) {
                    switch (component.types[0]) {
                        case 'street_number':
                            address = `${component.long_name} `;
                            break;
                        case 'route':
                            address += component.short_name;
                            break;
                        // case "neighborhood":
                        //     city = component.long_name;
                        //     break;
                        case 'administrative_area_level_1':
                            state = component.short_name;
                            break;
                        case 'postal_code':
                            zipCode = component.short_name;
                            break;
                        default:
                            break;
                    }
                }
                const fullAddress = place.formatted_address;
                const addressParts = fullAddress.split(', ');
                if (addressParts.length >= 2) {
                    city = addressParts[1]; // The city should be the second element
                }
                setAddressDetails({address, city, state, zipCode});
                formik.setFieldValue("city", city);
                formik.setFieldValue("zip_code", zipCode);
                formik.setFieldValue("addr", address);
                setCiti(stateG?.find((elem) => elem?.abbreviation === state));

                const isZipMismatched = !(zipCode.length > 0);
                const isCityMismatched = !(city.length > 0);
                const isStateMismatched = false;


            }
        }
    }, [citi, addressDetails, formik]);


    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Row>
                    <h2 style={{marginBottom: "26px"}}>Account Inquiry</h2>
                    <Col lg="12">
                        <Row className="g-3">
                            <Col xl="3" lg="6" md="6">
                                <div className="inquiry-section-info" style={{backgroundColor: "#CACDFE"}}>
                                    <h5>CREDIT LIMIT</h5>
                                    <div>
                                        <h5>{formatMoney(Number(orders?.creditLimit))}</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="3" lg="6" md="6">
                                <div className="inquiry-section-info" style={{backgroundColor: "#A3E7ED"}}>
                                    <h5>BALANCE DUE</h5>
                                    <div>
                                        <h5>{formatMoney(Number(orders?.balanceDue))}</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="3" lg="6" md="6">
                                <div className="inquiry-section-info" style={{backgroundColor: "#8FED94"}}>
                                    <h5>AVAILABLE CREDIT</h5>
                                    <div>
                                        <h5>{formatMoney(Number(orders?.creditAvail))}</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="3" lg="6" md="6">
                                <div className="inquiry-section-info" style={{backgroundColor: "#FFD84F"}}>
                                    <h5>CURRENT</h5>
                                    <div>
                                        <h5>{formatMoney(Number(orders?.Current))}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12" style={{margin: "16px 0", display: "grid", gridGap: "24px"}}>
                        <Row>
                            <Col lg="6">
                                <div style={{padding: "8px 0", borderBottom: "1px solid #CED4DA", width: "100%"}}>
                                    <h3 style={{color: "var(--theme-color)"}}>PAST DUE</h3></div>
                            </Col>
                        </Row>
                        <Row className="g-4">
                            <Col lg="6">
                                <Row style={{gridGap: "10px"}}>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>31-60 Days</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.Thirty))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>61-90 Days</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.Sixty))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>91-120 Days</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.Ninety))}</p>
                                        </div>
                                    </Col>

                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Over 120 Days</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.OneTwenty))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Total</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.balanceDue))}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="6">
                                <Row style={{gridGap: "10px"}}>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Month To Date</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.MTDSales))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Year To Date</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.YTDSales))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>6 Months Avarage</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.SixMonthAverage))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>6 Months High</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.SixMonthHigh))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Payment Days</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.PaymentDays))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Orders</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.AROrders))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Deposits</p>
                                            <p style={{fontWeight: "500"}}>{formatMoney(Number(orders?.ARDeposits))}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Last Sale Date</p>
                                            <p style={{fontWeight: "500"}}>{formatDate(orders?.LastSale)}</p>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="past-due">
                                            <p>Last Payment Date</p>
                                            <p style={{fontWeight: "500"}}>{formatDate(orders?.LastPayment)}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12">
                        <Row>
                            <Col lg="3">
                                <div className="search-div">
                                    <i className='fas fa-search search-icon fa-lg fa-light '/>
                                    <input type="text" className="form-control checkout-form search-input"
                                           value={text} onChange={(e) => handleChange(e)}
                                           placeholder="Enter Number Here..." name="search"/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="table-responsive">
                            <div className="sc-dmctIk WQNxq">
                                <Col lg="12" style={{display: "table"}}>
                                    <div className="my-orders-section-info">

                                        <div className="my-orders-section-info-name"
                                             style={{maxWidth: "50px", minWidth: "40px"}}>
                                            <h5 onClick={handlePayClick} style={{
                                                cursor: "pointer",
                                                width: "fit-content",
                                                color: "var(--theme-color)"
                                            }}>All</h5></div>
                                        <div className="my-orders-section-info-name"><h5>Invoice #</h5></div>
                                        <div className="my-orders-section-info-name"><h5>Transaction Date</h5></div>
                                        <div className="my-orders-section-info-name"><h5>Transaction Amount</h5></div>
                                        <div className="my-orders-section-info-name"><h5>Payment Date</h5></div>
                                        <div className="my-orders-section-info-name"><h5>Payment Amount</h5></div>
                                        <div className="my-orders-section-info-name"><h5>Balance</h5></div>
                                        {/*<div className="my-orders-section-info-name"></div>*/}
                                        {/*<div data-tag="allowRowEvents"><a href="#javascript"><i*/}
                                        {/*    className="far fa-eye"></i></a></div>*/}
                                    </div>
                                </Col>
                                {
                                    ordersItems?.length > 0 ? (
                                        getCurrentPageData()
                                            .slice()
                                            .sort((a, b) => new Date(b?.orderDate) - new Date(a?.orderDate))
                                            .map((el, i) => {

                                                return (
                                                    <Col lg="12" style={{display: "table"}} key={i}>
                                                        <div className="my-orders-section-single-product">
                                                            <div className="my-orders-section-single-product-name"
                                                                 style={{maxWidth: "50px", minWidth: "40px"}}>
                                                                {
                                                                    payed.includes(el.invoice) ?
                                                                        (
                                                                            <div style={{maxWidth: "30px"}}
                                                                                 className={`picked-cancelled  ${el?.status?.value === "canceled" ? "canceled" :
                                                                                     el?.status?.value === "completed" ? "picked" : "shipped"}`}
                                                                            >
                                                                                <MdPendingActions size={18}/>
                                                                            </div>
                                                                        ) :
                                                                        <input className='checkbox_animated check-it'
                                                                               type='checkbox' style={{top: "0px"}}
                                                                               checked={selectedItems.some(item => item.invoice === el.invoice)}
                                                                               onChange={(e) => {
                                                                                   const isChecked = e.target.checked;
                                                                                   if (isChecked) {
                                                                                       setSelectedItems(prevSelected => [...prevSelected, el]);
                                                                                   } else {
                                                                                       setSelectedItems(prevSelected => prevSelected.filter(item => item.invoice !== el.invoice));
                                                                                   }
                                                                               }}
                                                                        />
                                                                }

                                                            </div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5 onClick={() => viewOrder(el?.invoice)}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        color: "var(--theme-color)"
                                                                    }}>{el?.invoice}</h5></div>

                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatDate(el?.transaction_date)}</h5>
                                                            </div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatMoney(Number(el?.transaction_amount))}</h5>
                                                            </div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatDate(el?.payment_date)}</h5>
                                                            </div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatMoney(Number(el?.payment_amount))}</h5></div>
                                                            <div className="my-orders-section-single-product-name">
                                                                <h5>{formatMoney(Number(el?.balance))}</h5></div>

                                                            {/*<Col lg="2" className="my-orders-section-filter"*/}
                                                            {/*     style={{marginLeft: "auto"}}>*/}
                                                            {/*    <div className='product-buttons'*/}
                                                            {/*         style={{marginBottom: "0"}}>*/}
                                                            {/*        <a onClick={() => viewOrder(el?.invoice)}*/}
                                                            {/*           className='btn btn-solid btn-transparent hover-solid btn-animation view-details'>*/}
                                                            {/*            <span>View Details</span>*/}
                                                            {/*        </a>*/}
                                                            {/*    </div>*/}
                                                            {/*</Col>*/}
                                                        </div>

                                                    </Col>
                                                )
                                            })
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
                                                                     className={` align-items-center d-flex text-center orders-details ${i === 0 ? 'first-row' : ''}`}>
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
                        <Row>
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
                                ordersItems?.length > 0 ?
                                    <nav className={`page-section`}>
                                        <ReactPaginate
                                            pageCount={Math.ceil(ordersItems.length / perPage)}
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

                        </Row>

                    </Col>
                    <Col lg="12" className="mt-3">
                        <Row className="justify-content-start g-3">
                            <Col xl="2" lg="3" sm="6">
                                <div className='product-buttons' style={{marginBottom: "0"}}>
                                    <Button
                                        onClick={() => setShowPayModal(true)}
                                        disabled={selectedItems.length === 0}
                                        className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                        {/*<i className='fa fa-shopping-cart'></i>*/}
                                        <span>Pay</span>
                                    </Button>
                                </div>
                            </Col>

                        </Row>
                        <Modal scrollable={true}
                               zIndex={1400}
                               size='lg'
                               toggle={() => {
                                   setShowPayModal(!showPayModal);
                                   setSuccess(false);
                               }}
                               isOpen={showPayModal}>
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
                                            setShowPayModal(false);
                                            setSuccess(false);
                                        },
                                    }}>
                                    <i className='fas fa-times'
                                       style={{color: "var(--theme-color)"}}></i>
                                </Btn>
                                {
                                    !success ?

                                        <Row className="modal-success g-3">
                                            <Col lg="12">
                                                <h2>Selected Invoice</h2>
                                                <div className="pt-3">
                                                    {
                                                        selectedItems.map((el, i) => {

                                                            return (
                                                                <Row key={i}
                                                                     className={`align-items-center d-flex  orders-details ${i === 0 ? 'first-row' : ''}`}>
                                                                    <Col lg="1" xs="1">
                                                                        <p>{i + 1}.</p>
                                                                    </Col>
                                                                    <Col lg="6" md="6" xs="6">
                                                                        <p>Invoice:</p>
                                                                        <p>{el?.invoice}</p>
                                                                    </Col>
                                                                    <Col lg="5" md="5" xs="5">
                                                                        <p>Price:</p>
                                                                        <p>{formatMoney(Number(el?.transaction_amount))}</p>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })
                                                    }
                                                    <Row className="align-items-center d-flex  orders-details">
                                                        <Col lg="12" md="12" xs="12" className="text-center">
                                                            <p className="fw-bold">Total: {formatMoney(selectedItems.reduce((total, el) => total + Number(el?.transaction_amount), 0))}</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="12" className="mt-4">
                                                <Form className='needs-validation '
                                                    // onSubmit={handleSubmit(onSubmit)}
                                                >
                                                    <Row className='g-4'>
                                                        <Col lg="12">
                                                            <h2 className="mb-0 mt-0"> Billing Details</h2>
                                                        </Col>

                                                        <Col md='6'>
                                                            <Label htmlFor='fname'
                                                                   className='form-label required-label'>
                                                                Full Name
                                                            </Label>
                                                            <input type='text' className='form-control checkout-form'
                                                                   name='name' id='fname'
                                                                   placeholder='Enter Full Name'
                                                                   value={ltrim(formik.values.name)}
                                                                   onChange={formik.handleChange}
                                                                   onBlur={formik.handleBlur}
                                                            />
                                                            {formik.errors.name && (
                                                                <span
                                                                    style={{color: 'var(--theme-color)'}}>{formik.errors.name}</span>
                                                            )}
                                                        </Col>

                                                        <Col md='6'>
                                                            <Label htmlFor='email'
                                                                   className='form-label required-label'>
                                                                {Emailaddress}
                                                            </Label>
                                                            <input type='email' className='form-control checkout-form'
                                                                   id='email'
                                                                   placeholder='example@example.com' name='email'
                                                                   value={formik.values.email}
                                                                   onChange={formik.handleChange}
                                                                   onBlur={formik.handleBlur}

                                                            />
                                                            {formik.errors.email && (
                                                                <span
                                                                    style={{color: 'var(--theme-color)'}}>{formik.errors.email}</span>
                                                            )}
                                                        </Col>
                                                        <Col md='6'>
                                                            <Label htmlFor='phone'
                                                                   className='form-label required-label'>
                                                                Phone Number
                                                            </Label>
                                                            <input type='phone' className='form-control checkout-form'
                                                                   placeholder='Enter your phone number'
                                                                   name='phone'
                                                                   value={formik.values.phone}
                                                                   onChange={(e) => {
                                                                       const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                                                       formik.setFieldValue('phone', phoneNumber); // Update the formik value
                                                                   }}
                                                                   onBlur={formik.handleBlur}
                                                            />
                                                            {/*{errors.phone && <span style={{color: 'red'}}>Phone is Required</span>}*/}
                                                            {formik.errors.phone &&
                                                                <span
                                                                    style={{color: 'var(--theme-color)'}}>{formik.errors.phone}</span>}
                                                        </Col>

                                                        <Col md='6'>
                                                            <Label
                                                                className='form-label required-label'>
                                                                Street Address
                                                            </Label>

                                                            <Autocomplete
                                                                onLoad={ref => searchBoxRef.current = ref}
                                                                onPlaceChanged={() => handlePlacesChanged(searchBoxRef.current.getPlace())}
                                                                restrictions={{country: "US"}}
                                                            >
                                                                <input type='text'
                                                                       className='form-control checkout-form'
                                                                    // id='address'
                                                                    // placeholder='Enter your address'
                                                                       name='addr'
                                                                       autoComplete="nope"
                                                                       value={ltrim(formik.values.addr)}
                                                                       onChange={(e) => {
                                                                           formik.handleChange(e)
                                                                           // setInputValue(e.target.value)
                                                                       }}
                                                                       onBlur={formik.handleBlur}
                                                                />
                                                            </Autocomplete>

                                                            {formik.errors.addr && (
                                                                <span
                                                                    style={{color: 'var(--theme-color)'}}>{formik.errors.addr}</span>
                                                            )}
                                                        </Col>
                                                        <Col md='6'>
                                                            <Label htmlFor='zip' className='form-label required-label'>
                                                                Postcode
                                                            </Label>
                                                            <input type='text' className='form-control checkout-form'
                                                                   id='zip'
                                                                   placeholder='Enter your postcode' name='zip_code'
                                                                   value={formik.values.zip_code} autoComplete="nope"
                                                                   onChange={(e) => {
                                                                       formik.handleChange(e);
                                                                   }}
                                                                   onBlur={formik.handleBlur}/>
                                                            {/*{zipMismatch &&*/}
                                                            {/*    <span*/}
                                                            {/*        style={{color: 'var(--theme-color)'}}>ZIP Code doesn't match the selected address</span>}*/}
                                                            {formik.errors.zip_code &&
                                                                <span
                                                                    style={{color: 'var(--theme-color)'}}>{formik.errors.zip_code}</span>}

                                                        </Col>

                                                        <Col md='6'>
                                                            <Label htmlFor='city' className='form-label required-label'>
                                                                Town / City
                                                            </Label>
                                                            <input type='text' className='form-control checkout-form'
                                                                // placeholder='Enter your City'
                                                                   name='city'
                                                                   value={formik.values.city} disabled
                                                                   onChange={(e) => {
                                                                       formik.handleChange(e)
                                                                   }}
                                                                   onBlur={formik.handleBlur}/>
                                                            {/*{cityMismatch &&*/}
                                                            {/*    <span style={{color: 'var(--theme-color)'}}>City doesn't match the selected address</span>}*/}
                                                            {formik.errors.city &&
                                                                <span
                                                                    style={{color: 'var(--theme-color)'}}>{formik.errors.city}</span>}

                                                        </Col>
                                                        <StateField state={stateG} l="6"
                                                                    citi={citi}
                                                                    setCiti={setCiti}
                                                                    addressDetails={addressDetails}/>


                                                    </Row>
                                                </Form>
                                            </Col>
                                            <Col lg="12" className="form-container-authorize mt-4">
                                                {/*<Elements stripe={stripePromise}>*/}
                                                <form onSubmit={handleSubmit}>
                                                    <Row>
                                                        <Col lg="12">
                                                            <Row className="g-4 ">
                                                                <Col lg="12">
                                                                    <Label className='form-label required-label'>Card
                                                                        Number</Label>
                                                                    {/*<div className='form-control checkout-form'>*/}
                                                                    {/*<CardNumberElement options={CARD_OPTIONS} onChange={e => change(e)}/>*/}
                                                                    <input
                                                                        type="text"
                                                                        name="cardNumber"
                                                                        className="form-control checkout-form"
                                                                        placeholder="1234 1234 1234 1234"
                                                                        value={formik.values.cardNumber}
                                                                        style={{color: formik.touched.cardNumber && formik.errors.cardNumber && 'var(--theme-color)'}}
                                                                        onChange={(e) => {
                                                                            const input = e.target.value;
                                                                            const onlyNumbers = input.replace(/[^\d]/g, "");
                                                                            let formattedValue = "";

                                                                            for (let i = 0; i < Math.min(onlyNumbers.length, 16); i += 4) {
                                                                                formattedValue += onlyNumbers.substr(i, 4) + " ";
                                                                            }

                                                                            formik.setFieldValue("cardNumber", formattedValue.trim());
                                                                        }}
                                                                        onBlur={formik.handleBlur}
                                                                        inputMode="numeric" // Enable entering numbers on mobile touch devices
                                                                        pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                                                                    />
                                                                    {/*</div>*/}
                                                                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                                                                        <span
                                                                            style={{color: 'var(--theme-color)'}}>{formik.errors.cardNumber}</span>
                                                                    )}
                                                                    {/*{cardNumber?.error !== undefined && (*/}
                                                                    {/*    <span style={{color: 'var(--theme-color)'}}>{cardNumber?.error?.message}</span>*/}
                                                                    {/*)}*/}
                                                                </Col>
                                                                <Col lg="6">
                                                                    <Label className='form-label required-label'>Exp.
                                                                        Date</Label>
                                                                    {/*<div className='form-control checkout-form'>*/}
                                                                    <input type='text' name="cardExpiry"
                                                                           className='form-control checkout-form'
                                                                           style={{color: formik.touched.cardExpiry && formik.errors.cardExpiry && 'var(--theme-color)'}}
                                                                           placeholder="MM / YY"
                                                                           value={formik.values.cardExpiry}
                                                                           onChange={(e) => {
                                                                               const input = e.target.value;
                                                                               const onlyNumbers = input.replace(/[^\d]/g, "");
                                                                               let formattedValue = "";

                                                                               if (onlyNumbers.length >= 2) {
                                                                                   formattedValue = onlyNumbers.slice(0, 2);

                                                                                   if (onlyNumbers.length >= 3) {
                                                                                       formattedValue += " / " + onlyNumbers.slice(2, 4);
                                                                                   }
                                                                               } else {
                                                                                   formattedValue = onlyNumbers;
                                                                               }

                                                                               formik.setFieldValue("cardExpiry", formattedValue);
                                                                           }}
                                                                           onBlur={formik.handleBlur}
                                                                           inputMode="numeric"
                                                                           pattern="\d{2} / \d{2}"
                                                                    />
                                                                    {formik.touched.cardExpiry && formik.errors.cardExpiry && (
                                                                        <span
                                                                            style={{color: 'var(--theme-color)'}}>{formik.errors.cardExpiry}</span>
                                                                    )}

                                                                    {/*<CardExpiryElement options={CARD_OPTIONS} onChange={e => change(e)}/>*/}
                                                                    {/*</div>*/}
                                                                    {/*{cardExpiry?.error !== undefined && (*/}
                                                                    {/*    <span style={{color: 'var(--theme-color)'}}>{cardExpiry?.error?.message}</span>*/}
                                                                    {/*)}*/}
                                                                </Col>
                                                                <Col lg="6">
                                                                    <Label className='form-label required-label'>CSV
                                                                        Code</Label>
                                                                    {/*<div className='form-control checkout-form'>*/}
                                                                    <input
                                                                        type="text"
                                                                        style={{color: formik.touched.cardCsv && formik.errors.cardCsv && 'var(--theme-color)'}}
                                                                        className="form-control checkout-form"
                                                                        name="cardCsv"
                                                                        placeholder="CVC"
                                                                        value={formik.values.cardCsv}
                                                                        onChange={(e) => {
                                                                            const onlyNumbers = e.target.value.replace(/[^\d]/g, "");
                                                                            formik.setFieldValue("cardCsv", onlyNumbers);
                                                                        }}
                                                                        onBlur={formik.handleBlur}
                                                                        maxLength={3}
                                                                        inputMode="numeric"
                                                                        pattern="[0-9]*"
                                                                    />
                                                                    {formik.touched.cardCsv && formik.errors.cardCsv && (
                                                                        <span
                                                                            style={{color: 'var(--theme-color)'}}>{formik.errors.cardCsv}</span>
                                                                    )}
                                                                </Col>
                                                                <Col lg="12">
                                                                    <div className='form-check p-0 custome-form-check'>
                                                                        <input
                                                                            className='checkbox_animated check-it'
                                                                            type='checkbox'
                                                                            onChange={() => setIsChecked1(prev => !prev)}
                                                                            checked={isChecked1}/>
                                                                        <p className='form-check-label'
                                                                           style={{
                                                                               marginBottom: "0",
                                                                               whiteSpace: "unset",
                                                                               textTransform: "lowercase"
                                                                           }}>I have read and
                                                                            agree to the website
                                                                            <Link target="_blank"
                                                                                  rel="noopener noreferrer"
                                                                                  href={`https://www.authorize.net/about-us/dpa.html#:~:text=Authorize.net%20maintains%20and%20enforces,or%20hazards%20to%20the%20security`}> AUTHORIZE.NET
                                                                                about us</Link> * </p>
                                                                        {/*<p className='font-light'>(25)</p>*/}
                                                                    </div>
                                                                </Col>
                                                                <Col lg="12">
                                                                    <div className='form-check p-0 custome-form-check'>
                                                                        <input
                                                                            className='checkbox_animated check-it'
                                                                            type='checkbox'
                                                                            onChange={() => setIsChecked2(prev => !prev)}
                                                                            checked={isChecked2}/>
                                                                        <p className='form-check-label'
                                                                           style={{
                                                                               marginBottom: "0",
                                                                               whiteSpace: "unset",
                                                                               textTransform: "lowercase"
                                                                           }}>I have read and
                                                                            agree to the website
                                                                            <Link target="_blank"
                                                                                  rel="noopener noreferrer"
                                                                                  href={`https://www.authorize.net/about-us/terms.html`}> AUTHORIZE.NET
                                                                                Terms
                                                                            </Link> * </p>
                                                                        {/*<p className='font-light'>(25)</p>*/}
                                                                    </div>
                                                                </Col>
                                                                <Col lg="12">
                                                                    <div className='form-check p-0 custome-form-check'>
                                                                        <input
                                                                            className='checkbox_animated check-it'
                                                                            type='checkbox'
                                                                            onChange={() => setIsChecked3(prev => !prev)}
                                                                            checked={isChecked3}/>
                                                                        <p className='form-check-label'
                                                                           style={{
                                                                               marginBottom: "0",
                                                                               whiteSpace: "unset",
                                                                               textTransform: "lowercase"
                                                                           }}>I have read and
                                                                            agree to the website
                                                                            <Link target="_blank"
                                                                                  rel="noopener noreferrer"
                                                                                  href={`https://account.authorize.net/interfaces/Legal/Merchant/Agreements/GW/1.0/agreement-authnet.htm`}> AUTHORIZE.NET
                                                                                PAYMENT GATEWAY MERCHANT SERVICE
                                                                                AGREEMENT</Link> * </p>
                                                                        {/*<p className='font-light'>(25)</p>*/}
                                                                    </div>
                                                                </Col>
                                                                <Col md='12'>
                                                                    <div className='product-buttons mb-0'
                                                                         style={{flexDirection: "column"}}>
                                                                        <button
                                                                            className='btn btn-solid hover-solid btn-animation'
                                                                            onClick={() => orderPay(selectedItems.reduce((total, el) => total + Number(el?.transaction_amount), 0).toFixed(2), selectedItems.map((el) => el.invoice))}
                                                                            disabled=
                                                                                {!formik.values.cardNumber
                                                                                    || !formik.values.cardExpiry
                                                                                    || !formik.values.cardCsv
                                                                                    || formik.errors.cardNumber
                                                                                    || formik.errors.cardExpiry
                                                                                    || formik.errors.cardCsv ||
                                                                                    !formik.values.name ||
                                                                                    !formik.values.email ||
                                                                                    !formik.values.phone ||
                                                                                    !formik.values.zip_code ||
                                                                                    !formik.values.city ||
                                                                                    !formik.values.addr ||
                                                                                    formik.errors.name ||
                                                                                    formik.errors.email ||
                                                                                    formik.errors.phone ||
                                                                                    formik.errors.zip_code ||
                                                                                    formik.errors.city ||
                                                                                    formik.errors.addr ||
                                                                                    !isChecked1 || !isChecked2 || !isChecked3
                                                                                }
                                                                        >Pay
                                                                        </button>
                                                                        <span style={{
                                                                            color: 'var(--theme-color)',
                                                                            marginTop: "10px"
                                                                        }}>{err?.length > 0 && err}
                                                                </span>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </Col>
                                        </Row> :
                                        <Row className="modal-success g-3 pt-3 justify-content-center">
                                            <Col lg="12">
                                                <div className='success-icon'
                                                     style={{backgroundColor: "white", padding: "20px"}}>
                                                    <div className='main-container'>
                                                        <div className='check-container'>
                                                            <div className='check-background'>
                                                                <OrderSuccessSvg/>
                                                            </div>
                                                            <div className='check-shadow'></div>
                                                        </div>
                                                    </div>
                                                    <h5 style={{fontWeight: "500"}}
                                                        className="text-center">{successMessage}</h5>
                                                </div>
                                            </Col>
                                            <Col lg="6" className="">
                                                <div className='product-buttons'
                                                     style={{marginBottom: "0"}}>
                                                    <button onClick={() => {
                                                        setSuccess(false);
                                                        setShowPayModal(false);
                                                    }}
                                                            style={{
                                                                fontSize: "14px",
                                                                padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                            }}
                                                            className='btn btn-solid hover-solid btn-animation'>
                                                        <span>Close</span>
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                }
                            </ModalBody>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MyAccountInquirySection;