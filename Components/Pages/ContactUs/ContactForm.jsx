import React, {useEffect, useState} from 'react';
import {Col, Input, Label, Row} from 'reactstrap';
import {Btn} from '../../AbstractElements';
import {
    APICallUrl,
    Comment,
    ConfirmEmail,
    Contactus,
    Email,
    EmailRequired,
    FirstName,
    LastName,
    Submit
} from '../../Constant';
import {setCoupon} from "../../../ReduxToolkit/Slices/CartSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        name: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").max(18, "Invalid phone number"),
        message: Yup.string().required("Required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    const sendContactForm = () => {
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
                "content": formik.values.message,
                "subject": "KOA Contact Form"
            })
        })
            .then((res) => res.json()).then((res) => {
            if (res.error === false) {
                toast.success("Message Send successfully!", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
                setIsLoading(false)
                formik.setFieldValue('name', '');
                formik.setFieldValue('lastName', '');
                formik.setFieldValue('email', '');
                formik.setFieldValue('phone', '');
                formik.setFieldValue('message', '');


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
                setIsLoading(false)
                console.error('Failed to Send Form', error);
            });
    }

    useEffect(() => {
        if (formik.values.name === "" && formik.values.lastName === "" && formik.values.email === "") {
            formik.setErrors({
                message: undefined
            });
        }
    }, [isLoading])

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    return (
        <Col lg='6'>
            <div className='materialContainer'>
                <div className='material-details'>
                    <div className='title title1 title-effect mb-1 title-left'>
                        <h1>{Contactus}</h1>
                        <p className='ms-0 w-100'>{EmailRequired}</p>
                    </div>
                </div>
                <Row className='g-4 mt-md-1 mt-2'>
                    <Col md='6'>
                        <Label htmlFor='first' className='form-label required-label'>
                            {FirstName}
                        </Label>
                        <Input type='text' className='form-control' placeholder='Enter Your First Name'
                               name='name'
                               value={ltrim(formik.values.name)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               />
                        {formik.touched.name && formik.errors.name && (
                            <span style={{
                                color: 'var(--theme-color)',
                                fontSize: "14px",
                                fontWeight: "500",
                                marginTop: "8px"
                            }}>{formik.errors.name}</span>
                        )}
                    </Col>
                    <Col md='6'>
                        <Label htmlFor='last' className='form-label required-label'>
                            {LastName}
                        </Label>
                        <Input type='text' className='form-control ' placeholder='Enter Your Last Name'
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
                    <Col md='6'>
                        <Label htmlFor='email' className='form-label required-label'>
                            {Email}
                        </Label>
                        <Input type='email' className='form-control' id='email' placeholder='Enter Your Email Address'
                               name='email'
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               required/>
                        {formik.touched.email && formik.errors.email && (
                            <span style={{
                                color: 'var(--theme-color)',
                                fontSize: "14px",
                                fontWeight: "500",
                                marginTop: "8px"
                            }}>{formik.errors.email}</span>
                        )}
                    </Col>
                    <Col md='6'>
                        <Label htmlFor='phone' className='form-label '>
                            Phone
                        </Label>
                        <Input type='text' className='form-control' id='email' placeholder='Enter Your Phone Number'
                               name='phone'
                               value={formik.values.phone}
                               onChange={(e) => {
                                   const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                   formik.setFieldValue('phone', phoneNumber); // Update the formik value
                               }}
                               onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone &&
                            <span style={{
                                color: 'var(--theme-color)',
                                fontSize: "14px",
                                fontWeight: "500",
                                marginTop: "8px"
                            }}>{formik.errors.phone}</span>}
                    </Col>
                    {/*<Col md='6'>*/}
                    {/*  <Label htmlFor='email2' className='form-label'>*/}
                    {/*    {ConfirmEmail}*/}
                    {/*  </Label>*/}
                    {/*  <Input type='email' className='form-control' id='email2' placeholder='Enter Your Confirm Email Address' required />*/}
                    {/*</Col>*/}

                    <Col xs='12'>
                        <Label htmlFor='comment' className='form-label required-label'>
                            {Comment}
                        </Label>
                        <textarea className='form-control' id='comment' rows='5'
                                  name='message'
                                  value={formik.values.message}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.touched.message && formik.errors.message && (
                            <span style={{
                                color: 'var(--theme-color)',
                                fontSize: "14px",
                                fontWeight: "500",
                                marginTop: "8px"
                            }}>{formik.errors.message}</span>
                        )}
                    </Col>

                    <div className='col-auto'>
                        <Btn attrBtn={{
                            className: 'btn btn-solid-default',
                            onClick: () => sendContactForm(),
                            disabled:
                                !formik.values.name ||
                                !formik.values.lastName ||
                                !formik.values.email ||
                                !formik.values.message ||
                                formik.errors.name ||
                                formik.errors.lastName ||
                                formik.errors.email ||
                                formik.errors.message
                        }}

                        >{Submit}</Btn>
                    </div>
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
            </div>
        </Col>
    );
};

export default ContactForm;
