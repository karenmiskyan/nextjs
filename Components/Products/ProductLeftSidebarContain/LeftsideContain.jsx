import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Input, Modal, ModalBody, Row} from 'reactstrap';
import {Btn} from '../../AbstractElements';
import {Addtocart, APICallUrl, CommonPath} from '../../Constant';
import {toast} from "react-toastify";
import {
    selectAuth,
    selectLoginToken,
    toggleDivVisibility
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {setNewCartProduct} from "../../../ReduxToolkit/Slices/CartSlice";
import {useRouter} from "next/router";
import {OrderSuccessSvg} from "../../../Data/SVG";
import {Backdrop, CircularProgress} from "@mui/material";
import formatMoney from "../../../Utils/monayFormat";

const LeftSideContain = ({singleProduct}) => {

    const {ProductFilter} = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const loginToken = useSelector(selectLoginToken);
    const [count, setCount] = useState(1);

    const [projects, setProjects] = useState([]);
    const [selectProject, setSelectProject] = useState(1);

    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [err, setErr] = useState({});

    const router = useRouter();


    const [showAddCartModal, setShowAddCartModal] = useState(false);
    useEffect(() => {
        setCount(1)
    }, [singleProduct]);

    const AddToCart = () => {
        fetch(`${APICallUrl}/api/add-card`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "product_id": singleProduct?.id,
                "qty": count
            }),
        })
            .then((res) => res.json()).then((res) => {

            if (res.error !== true) {
                dispatch(setNewCartProduct(res))
                toast.success(`Item successfully added.`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
            } else {
                toast.error(`${res?.message}`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
            }
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to Add to cart', error);
            });

    };
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        const minValue = 1;
        const maxValue = 999;

        // Check if the value is a number
        if (!isNaN(value)) {
            // Check if the value is within the min and max range
            const validValue = Math.min(Math.max(value, minValue), maxValue);
            setCount(validValue);
        }
    };

    const toLogin = () => {
        if (window.innerWidth <= 575) {
            router.push("/my-account")

        } else {
            dispatch(toggleDivVisibility(true));
        }
    }

    useEffect(() => {

        if (Object.keys(loginToken).length > 0) {
            fetch(`${APICallUrl}/api/projects`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                }
            })
                .then((res) => res.json()).then((res) => {
                setProjects(res?.projects);
                setLoading(false);
            })
                .catch((error) => {
                    // Handle general fetch error
                    console.error('Failed to get Projects', error);
                    setLoading(false);
                });
        }

    }, [loginToken]);

    useEffect(() => {
        if (showModal) {
            const systemProject = projects?.find(el => el.system === 1);
            if (systemProject) {
                setSelectProject(systemProject.id);
            }
        }
    }, [showModal]);

    const addItem = (projectId) => {
        setLoading(true);
        if (selectProject === "54545454koa" && !projectId) {
            setLoading(false);
        } else {

            fetch(`${APICallUrl}/api/project/items`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
                body: JSON.stringify({
                    "project_id": projectId ? projectId : Number(selectProject),
                    "qty": count,
                    "product_id": singleProduct?.id,
                    "description": "asd"
                }),
            })
                .then((res) => res.json()).then((res) => {

                if (res?.success === true) {
                    toast.success(`Product Added Successfully`, {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000
                    });
                    setView(true);
                    setTitle("");
                    setLoading(false);
                } else {
                    setErr(res);
                    setLoading(false);
                }


            })
                .catch((error) => {
                    // Handle general fetch error
                    console.error('Failed to get Projects', error);
                    setLoading(false);
                });
        }

    }


    const addNewProjectAndItem = (text) => {

        setLoading(true);
        fetch(`${APICallUrl}/api/projects`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "title": text
            }),
        })
            .then((res) => res.json()).then((res) => {
            if (res?.success === true) {
                setSelectProject(res?.project?.id);
                addItem(res?.project?.id);
            } else {
                setErr(res);
                setLoading(false);
            }


        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Projects', error);
                setLoading(false);
            });
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    const c = singleProduct?.branches?.map(el => Number(el.qty)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const brandNamesToOpenModal = [
        "DENON",
        "POLK",
        "HEOS",
        "DEFINITIVE TECHNOLOGY",
        "ELAN",
        "RTI",
        "SONY",
        "SONY PRO",
        "FOCAL",
    ];

    return (
        <Col md="5" lg='5' xl="3" className='mt-lg-5 '>
            <div className={`category-option ${ProductFilter ? 'show' : ''}`}>
                <div className='category-name' style={{padding: "32px"}}>
                    {!auth &&
                        <div className="product-checkout-section">
                            <h2 className='price-detail'>
                                {formatMoney(
                                    (singleProduct?.front_sale_price !== null || undefined) && singleProduct?.price > singleProduct?.front_sale_price
                                        ? singleProduct?.front_sale_price
                                        : singleProduct?.price
                                )}
                                {(singleProduct?.front_sale_price !== null || undefined) && singleProduct?.price > singleProduct?.front_sale_price ? (
                                    <span><del>{formatMoney(singleProduct?.price)}</del></span>
                                ) : (
                                    ''
                                )}
                            </h2>
                            {
                                singleProduct?.quantity > 0 &&
                                <div style={{display: 'flex', alignItems: "center", marginTop: "12px"}}>
                            <span className="dot"
                                //       style={singleProduct?.stock_status.value === "in_stock" ? {} :
                                //     {
                                //     backgroundColor: "var(--theme-color)",
                                //     outline: " 0.1rem solid var(--theme-color)"
                                // }}
                            >

                            </span><h3
                                    style={{color: "black"}}>{singleProduct?.quantity > 0 && "In stock"}</h3>
                                </div>
                            }
                        </div>
                    }
                    <div className="product-checkout-section">
                        <div>
              <span style={{color: "black"}}><img src={`${CommonPath}/productphoto.png`} style={{marginRight: "4px"}}
                                                  alt='small-banner'/>
                Order within 23hr 53min & your order will be shipped same day!</span>
                        </div>
                        <div>

              <span style={{color: "black"}}><img src={`${CommonPath}/producthome.png`} style={{marginRight: "4px"}}
                                                  alt='small-banner'/>
                Free Store Pick-up</span>
                        </div>
                    </div>

                    {
                        singleProduct?.stock_status.value !== "out_of_stock" && !auth &&
                        <>
                            {/*{*/}
                            {/*    count === singleProduct?.quantity &&*/}
                            {/*    <p style={{color: "var(--theme-color)"}}>There are {singleProduct?.quantity} items in*/}
                            {/*        stock.</p>*/}
                            {/*}*/}
                            <div id='selectSize' className='addeffect-section product-description border-product'
                                 style={{display: 'flex'}}>
                                <h6 className='product-title product-title-2 d-block'
                                    style={{marginRight: "10px"}}>QTY: </h6>
                                <div className='qty-box'>
                                    <div className='input-group'>
          <span className='input-group-prepend'>
            <Btn
                attrBtn={{
                    type: 'button',
                    className: 'quantity-left-minus btn-right-0',
                    onClick: () => {
                        setCount((prev) => (count !== 1 ? prev - 1 : 1));
                    },
                }}>
              <i className='fas fa-minus'></i>
            </Btn>
          </span>
                                        <Input type='text' name='quantity'
                                               className='form-control input-number'
                                               min={1}
                                               max={999}
                                               value={count}
                                               onChange={handleQuantityChange}
                                        />
                                        <span className='input-group-prepend'>
            <Btn
                attrBtn={{
                    type: 'button',
                    className: 'quantity-right-plus btn-left-0',
                    onClick: () => {
                        setCount((prev) => (prev + 1));
                    },
                }}>
              <i className='fas fa-plus'></i>
            </Btn>
          </span>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <div className='product-buttons'>
                                    <a className='btn btn-solid btn-transparent hover-solid btn-animation'
                                       onClick={() => setShowModal(true)}>
                                        <span>Add To Project</span>
                                    </a>
                                </div>
                                <div className='product-buttons'>
                                    <a className='btn btn-solid hover-solid btn-animation'
                                       onClick={() => {
                                           if (brandNamesToOpenModal.includes(singleProduct.brand.name.toUpperCase())) {
                                               setShowAddCartModal(true);
                                           } else {
                                               AddToCart();
                                           }
                                       }}
                                    >
                                        <span>{singleProduct?.branch_qty === 0 ? "Special Order " : Addtocart}</span>
                                    </a>
                                </div>
                            </div>
                        </>
                    }
                    {
                        auth && <div className='product-buttons'>
                            <div
                                onClick={toLogin}
                                className='btn btn-solid hover-solid btn-animation'>
                                <span>Login for Price</span>
                            </div>
                        </div>
                    }
                    <div className="sub-product-payments">
                        <ul>
                            <li>
                                <img src={`${CommonPath}/payment-icon-auth/1.png`} width="37" className='img-fluid'
                                     alt='visa'/>
                            </li>
                            <li>
                                <img src={`${CommonPath}/payment-icon-auth/2.png`} width="37" className='img-fluid'
                                     alt='master'/>
                            </li>
                            <li>
                                <img src={`${CommonPath}/payment-icon-auth/5.png`} width="37" className='img-fluid'
                                     alt='american express'/>
                            </li>
                            <li>
                                <img src={`${CommonPath}/payment-icon-auth/4.png`} width="37" className='img-fluid'
                                     alt='paypal'/>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className='banner-deatils' style={{marginTop: "16px"}}>
                    <div className='banner-image' style={{
                        minHeight: "148px",
                        backgroundImage: "url(/assets/images/small.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: "block",
                        borderRadius: "8px",
                        padding: "32px"
                    }}>
                        <div style={{maxWidth: "160px", width: "100%"}}>
                            <h4>Shop Our Monthly Sales Flyer</h4>
                            <Fragment>
                                <div className='product-buttons' style={{margin: "20px 0 0 0"}}>
                                    <button className='btn btn-solid hover-solid btn-animation quick-order-button'
                                            style={{backgroundColor: "black"}}
                                            onClick={() => {
                                                !auth ?
                                                    router.push("/shop/") :
                                                    openInNewTab("https://catalog.koaedi.com/cat/654465132687/")
                                            }}
                                    >
                                        <span> {
                                            !auth ? "SHOP NOW" : "Login for Price"
                                        }</span>
                                    </button>
                                </div>

                            </Fragment>
                        </div>

                    </div>
                </div>
            </div>
            <Modal scrollable={true}
                   zIndex={1400}
                // size='lg'
                   toggle={() => {
                       setSelectProject("1");
                       setShowModal(!showModal);
                       setView(false);
                       setErr({});
                       setTitle("");
                   }}
                   isOpen={showModal}>
                <ModalBody>
                    <Btn
                        style={{
                            background: "none",
                            fontSize: "18px",
                            position: "absolute",
                            overflow: "visible",
                            top: "12px",
                            right: "18px"
                        }}
                        attrBtn={{
                            type: 'button',
                            className: 'btn-close d-block p-0 ',
                            onClick: () => {
                                setSelectProject("1");
                                setShowModal(false);
                                setView(false);
                                setErr({});
                                setTitle("");
                            },
                        }}>
                        <i className='fas fa-times'
                           style={{color: "var(--theme-color)"}}></i>
                    </Btn>
                    {
                        !view ?
                            <Row className="modal-success g-3">

                                <Col lg="12">
                                    <h5 style={{fontWeight: "500"}}>Choose Project:</h5>
                                </Col>
                                <Col lg="12">
                                    {/*<p className='form-label'></p>*/}
                                    <select
                                        onChange={(e) => setSelectProject(e.target.value)}
                                        className='form-select custome-form-select checkout-form'
                                        defaultValue="1" name="reason">
                                        {/*<option disabled value="def">Choose</option>*/}
                                        {[...projects, ...[{
                                            title: "Create New Project",
                                            id: "54545454koa"
                                        }]].map((elem, i) => {
                                            return <option key={i} value={elem.id}>{elem?.title}</option>;
                                        })}
                                    </select>
                                </Col>
                                {
                                    selectProject === "54545454koa" &&
                                    <Col lg="12">
                                        <div className="my-orders-section-filter">
                                            <input type='text' className='form-control checkout-form'
                                                   name='return-orders-po' value={title}
                                                   onChange={(e) => setTitle(e.target.value)}
                                                   style={{
                                                       fontSize: "14px",
                                                       borderColor: "#ced4da",
                                                       border: "1px solid #eff2f7"
                                                   }}
                                                   placeholder='Name your list...'/>
                                        </div>
                                    </Col>
                                }

                                <Col lg="5">
                                    <div className='product-buttons'
                                         style={{marginBottom: "0"}}>
                                        {
                                            selectProject === "54545454koa" ?
                                                <button onClick={() => addNewProjectAndItem(title)}
                                                        disabled={selectProject === "54545454koa" ? title === "" : ""}
                                                        style={{
                                                            fontSize: "14px",
                                                            padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                        }}
                                                        className='btn btn-solid hover-solid btn-animation'>
                                                    <span>Add to New Project List</span>
                                                </button> :

                                                <button onClick={() => addItem(title)}
                                                        style={{
                                                            fontSize: "14px",
                                                            padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                        }}
                                                        className='btn btn-solid hover-solid btn-animation'>
                                                    <span>Add to Project List</span>
                                                </button>
                                        }
                                    </div>
                                </Col>
                                {err?.errors && (
                                    <Col lg="12">
                                <span
                                    style={{
                                        color: 'var(--theme-color)',
                                        fontWeight: "500",
                                        fontSize: "14px"
                                    }}>{err?.message}</span>
                                    </Col>

                                )}
                            </Row>
                            :
                            <Row className="modal-success g-3 pt-3">
                                <Col lg="12">
                                    <div className='success-icon' style={{backgroundColor: "white", padding: "20px"}}>
                                        <div className='main-container'>
                                            <div className='check-container'>
                                                <div className='check-background'>
                                                    <OrderSuccessSvg/>
                                                </div>
                                                <div className='check-shadow'></div>
                                            </div>
                                        </div>
                                        <h5 style={{fontWeight: "500"}}> {singleProduct.name} successfully added to
                                            Project</h5>

                                    </div>
                                </Col>
                                <Col lg="6">
                                    <div className='product-buttons'
                                         style={{marginBottom: "0"}}>
                                        <button onClick={() => {
                                            setShowModal(false);
                                            setView(false);
                                            setTitle("");
                                        }}
                                                style={{
                                                    fontSize: "14px",
                                                    padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                }}
                                                className='btn btn-solid hover-solid btn-animation'>
                                            <span>Continue Shopping</span>
                                        </button>
                                    </div>
                                </Col>
                                <Col lg="6">
                                    <div className='product-buttons'
                                         style={{marginBottom: "0"}}>
                                        <button onClick={() => {
                                            setShowModal(false);
                                            setView(false);
                                            setTitle("");
                                            router.push(`/my-account/projects/${selectProject}`)
                                        }}

                                                style={{
                                                    fontSize: "14px",
                                                    padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                }}
                                                className='btn btn-solid hover-solid btn-animation'>
                                            <span>View Project</span>
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                    }

                </ModalBody>
            </Modal>

            <Modal scrollable={true}
                   zIndex={1400}
                   size='xs'
                   toggle={() => {
                       setShowAddCartModal(!showAddCartModal);
                   }}
                   isOpen={showAddCartModal}>
                <ModalBody>
                    <Row className="justify-content-center">
                        <Col xs="12">

                            <p>Prior Authorization Required-Verify with your sales associate. SoCal/SoNev. Sales
                                only</p>
                        </Col>
                        <Col xs="2">
                            <div className='product-buttons mb-0'>
                                <a className='btn btn-solid hover-solid btn-animation'
                                   onClick={() => {
                                       AddToCart();
                                       setShowAddCartModal(false);
                                   }}>
                                    <span>Yes</span>
                                </a>
                            </div>
                        </Col>
                        <Col xs="2">
                            <div className='product-buttons mb-0'>
                                <a className='btn btn-solid btn-transparent hover-solid btn-animation'
                                   onClick={() => setShowAddCartModal(false)}>
                                    <span>No</span>
                                </a>
                            </div>
                        </Col>
                    </Row>

                </ModalBody>

            </Modal>
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
        </Col>
    );
};

export default LeftSideContain;
