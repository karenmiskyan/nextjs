import React, {useState, useEffect} from 'react';
import {Col, Container, Input, Label, Modal, ModalBody, Row} from "reactstrap";
import CenterImage from "../../Blog/BlogDetails/CenterImage";
import FormatDetails from "../../Blog/BlogDetails/FormatDetails";
import LeftSidebar from "../../Blog/BlogDetails/LeftSidebar";
import {BiShareAlt, BiStreetView} from "react-icons/bi";
import {SiGooglestreetview} from "react-icons/si";
import {TbMessageHeart} from "react-icons/tb";
import {Btn} from "../../AbstractElements";
import {APICallUrl, Comment, CommonPath, Email, FirstName, LastName, Submit} from "../../Constant";
import * as Yup from "yup";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";

const EventSingle = ({post, domain, blogsPopular, two}) => {
    const [showShare, setShowShare] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const initialValues = {
        name: "",
        lastName: "",
        email: "",
        phone: ""
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    const sendContactForm = (e) => {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${APICallUrl}/api/contact/send`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                "name": `${formik.values.name} ${formik.values.lastName}`,
                "email": formik.values.email,
                "phone": formik.values.phone,
                "content": post?.data?.name,
                "subject": "event"
            })
        })
            .then((res) => res.json()).then((res) => {

            if (res.error === false) {
                setShowForm(false);
                toast.success("Message Send successfully!", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
                setIsLoading(false)
                formik.setFieldValue('name', '');
                formik.setFieldValue('lastName', '');
                formik.setFieldValue('email', '');
                formik.setFieldValue('phone', '');
                // formik.setErrors({
                //     phone: undefined
                // });
            } else {
                toast.error('A problem occurred, please try again later ', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
                setIsLoading(false)

            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to Send Form', error);
                setIsLoading(false)

            });
    }

    // useEffect(() => {
    //     if (formik.values.name === "" && formik.values.lastName === "" && formik.values.email === "") {
    //         formik.setErrors({
    //             phone: undefined
    //         });
    //     }
    // }, [formik])

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: '2-digit'};
        return date.toLocaleDateString('en-US', options);
    };

    // useEffect(() => {
    //     formik.validateForm();
    // }, []);


    const dateString = post?.data?.date;
    const date = new Date(dateString);

    const options = {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <section className='masonary-blog-section pt-0'>
            <Container>
                <Row className='g-4'>
                    <Col xl='9' md='8' className='order-md-1 ratio_square'>
                        <Row className='g-4'>
                            {/*{DetailFilter.map((elem, i) => {*/}
                            {/*  return (*/}
                            <Col xs='12'>
                                <div className='blog-details'>
                                    <CenterImage elem={post?.data}/>
                                    <div className='blog-detail-contain'>
                                        {/*<span className='font-light'>{formatDate(post?.data?.created_at)}</span>*/}
                                        <h1 className='card-title'
                                            style={{fontSize: "calc(22px + 6 * (100vw - 320px) / 1600)"}}>{post?.data?.name}</h1>
                                        <ul className="list-unstyled m-0 p-0 d-flex flex-wrap justify-content-between align-items-center mb-3 mt-3">
                                            <li className=" bg-light p-2 fw-bold text-uppercase mb-1">
                                                {post?.data?.event_type}
                                            </li>
                                            <li className=" bg-light p-2 fw-bold text-uppercase mb-1">Date
                                                - {formattedDate}
                                            </li>

                                            <li className="bg-light p-2 fw-bold text-uppercase  mb-1">
                                                Time: {post?.data?.from} - {post?.data?.to}
                                            </li>
                                            <li className=" bg-light p-2 fw-bold text-uppercase  mb-1">Orginizer
                                                - <a style={{color: "var(--theme-color)", cursor: "pointer"}}
                                                     onClick={() => window.open(`https://${post?.data?.orginizeer_url}`, '_blank')}
                                                >{post?.data?.orginizeer}</a></li>

                                        </ul>
                                        <Row className="mb-3 g-2  border border-1 border-white">
                                            <Col sm="6" xs="12" className="d-flex align-items-center ">
                                                <SiGooglestreetview style={{color: "var(--theme-color)"}}/>
                                                <div
                                                    style={{marginLeft: "6px", cursor: "pointer"}}
                                                    onClick={() => window.open(`https://${post?.data?.view_url}`, '_blank')}>
                                                    View on Map
                                                </div>
                                            </Col>
                                            <Col sm="6" xs="12" className="d-flex align-items-center">
                                                <BiStreetView style={{color: "var(--theme-color)"}}/>
                                                <div
                                                    style={{marginLeft: "6px", cursor: "pointer"}}
                                                    onClick={() => window.open(`https://${post?.data?.direction_url}`, '_blank')}
                                                >
                                                    Get Directions
                                                </div>
                                            </Col>
                                            <Col sm="6" xs="12" className="d-flex align-items-center">
                                                <BiShareAlt style={{color: "var(--theme-color)"}}/>
                                                <div
                                                    onClick={() => setShowShare(true)}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginLeft: "6px"
                                                    }}>Share Event
                                                </div>
                                            </Col>
                                            <Col sm="6" xs="12" className="d-flex align-items-center">
                                                <TbMessageHeart style={{color: "var(--theme-color)"}}/>
                                                <div onClick={() => setShowForm(true)}
                                                     style={{cursor: "pointer", color: "black", marginLeft: "6px"}}>
                                                    RSVP Now
                                                </div>
                                            </Col>
                                        </Row>
                                        {/*<p className='font-light firt-latter'>{elem?.content}</p>*/}

                                    </div>

                                    <div className="blog-detail-custom"
                                         dangerouslySetInnerHTML={{__html: post?.data?.content}}/>

                                </div>
                                {/*<CommentDetails elem={post} />*/}
                            </Col>
                            <Modal scrollable={true}
                                   zIndex={1400}
                                   size='md'
                                   toggle={() => {
                                       setShowShare(!showShare);
                                   }}
                                   isOpen={showShare}>
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
                                                setShowShare(false);
                                            },
                                        }}>
                                        <i className='fas fa-times'
                                           style={{color: "var(--theme-color)"}}></i>
                                    </Btn>
                                    <Row className="modal-success g-3 pt-3">
                                        <Col lg="12">
                                            <h5 style={{fontWeight: "500"}}>Share Event</h5>
                                        </Col>
                                        <Col lg="12">
                                            <Row className="event-share g-3">
                                                <Col sm="2" xs="3">
                                                    <a href={`https://www.facebook.com/sharer.php?u=${domain}${router.asPath}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer nofollow"
                                                       title="Share on Facebook">
                                                        <img src={`${CommonPath}/for-share-social/1.png`} height="60"
                                                             width="60" alt='Facebook'/>
                                                    </a>
                                                </Col>
                                                <Col sm="2" xs="3">
                                                    <a href={`https://twitter.com/intent/tweet?url=${domain}${router.asPath}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer nofollow"
                                                       title="Share on Twitter">
                                                        <img src={`${CommonPath}/for-share-social/2.jpg`} height="60"
                                                             width="60" alt='Twitter'/>
                                                    </a>
                                                </Col>
                                                <Col sm="2" xs="3">
                                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${domain}${router.asPath}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer nofollow"
                                                       title="Share on LinkedIn">
                                                        <img src={`${CommonPath}/for-share-social/3.webp`} height="60"
                                                             width="60" alt='LinkedIn'/>
                                                    </a>
                                                </Col>
                                                <Col sm="2" xs="3">
                                                    <a href={`https://reddit.com/submit?url=${domain}${router.asPath}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer nofollow"
                                                       title="Share on Reddit">
                                                        <img src={`${CommonPath}/for-share-social/4.png`} height="60"
                                                             width="60" alt='Reddit'/>
                                                    </a>
                                                </Col>
                                                <Col sm="2" xs="3">
                                                    <a href={`https://pinterest.com/pin/create/link/?url=${domain}${router.asPath}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer nofollow"
                                                       title="Share on Pinterest">
                                                        <img src={`${CommonPath}/for-share-social/5.png`} height="60"
                                                             width="60" alt='Pinterest'/>
                                                    </a>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>

                            <Modal scrollable={true}
                                   zIndex={1400}
                                   size='lg'
                                   toggle={() => {
                                       setShowForm(!showForm);
                                   }}
                                   isOpen={showForm}>
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
                                                setShowForm(false);
                                            },
                                        }}>
                                        <i className='fas fa-times'
                                           style={{color: "var(--theme-color)"}}></i>
                                    </Btn>
                                    <Row className="modal-success g-3 pt-3">
                                        <Col lg="12">
                                            <h3 style={{fontWeight: "500"}}>RSVP For Event</h3>
                                        </Col>
                                        <Col lg="12">
                                            <Row className='g-4'>
                                                <Col md='6' className="mt-4">
                                                    <Label htmlFor='first' className='form-label required-label'>
                                                        {FirstName}
                                                    </Label>
                                                    <input type='text' className='form-control'
                                                           placeholder='Enter Your First Name'
                                                           name='name'
                                                           value={ltrim(formik.values.name)}
                                                           onChange={formik.handleChange}
                                                           onBlur={formik.handleBlur}/>
                                                    {formik.touched.name && formik.errors.name && (
                                                        <span style={{
                                                            color: 'var(--theme-color)',
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            marginTop: "8px"
                                                        }}>{formik.errors.name}</span>
                                                    )}
                                                </Col>
                                                <Col md='6' className="mt-4">
                                                    <Label htmlFor='last' className='form-label required-label'>
                                                        {LastName}
                                                    </Label>
                                                    <input type='text' className='form-control '
                                                           placeholder='Enter Your Last Name'
                                                           name='lastName'
                                                           value={ltrim(formik.values.lastName)}
                                                           onChange={formik.handleChange}
                                                           onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.lastName && formik.errors.lastName && (
                                                        <span style={{
                                                            color: 'var(--theme-color)',
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            marginTop: "8px"
                                                        }}>{formik.errors.lastName}</span>
                                                    )}
                                                </Col>
                                                <Col md='6' className="mt-4">
                                                    <Label htmlFor='email' className='form-label required-label'>
                                                        {Email}
                                                    </Label>
                                                    <input type='email' className='form-control'
                                                           placeholder='Enter Your Email Address'
                                                           name='email'
                                                           value={formik.values.email}
                                                           onChange={formik.handleChange}
                                                           onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.email && formik.errors.email && (
                                                        <span style={{
                                                            color: 'var(--theme-color)',
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            marginTop: "8px"
                                                        }}>{formik.errors.email}</span>
                                                    )}
                                                </Col>
                                                <Col md='6' className="mt-4">
                                                    <Label htmlFor='phone' className='form-label required-label'>
                                                        Phone
                                                    </Label>
                                                    <input type='text' className='form-control'
                                                           placeholder='Enter Your Phone Number'
                                                           name='phone'
                                                           value={formik.values.phone}
                                                           onChange={(e) => {
                                                               const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                                               formik.setFieldValue('phone', phoneNumber); // Update the formik value
                                                           }}
                                                           onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.phone && formik.errors.email && (
                                                        <span style={{
                                                            color: 'var(--theme-color)',
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            marginTop: "8px"
                                                        }}>{formik.errors.phone}</span>)}
                                                </Col>
                                                {/*<Col md='6'>*/}
                                                {/*  <Label htmlFor='email2' className='form-label'>*/}
                                                {/*    {ConfirmEmail}*/}
                                                {/*  </Label>*/}
                                                {/*  <Input type='email' className='form-control' id='email2' placeholder='Enter Your Confirm Email Address' required />*/}
                                                {/*</Col>*/}


                                                <div className='col-auto'>
                                                    <Btn attrBtn={{
                                                        className: 'btn btn-solid-default',
                                                        onClick: (e) => sendContactForm(e),
                                                        disabled:
                                                            !formik.values.name ||
                                                            !formik.values.lastName ||
                                                            !formik.values.email ||
                                                            !formik.values.phone ||
                                                            formik.errors.name ||
                                                            formik.errors.lastName ||
                                                            formik.errors.email ||
                                                            formik.errors.phone
                                                    }}

                                                    >{Submit}</Btn>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>
                        </Row>
                        {isLoading && (
                            <Backdrop sx={{
                                color: '#fff',
                                zIndex: (theme) => theme.zIndex.drawer + 2000,
                                backgroundColor: "rgba(255, 255, 255, 0.3)"
                            }} open>
                                <CircularProgress color="primary"/>
                            </Backdrop>
                        )}
                    </Col>
                    <LeftSidebar popular={blogsPopular?.data} title="Events" two={two?.data}/>
                </Row>
            </Container>
        </section>
    );
};


export default EventSingle;