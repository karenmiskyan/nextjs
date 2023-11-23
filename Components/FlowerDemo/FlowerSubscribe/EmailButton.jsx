import React from 'react';
import {Col, Input, InputGroup} from 'reactstrap';
import {Btn} from '../../AbstractElements';
import {APICallUrl, Submit} from '../../Constant';
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";

const EmailButton = () => {


    const initialValues = {
        email: "",
    }


    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid format"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    const sendEmail = () => {
        fetch(`${APICallUrl}/api/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                "email": formik.values.email,
            })
        })
            .then((res) => res.json()).then((res) => {

            if (res.error === false) {
                toast.success(res.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
                formik.setFieldValue('email', '');

            } else {
                toast.error('A problem occurred, please try again later ', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to send Email', error);
            });
    }
    return (
        <Col lg='4' md='6' className='mt-md-0 mt-3'>
            <div className='subsribe-input'>
                <InputGroup>
                    <Input type='text' className='subscribe-input' placeholder='Your Email Address'
                           style={{color: formik.errors.email ? "var(--theme-color)" : "black"}}
                           name='email'
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}/>

                    <Btn attrBtn={{
                        className: 'btn-solid-default',
                        onClick: () => sendEmail(),
                        disabled: !formik.values.email || formik.errors.email
                    }}>{Submit}</Btn>
                </InputGroup>
            </div>
        </Col>
    );
};

export default EmailButton;
