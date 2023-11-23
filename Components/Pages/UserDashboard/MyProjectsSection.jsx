import React, {useEffect, useState} from 'react';
import {Container, Col, Row, Modal, ModalBody} from "reactstrap";
import NavSection from "../../Products/Common/NavSection";
import {APICallUrl} from "../../Constant";
import {useSelector} from "react-redux";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Btn} from "../../AbstractElements";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";
import {useRouter} from "next/router";

const MyProjectsSection = () => {

    const loginToken = useSelector(selectLoginToken);

    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [editingProjectIndex, setEditingProjectIndex] = useState(-1);

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");

    const [err, setErr] = useState({});
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
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
    }, [loginToken]);

    const getProject = (id) => {

        setLoading(true);
        fetch(`${APICallUrl}/api/projects/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {

            // setProjects(res?.projects);
            setLoading(false);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Project', error);
                setLoading(false);
            });
    }


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
                toast.success(`List Added Successfully`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
                fetch(`${APICallUrl}/api/projects`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {
                    setProjects(res?.projects);
                    setTitle("");
                    setShowModal(false);
                    setLoading(false);
                })
                    .catch((error) => {
                        // Handle general fetch error
                        console.error('Failed to get Projects', error);
                        setLoading(false);
                    });
            }  else {
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

    const rename = (id, text) => {
        setLoading(true);
        fetch(`${APICallUrl}/api/projects/${id}`, {
            method: 'PUT',
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
                toast.success(`Project Rename Successfully`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });

                fetch(`${APICallUrl}/api/projects`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {

                    setEditingProjectIndex(-1);
                    setTitle("");
                    setProjects(res?.projects);
                    setLoading(false);
                })
                    .catch((error) => {
                        // Handle general fetch error
                        console.error('Failed to get Projects', error);
                        setLoading(false);
                    });
            } else {
                // setErr(res);
                toast.error(`${res?.message}`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
                setLoading(false);
            }


        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Projects', error);
                setLoading(false);
            });
    }

    const deleteProject = (id) => {
        setLoading(true);
        fetch(`${APICallUrl}/api/projects/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },

        })
            .then((res) => res.json()).then((res) => {


            if (res?.success === true) {
                toast.success(`Project Deleted Successfully`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
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
            } else {
                // setErr(res);
                toast.error(`${res?.message}`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
                setLoading(false);
            }


        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get Projects', error);
                setLoading(false);
            });
    }





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

    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container style={{position:"relative"}}>
                <Row>
                    <h2 style={{marginBottom: "26px"}}>My Projects</h2>

                    <Col lg="12">
                        <Row className="table-responsive">
                            <div className="sc-dmctIk WQNxq">
                                <Col lg="12" xs="12">
                                    <div className="my-orders-section-info">
                                        <Row style={{width: "100%"}}>
                                            <Col lg="6" xs="6">
                                                <div className="my-orders-section-info-name"><h5>NAME</h5></div>
                                            </Col>
                                            <Col lg="6" xs="6">
                                                <div className="my-orders-section-info-name"><h5>DATE ADDED</h5></div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                {
                                    projects?.length > 0 ? (
                                        projects
                                            .slice()
                                            .sort((a, b) => new Date(a?.created_at) - new Date(b?.created_at))
                                            .map((el, index) => (
                                                <Col lg="12" key={el?.id} style={{position: "relative"}}>
                                                    {
                                                        el.system !== 1 &&
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
                                                                onClick: () => deleteProject(el.id)

                                                            }}>
                                                            <i className='fas fa-times'
                                                               style={{color: "var(--theme-color)"}}></i>
                                                        </Btn>

                                                    }
                                                    <Row className="my-orders-section-single-product">
                                                        <Col lg="6" xs="6">
                                                            <Row>
                                                                <Col lg="6" xs="12">
                                                                    {editingProjectIndex === index ? (
                                                                        <div
                                                                            className="my-orders-section-single-product-name"
                                                                            style={{maxWidth: "100%"}}>
                                                                            <input
                                                                                type='text'
                                                                                className='form-control checkout-form'
                                                                                name='return-orders-po'
                                                                                value={title}
                                                                                onChange={(e) => setTitle(e.target.value)}
                                                                                style={{
                                                                                    fontSize: "14px",
                                                                                    borderColor: "#ced4da",
                                                                                    border: "1px solid #eff2f7"
                                                                                }}
                                                                                placeholder='Name your list...'
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            className="my-orders-section-single-product-name"
                                                                            style={{maxWidth: "100%"}}>
                                                                            <h5>{el?.title}</h5>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                                <Col lg="6" xs="12">
                                                                    {editingProjectIndex !== index ? (
                                                                            <div
                                                                                className="my-orders-section-single-product-name"
                                                                                style={{maxWidth: "100%"}}
                                                                            >
                                                                                <img
                                                                                    onClick={() => {
                                                                                        setEditingProjectIndex(index);
                                                                                        setTitle(el.title);
                                                                                    }}
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                        width: '18px',
                                                                                        margin: "0 6px 0 0"
                                                                                    }}
                                                                                    src={"/assets/images/rename.png"}
                                                                                />
                                                                                <h5 style={{cursor: "pointer"}}
                                                                                    onClick={() => {
                                                                                        setEditingProjectIndex(index);
                                                                                        setTitle(el.title);
                                                                                    }}>Rename</h5>
                                                                            </div>
                                                                        ) :
                                                                        <div
                                                                            className="my-orders-section-single-product-name"
                                                                            style={{maxWidth: "100%",}}>
                                                                            <BsFillCheckCircleFill size={26} style={{
                                                                                margin: "0 10px",
                                                                                color: "#008000"
                                                                            }} onClick={() => rename(el.id, title)}/>
                                                                            <AiFillCloseCircle size={30} style={{
                                                                                margin: " 0 10px ",
                                                                                color: "var(--theme-color)"
                                                                            }} onClick={() => {
                                                                                setEditingProjectIndex(-1);
                                                                                setTitle("");
                                                                            }}/>
                                                                        </div>
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6" xs="6">
                                                            <Row>
                                                                <Col lg="6" xs="12">
                                                                    <div
                                                                        className="my-orders-section-single-product-name"
                                                                        style={{maxWidth: "100%"}}>
                                                                        <h5>{formatDate(el?.created_at)}</h5></div>
                                                                </Col>
                                                                <Col lg="4" style={{marginLeft: "auto"}}
                                                                     className="d-flex align-items-center">
                                                                    <div
                                                                        className="my-orders-section-single-product-name">
                                                                        <div className='product-buttons'
                                                                             style={{marginBottom: "0"}}>
                                                                            <a onClick={() => router.push(`/my-account/projects/${el?.id}`)}
                                                                               className='btn btn-solid btn-transparent hover-solid btn-animation view-details'>
                                                                                <span>View Details</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            ))
                                    ) : !loading ? (
                                        <h4 className="d-flex justify-content-center mt-5">Projects not found</h4>
                                    ) : ""

                                }


                            </div>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <div style={{display: "flex", justifyContent: "end", margin: "30px 0"}}>

                                    <div className='product-buttons'
                                         style={{margin: "0 10px 0 0", maxWidth: '230px', width: "100%"}}>
                                        {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                        <button onClick={() => setShowModal(true)}
                                                disabled={editingProjectIndex !== -1}
                                                className='btn btn-solid hover-solid btn-animation'>
                                            <span>Create New Project</span>
                                        </button>
                                    </div>

                                    {/*<div className='product-buttons'*/}
                                    {/*     style={{margin: "0 0 0 10px", maxWidth: '230px', width: "100%"}}>*/}
                                    {/*    /!*<ProductWishListAction singleProduct={singleProduct} />*!/*/}
                                    {/*    <a href='#javascript' id='cartEffect'*/}
                                    {/*       className='btn btn-solid hover-solid btn-animation'>*/}
                                    {/*        /!*<i className='fa fa-shopping-cart'></i>*!/*/}
                                    {/*        <span>Save Projects</span>*/}
                                    {/*    </a>*/}
                                    {/*</div>*/}

                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal scrollable={true}
                       zIndex={1400}
                    // size='lg'
                       toggle={() => {
                           setShowModal(!showModal);
                           setErr({});
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
                                    setShowModal(false);
                                    setErr({});

                                },
                            }}>
                            <i className='fas fa-times'
                               style={{color: "var(--theme-color)"}}></i>
                        </Btn>

                        <Row className="modal-success g-3">
                            <Col lg="12">
                                <h5 style={{fontWeight: "500"}}>CREATE PROJECT</h5>
                            </Col>

                            <Col lg="8">
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
                                        <span>Add List</span>
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
            </Container>
        </section>
    );
};

export default MyProjectsSection;