import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {APICallUrl,APIImage} from "../../Constant";
import {Button, Col, Container, Input, Modal, ModalBody, Row} from "reactstrap";
import NavSection from "../../Products/Common/NavSection";
import {Btn} from "../../AbstractElements";
import {Backdrop, CircularProgress, Skeleton} from "@mui/material";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import {MdFolderCopy, MdOutlineDeleteForever} from "react-icons/md";
import {ShoppingCart} from "react-feather";
import {FiLogOut} from "react-icons/fi";
import {setLoadingCart, setNewCartProduct} from "../../../ReduxToolkit/Slices/CartSlice";
import {toast} from "react-toastify";
import addToCart from "../../Element/AddToCart";
import {OrderSuccessSvg} from "../../../Data/SVG";
import {AiFillPlusSquare} from "react-icons/ai";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {useRouter} from "next/router";
import formatMoney from "../../../Utils/monayFormat";

const MyProject = ({project, setProject, s}) => {

    const loginToken = useSelector(selectLoginToken);
    const dispatch = useDispatch();
    const router = useRouter();
    const [active, setActive] = useState(1);

    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectProject, setSelectProject] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [err, setErr] = useState({});
    const [view, setView] = useState(false);
    const [newProject, setNewProject] = useState({});

    const [moveTo, setMoveTo] = useState(false);

    const [selectedItems, setSelectedItems] = useState([]);


    const handleAddAllToCart = () => {
        setSelectedItems([...project.project_items]);
        fetch(`${APICallUrl}/api/project/add-cart`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "project_id": project?.id,
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

    const handleAddSelectedToCart = () => {

        fetch(`${APICallUrl}/api/project/add-cart`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "item_ids": selectedItems.map(el => el.id),
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


    useEffect(() => {
        fetch(`${APICallUrl}/api/projects`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {
            setProjects(res?.projects);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Projects', error);
            });
    }, [loginToken, view]);

    useEffect(() => {
        if (moveTo) {
            const systemProject = projects?.find(el => el.system === 1);
            if (systemProject) {
                setSelectProject(systemProject.id);
            }
        }
    }, [moveTo]);

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


    const deleteItem = (id, check) => {
        setLoading(true);
        fetch(`${APICallUrl}/api/project/items/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
        })
            .then((res) => res.json()).then((res) => {
            // dispatch(setNewCartProduct(res))

            if (res.success === true) {
                fetch(`${APICallUrl}/api/projects/${project?.id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {
                    if (res?.project) {
                        setProject(res);
                        setLoading(false);
                        if (check) {
                            toast.success(`Item Removed Successfully`, {
                                position: toast.POSITION.BOTTOM_LEFT,
                                autoClose: 2000
                            });
                        }
                    }
                    setLoading(false);

                })
                    .catch((error) => {
                        // Handle general fetch error
                        console.error('Failed to get Project', error);
                        setLoading(false);
                    });
            }

        })
    }

    const AddToCart = (count, productId) => {
        fetch(`${APICallUrl}/api/add-card`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "product_id": Number(productId),
                "qty": Number(count)
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

    const createProject = (text) => {
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


    const addItem = (count, id, elId, projectId) => {
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
                    "product_id": id,
                    "description": "asd"
                }),
            })
                .then((res) => res.json()).then((res) => {

                if (res?.success === true) {
                    toast.success(`Product Moved Successfully`, {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000
                    });
                    deleteItem(elId, false);
                    setView(true);
                    setTitle("");

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

    const addNewProjectAndItem = (text, count, id, elId) => {

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
                addItem(count, id, elId, res?.project?.id);
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


    function formatMSRP(amount) {
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
    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Row>
                    <h2 style={{marginBottom: "26px"}}>{project?.title}</h2>
                    <Col lg="12">
                        <Row style={{gridGap: "24px 0"}}>

                            <Col lg="12">
                                <Row className="g-3">
                                    <Col xl="2" lg="3" md="4">
                                        <div className="my-orders-section-filter">
                                            <h5 onClick={() => setShowModal(true)}
                                                style={{cursor: "pointer", width: "fit-content"}}>
                                                <AiFillPlusSquare size={22}
                                                                  style={{
                                                                      marginRight: "4px",
                                                                      color: "var(--theme-color)"
                                                                  }}/>Create New Project</h5>
                                        </div>
                                    </Col>
                                    <Col xl="2" lg="3" md="4">
                                        <div className="my-orders-section-filter">

                                            <h5 style={{cursor: "pointer", width: "fit-content"}}
                                                onClick={() => router.push("/my-account/manage-projects")}>
                                                <MdFolderCopy size={22}
                                                              style={{
                                                                  marginRight: "4px",
                                                                  color: "var(--theme-color)"
                                                              }}/>My Projects</h5>


                                        </div>
                                    </Col>
                                    <Col xl="2" lg="3" md="4">
                                        <div className="my-orders-section-filter">
                                            <h5 style={{cursor: "pointer", width: "fit-content"}}
                                                onClick={() => router.push("/shop")}>
                                                <IoIosArrowDropleftCircle size={22}
                                                                          style={{
                                                                              marginRight: "4px",
                                                                              color: "var(--theme-color)"
                                                                          }}/>Continue Shopping</h5>

                                        </div>
                                    </Col>

                                </Row>
                            </Col>

                            <Col lg="12">
                                <Row className="table-responsive">
                                    <div className="sc-dmctIk WQNxq">
                                        <Col lg="12" style={{display: "table"}}>
                                            <div className="my-orders-section-info">
                                                {/*<div className="my-orders-section-info-name"><h5>RETURN</h5></div>*/}
                                                <div className="my-orders-section-info-name"><h5>ITEMS</h5></div>
                                                <div className="my-orders-section-info-name"><h5>PRODUCT NAME</h5></div>
                                                {/*<div className="my-orders-section-info-name"><h5>PO #</h5></div>*/}
                                                {/*<div className="my-orders-section-info-name"><h5>REFERENCE #</h5></div>*/}
                                                <div className="my-orders-section-info-name"><h5>DATE ADDED</h5></div>
                                                {/*<div className="my-orders-section-info-name"><h5>TOTAL</h5></div>*/}
                                                <div className="my-orders-section-info-name"><h5>QTY</h5></div>
                                                <div className="my-orders-section-info-name"><h5>UNIT PRICE </h5></div>
                                                {/*<div className="my-orders-section-info-name"><h5>Image</h5></div>*/}
                                                <div
                                                    style={{
                                                        minWidth: "40px",
                                                        maxWidth: "60px",
                                                        margin: "0",
                                                        width: "100%"
                                                    }}></div>
                                                {/*<div data-tag="allowRowEvents"><a href="#javascript"><i*/}
                                                {/*    className="far fa-eye"></i></a></div>*/}
                                            </div>
                                        </Col>
                                        {
                                            project?.project_items?.length > 0 ? (
                                                project?.project_items
                                                    .slice() // Create a copy of the array to avoid mutating the original data
                                                    .sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)) // Sort by created_at date
                                                    .map((el, i) => (
                                                        <Col lg="12" style={{display: "table"}} key={i}>
                                                            <div className="my-orders-section-single-product"
                                                                 style={{position: "relative"}}>
                                                                <div className="my-orders-section-single-product-name">
                                                                    {/*<h5>{el.product.}</h5>*/}
                                                                    <input className='checkbox_animated check-it'
                                                                           type='checkbox' style={{top: "0px"}}
                                                                           checked={selectedItems.some(item => item.id === el.id)}
                                                                           onChange={(e) => {
                                                                               const isChecked = e.target.checked;
                                                                               if (isChecked) {
                                                                                   setSelectedItems(prevSelected => [...prevSelected, el]);
                                                                               } else {
                                                                                   setSelectedItems(prevSelected => prevSelected.filter(item => item.id !== el.id));
                                                                               }
                                                                           }}
                                                                    />
                                                                    <Link style={{margin: "0 auto"}}
                                                                          href={`/${el?.product?.slugable?.prefix}/${el?.product?.slugable?.key}`}>

                                                                        <img
                                                                            src={`${APIImage}/${el?.product?.image}`}
                                                                            style={{
                                                                                maxWidth: "120px",
                                                                                maxHeight: "120px"
                                                                            }}
                                                                            alt={el?.product?.name}
                                                                            title={el?.product?.name}
                                                                        />
                                                                    </Link>

                                                                </div>
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5 style={{cursor: "pointer"}}
                                                                        onClick={() => router.push(`/${el?.product?.slugable?.prefix}/${el?.product?.slugable?.key}`)}>
                                                                        {el?.product?.name}</h5>
                                                                </div>
                                                                <div className="my-orders-section-single-product-name">
                                                                    <h5>{formatDate(el?.created_at)}</h5></div>

                                                                <div className="my-orders-section-single-product-name">

                                                                    <Input type='number' className='form-control'
                                                                           style={{borderRadius: "22px"}}
                                                                        // defaultValue={item.qty > item.product.quantity ? item.product.quantity : item.qty}
                                                                           value={el?.qty > el.product.quantity && el.product.quantity !== 0 ? el.product.quantity : el?.qty}
                                                                           min={1}
                                                                           max={el?.product?.quantity === 0 ? 999 : el?.product?.quantity}
                                                                           onChange={(e) => {
                                                                               setLoading(true)
                                                                               const value = parseInt(e.target.value);

                                                                               if (isNaN(value)) {
                                                                                   // If the entered value is not a number, set it to the minimum value
                                                                                   e.target.value = 1;
                                                                                   setLoading(false);
                                                                               } else if (value < 1) {
                                                                                   // If the entered value is less than 1, set it to the minimum value
                                                                                   e.target.value = 1;
                                                                                   fetch(`${APICallUrl}/api/project/items/${el.id}`, {
                                                                                       method: 'PUT',
                                                                                       headers: {
                                                                                           "Content-Type": "application/json;charset=UTF-8",
                                                                                           Authorization: `Bearer ${loginToken.token}`
                                                                                       },
                                                                                       body: JSON.stringify({
                                                                                           "project_id": project.id,
                                                                                           "qty": 1,
                                                                                           "description": "asdd",
                                                                                       }),
                                                                                   })
                                                                                       .then((res) => res.json()).then((res) => {
                                                                                       // dispatch(setNewCartProduct(res))

                                                                                       if (res.success === true) {
                                                                                           fetch(`${APICallUrl}/api/projects/${project.id}`, {
                                                                                               method: 'GET',
                                                                                               headers: {
                                                                                                   "Content-Type": "application/json;charset=UTF-8",
                                                                                                   Authorization: `Bearer ${loginToken.token}`
                                                                                               }
                                                                                           })
                                                                                               .then((res) => res.json()).then((res) => {
                                                                                               if (res?.project) {
                                                                                                   setProject(res)
                                                                                                   setLoading(false);
                                                                                               }
                                                                                               setLoading(false);

                                                                                           })
                                                                                               .catch((error) => {
                                                                                                   // Handle general fetch error
                                                                                                   console.error('Failed to get Project', error);
                                                                                                   setLoading(false);
                                                                                               });
                                                                                       }

                                                                                   })

                                                                               } else if (value > el.product.quantity && el.product.quantity !== 0 || value > 999) {

                                                                                   // If the entered value is greater than the maximum quantity, set it to the maximum value
                                                                                   e.target.value = el.qty;
                                                                                   fetch(`${APICallUrl}/api/project/items/${el.id}`, {
                                                                                       method: 'PUT',
                                                                                       headers: {
                                                                                           "Content-Type": "application/json;charset=UTF-8",
                                                                                           Authorization: `Bearer ${loginToken.token}`
                                                                                       },
                                                                                       body: JSON.stringify({
                                                                                           "project_id": project.id,
                                                                                           "qty": el?.qty,
                                                                                           "description": "asdd",
                                                                                       }),
                                                                                   })
                                                                                       .then((res) => res.json()).then((res) => {
                                                                                       if (res.success === true) {
                                                                                           fetch(`${APICallUrl}/api/projects/${project.id}`, {
                                                                                               method: 'GET',
                                                                                               headers: {
                                                                                                   "Content-Type": "application/json;charset=UTF-8",
                                                                                                   Authorization: `Bearer ${loginToken.token}`
                                                                                               }
                                                                                           })
                                                                                               .then((res) => res.json()).then((res) => {
                                                                                               if (res?.project) {
                                                                                                   setProject(res)
                                                                                                   setLoading(false);
                                                                                               }
                                                                                               setLoading(false);

                                                                                           })
                                                                                               .catch((error) => {
                                                                                                   // Handle general fetch error
                                                                                                   console.error('Failed to get Project', error);
                                                                                                   setLoading(false);
                                                                                               });
                                                                                       }

                                                                                       // dispatch(setNewCartProduct(res))

                                                                                       toast.warning(`There are ${(el?.qty > el.product.quantity && el.product.quantity !== 0 ? el.product.quantity : el?.qty)} items in stock.`, {
                                                                                           position: toast.POSITION.BOTTOM_LEFT,
                                                                                           autoClose: 2000
                                                                                       });
                                                                                   })

                                                                               } else {
                                                                                   fetch(`${APICallUrl}/api/project/items/${el.id}`, {
                                                                                       method: 'PUT',
                                                                                       headers: {
                                                                                           "Content-Type": "application/json;charset=UTF-8",
                                                                                           Authorization: `Bearer ${loginToken.token}`
                                                                                       },
                                                                                       body: JSON.stringify({
                                                                                           "project_id": project.id,
                                                                                           "qty": e.target.value,
                                                                                           "description": "asdd",
                                                                                       }),
                                                                                   })
                                                                                       .then((res) => res.json()).then((res) => {
                                                                                       // dispatch(setNewCartProduct(res));
                                                                                       if (res.success === true) {
                                                                                           fetch(`${APICallUrl}/api/projects/${project.id}`, {
                                                                                               method: 'GET',
                                                                                               headers: {
                                                                                                   "Content-Type": "application/json;charset=UTF-8",
                                                                                                   Authorization: `Bearer ${loginToken.token}`
                                                                                               }
                                                                                           })
                                                                                               .then((res) => res.json()).then((res) => {
                                                                                               if (res?.project) {
                                                                                                   setProject(res)
                                                                                                   setLoading(false);
                                                                                               }
                                                                                               setLoading(false);

                                                                                           })
                                                                                               .catch((error) => {
                                                                                                   // Handle general fetch error
                                                                                                   console.error('Failed to get Project', error);
                                                                                                   setLoading(false);
                                                                                               });
                                                                                       }

                                                                                   })

                                                                               }
                                                                           }}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="my-orders-section-single-product-name flex-column justify-content-center align-items-lg-start">
                                                                    <h5 className="mb-2">PRICE: {formatMoney(Number(el?.product?.front_sale_price))}</h5>
                                                                    <h5>MSRP: {formatMSRP(Number(el?.product?.msrp_price))}</h5>
                                                                </div>

                                                                <div style={{
                                                                    minWidth: "40px",
                                                                    maxWidth: "60px",
                                                                    margin: "0",
                                                                    width: "100%",
                                                                    textAlign: "end",
                                                                    display: "grid",
                                                                    gap: "10px",
                                                                    position: "absolute",
                                                                    right: "2%"
                                                                }}>
                                                                    <div>
                                                                        <MdOutlineDeleteForever
                                                                            onClick={() => deleteItem(el.id, true)}
                                                                            size={26}
                                                                            style={{
                                                                                cursor: "pointer",
                                                                                color: "var(--theme-color)",
                                                                                border: "1px solid var(--theme-color)"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <ShoppingCart
                                                                            onClick={() => AddToCart(el?.qty, el?.product_id)}
                                                                            size={26} style={{
                                                                            cursor: "pointer",
                                                                            backgroundColor: "var(--theme-color)",
                                                                            color: "white",
                                                                            padding: "4px"
                                                                        }}/>
                                                                    </div>
                                                                    <div>
                                                                        <FiLogOut onClick={() => setMoveTo(true)}
                                                                                  size={26} style={{
                                                                            cursor: "pointer",
                                                                            backgroundColor: "#EFF2F7",
                                                                            color: "black",
                                                                            padding: "4px"
                                                                        }}/>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <Modal scrollable={true}
                                                                   zIndex={1400}
                                                                // size='lg'
                                                                   toggle={() => {
                                                                       setSelectProject("1");
                                                                       setMoveTo(!moveTo);
                                                                       setView(false);
                                                                       setTitle("");
                                                                       setErr({});
                                                                   }}
                                                                   isOpen={moveTo}>
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
                                                                                setMoveTo(false);
                                                                                setView(false);
                                                                                setTitle("");
                                                                                setErr({});
                                                                            },
                                                                        }}>
                                                                        <i className='fas fa-times'
                                                                           style={{color: "var(--theme-color)"}}></i>
                                                                    </Btn>
                                                                    {
                                                                        !view ?
                                                                            <Row className="modal-success g-3">
                                                                                <Col lg="12">
                                                                                    <h5 style={{fontWeight: "500"}}>Move
                                                                                        to:</h5>
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
                                                                                            return elem.id !== el.project_id &&
                                                                                                <option key={i}
                                                                                                        value={elem.id}>{elem?.title}</option>;
                                                                                        })}
                                                                                    </select>
                                                                                </Col>
                                                                                {
                                                                                    selectProject === "54545454koa" &&
                                                                                    <Col lg="12">
                                                                                        <div
                                                                                            className="my-orders-section-filter">
                                                                                            <input type='text'
                                                                                                   className='form-control checkout-form'
                                                                                                   name='return-orders-po'
                                                                                                   value={title}
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
                                                                                                <button
                                                                                                    onClick={() => addNewProjectAndItem(title, el.qty, el.product_id, el.id)}
                                                                                                    disabled={selectProject === "54545454koa" ? title === "" : ""}
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                                                                    }}
                                                                                                    className='btn btn-solid hover-solid btn-animation'>
                                                                                                    <span>Move to New Project</span>
                                                                                                </button>
                                                                                                :
                                                                                                <button
                                                                                                    onClick={() => addItem(el.qty, el.product_id, el.id)}
                                                                                                    // disabled={selectProject === "54545454koa" ? title === "" : ""}
                                                                                                    style={{
                                                                                                        fontSize: "14px",
                                                                                                        padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                                                                    }}
                                                                                                    className='btn btn-solid hover-solid btn-animation'>
                                                                                                    <span>Move to Project</span>
                                                                                                </button>
                                                                                        }
                                                                                    </div>
                                                                                </Col>
                                                                                {err?.errors && (
                                                                                    <Col lg="12"><span
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
                                                                                    <div className='success-icon'
                                                                                         style={{
                                                                                             backgroundColor: "white",
                                                                                             padding: "20px"
                                                                                         }}>
                                                                                        <div className='main-container'>
                                                                                            <div
                                                                                                className='check-container'>
                                                                                                <div
                                                                                                    className='check-background'>
                                                                                                    <OrderSuccessSvg/>
                                                                                                </div>
                                                                                                <div
                                                                                                    className='check-shadow'></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <h5 style={{
                                                                                            fontWeight: "500",
                                                                                            textAlign: "center"
                                                                                        }}>Successfully
                                                                                            Moved to Project</h5>

                                                                                    </div>
                                                                                </Col>
                                                                                <Col lg="6">
                                                                                    <div className='product-buttons'
                                                                                         style={{marginBottom: "0"}}>
                                                                                        <button onClick={() => {
                                                                                            setMoveTo(false);
                                                                                            setView(false);
                                                                                            setTitle("");
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
                                                                                <Col lg="6">
                                                                                    <div className='product-buttons'
                                                                                         style={{marginBottom: "0"}}>
                                                                                        <button onClick={() => {
                                                                                            setShowModal(false);
                                                                                            setView(false);
                                                                                            setMoveTo(false);
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
                                                        </Col>

                                                    ))
                                            ) : !loading ? (
                                                <>
                                                    {
                                                        !s &&
                                                        <h4 className="d-flex justify-content-center mt-5">Items not
                                                            found</h4>
                                                    }
                                                    {
                                                        view &&
                                                        <Modal scrollable={true}
                                                               zIndex={1400}
                                                            // size='lg'
                                                               toggle={() => {
                                                                   setSelectProject("1");
                                                                   setMoveTo(!moveTo);
                                                                   setView(false);
                                                                   setTitle("");
                                                                   setErr({});
                                                               }}
                                                               isOpen={moveTo}>
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
                                                                            setMoveTo(false);
                                                                            setView(false);
                                                                            setTitle("");
                                                                            setErr({});
                                                                        },
                                                                    }}>
                                                                    <i className='fas fa-times'
                                                                       style={{color: "var(--theme-color)"}}></i>
                                                                </Btn>
                                                                <Row className="modal-success g-3 pt-3">
                                                                    <Col lg="12">
                                                                        <div className='success-icon'
                                                                             style={{
                                                                                 backgroundColor: "white",
                                                                                 padding: "20px"
                                                                             }}>
                                                                            <div className='main-container'>
                                                                                <div
                                                                                    className='check-container'>
                                                                                    <div
                                                                                        className='check-background'>
                                                                                        <OrderSuccessSvg/>
                                                                                    </div>
                                                                                    <div
                                                                                        className='check-shadow'></div>
                                                                                </div>
                                                                            </div>
                                                                            <h5 style={{
                                                                                fontWeight: "500",
                                                                                textAlign: "center"
                                                                            }}>Successfully
                                                                                Moved to Project</h5>

                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div className='product-buttons'
                                                                             style={{marginBottom: "0"}}>
                                                                            <button onClick={() => {
                                                                                setSelectProject("1");
                                                                                setMoveTo(false);
                                                                                setView(false);
                                                                                setTitle("");
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
                                                                    <Col lg="6">
                                                                        <div className='product-buttons'
                                                                             style={{marginBottom: "0"}}>
                                                                            <button onClick={() => {
                                                                                setShowModal(false);
                                                                                setView(false);
                                                                                setMoveTo(false);
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
                                                            </ModalBody>
                                                        </Modal>
                                                    }
                                                </>
                                            ) : ""
                                        }

                                        <Modal scrollable={true}
                                               zIndex={1400}
                                            // size='lg'
                                               toggle={() => {
                                                   setSelectProject("1");
                                                   setShowModal(!showModal);
                                                   setErr({});
                                                   setView(false);
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
                                                            setErr({});
                                                            setView(false);
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
                                                                <h5 style={{fontWeight: "500"}}>Create Project</h5>
                                                            </Col>

                                                            <Col lg="8">
                                                                <div className="my-orders-section-filter">
                                                                    <input type='text'
                                                                           className='form-control checkout-form'
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
                                                            <Col lg="4">
                                                                <div className='product-buttons'
                                                                     style={{marginBottom: "0"}}>
                                                                    <button onClick={() => createProject(title)}
                                                                            disabled={title === ""}
                                                                            style={{
                                                                                fontSize: "14px",
                                                                                padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                                                            }}
                                                                            className='btn btn-solid hover-solid btn-animation'>
                                                                        <span>Add Project</span>
                                                                    </button>
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
                                                                <h5 style={{fontWeight: "500"}}> Project Created
                                                                    Successfully</h5>
                                                            </Col>
                                                            <Col lg="6">
                                                                <div className='product-buttons'
                                                                     style={{marginBottom: "0"}}>
                                                                    <button onClick={() => {
                                                                        setSelectProject("1");
                                                                        setShowModal(false);
                                                                        setView(false);
                                                                        setTitle("");

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

                                    </div>

                                </Row>

                            </Col>
                            <Col lg="12">
                                <Row className="justify-content-end g-3">
                                    <Col xl="2" lg="3" sm="6">
                                        <div className='product-buttons' style={{marginBottom: "0"}}>
                                            {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                            <Button onClick={handleAddSelectedToCart}
                                                    disabled={selectedItems.length === 0}
                                                    className='btn btn-solid btn-transparent hover-solid btn-animation quick-order-button'>
                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                <span>Add Selected To Cart</span>
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xl="2" lg="3" sm="6">
                                        <div className='product-buttons' style={{marginBottom: "0"}}>
                                            <Button onClick={handleAddAllToCart}
                                                    disabled={project === null || project?.project_items?.length === 0}
                                                    className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                                <span>Add All To Cart</span>
                                            </Button>
                                        </div>
                                    </Col>

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
            </Container>
        </section>
    );
};

export default MyProject;