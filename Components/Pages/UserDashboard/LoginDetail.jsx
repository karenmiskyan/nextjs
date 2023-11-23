import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {APICallUrl} from "../../Constant";
import {useSelector} from "react-redux";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {toast} from "react-toastify";

const LoginDetail = ({item, openProfileModal}) => {
    const loginToken = useSelector(selectLoginToken);

    const initialValues = {
        password: "",
        password_confirmation: "",
        // new_password: "",
    }

    const validationSchema = Yup.object({
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 characters minimum.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&+=!()~`\\*£|.<>:"'\[\]_{}?,/;-]*$/,
                'Password must include at least one uppercase letter, one lowercase letter, and one number.'
            ),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please repeat your password.'),
           })
    const formik = useFormik({
        initialValues,
        validationSchema,
    })
    useEffect(() => {
        if (formik.values.password === "") {
            formik.setErrors({
                password_confirmation: undefined
            });
        }
    }, [formik])

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowPRepeatPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const saveChangePassword = () => {
        fetch(`${APICallUrl}/api/v1/update/password`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                'password': formik?.values?.password
            }),
        })
            .then((res) => res.json()).then((res) => {
            if (res.error === false) {
                toast.success('Password Successfully changed', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
                formik.setFieldValue('password', '');
                formik.setFieldValue('password_confirmation', '');
                formik.setErrors({
                    password_confirmation: undefined
                });

            } else {
                toast.error('A problem occurred, please try again later ', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to update to cart', error);
            });
    }

    return (
        <>
            <div className='box-head'>
                <h2>Change Password</h2>
                {/*<a href='#javascript' onClick={openProfileModal}>{item.btn}</a>*/}
            </div>
            <form>

                <ul className='dash-profile'>
                    {/*{item.details.map((elem, i) => {*/}
                    {/*  return (*/}
                    <li className="mt-2">
                        <div className='left'>
                            <h6 className='font-light'>New Password</h6>
                        </div>
                        <div className='right'>
                            <div className='password-input-container' style={{maxWidth: "216px", width: "100%"}}>
                                <input type={showPassword ? 'text' : 'password'} name='password'
                                       className='form-control checkout-form'
                                    // onChange={(e) => setPassword(e.target.value)}
                                       value={formik.values.password}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       style={{
                                           padding: "calc(2px + 2 * (100vw - 320px) / 1600) calc(15px + 6 * (100vw - 320px) / 1600)",
                                       }}
                                />
                                <div
                                    className={`password-toggle-icon ${showPassword ? 'show' : ''}`}
                                    style={{bottom: "6%"}}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <i className='fas fa-eye-slash'></i>
                                    ) : (
                                        <i className='fas fa-eye'></i>
                                    )}
                                </div>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <span style={{
                                    color: 'var(--theme-color)',
                                    fontWeight: "500",
                                    fontSize: "14px"
                                }}>{formik.errors.password}</span>
                            )}
                        </div>
                        {/*<a href='#javascript' onClick={() => openProfileModal()}>{item.btn}</a>*/}
                    </li>
                    <li className="mt-2">
                        <div className='left'>
                            <h6 className='font-light'>Repeat Password</h6>
                        </div>
                        <div className='right'>
                            <div className='password-input-container' style={{maxWidth: "216px", width: "100%"}}>
                                <input type={showRepeatPassword ? 'text' : 'password'}
                                       className='form-control checkout-form'
                                       name='password_confirmation'
                                       value={formik.values.password_confirmation}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       style={{padding: "calc(2px + 2 * (100vw - 320px) / 1600) calc(15px + 6 * (100vw - 320px) / 1600)"}}
                                />
                                <div
                                    className={`password-toggle-icon ${showRepeatPassword ? 'show' : ''}`}
                                    style={{bottom: "6%"}}
                                    onClick={() => setShowPRepeatPassword(!showRepeatPassword)}
                                >
                                    {showRepeatPassword ? (
                                        <i className='fas fa-eye-slash'></i>
                                    ) : (
                                        <i className='fas fa-eye'></i>
                                    )}
                                </div>
                            </div>
                            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                <span style={{
                                    color: 'var(--theme-color)',
                                    fontWeight: "500",
                                    fontSize: "14px"
                                }}>{formik.errors.password_confirmation}</span>
                            )}
                        </div>
                        {/*<a href='#javascript' onClick={() => openProfileModal()}>{item.btn}</a>*/}
                    </li>
                    {/*<li className="mt-4">*/}
                    {/*    <div className='left'>*/}
                    {/*        <h6 className='font-light'>New Password</h6>*/}
                    {/*    </div>*/}
                    {/*    <div className='right'>*/}
                    {/*        <div className='password-input-container' style={{maxWidth: "216px", width: "100%"}}>*/}
                    {/*            <input type={showNewPassword ? 'text' : 'password'} name='new_password'*/}
                    {/*                   className='form-control checkout-form'*/}
                    {/*                // onChange={(e) => setPassword(e.target.value)}*/}
                    {/*                   value={formik.values.new_password}*/}
                    {/*                   onChange={formik.handleChange}*/}
                    {/*                   onBlur={formik.handleBlur}*/}
                    {/*                   style={{*/}
                    {/*                       padding: "calc(2px + 2 * (100vw - 320px) / 1600) calc(15px + 6 * (100vw - 320px) / 1600)",*/}
                    {/*                   }}*/}
                    {/*            />*/}
                    {/*            <div*/}
                    {/*                className={`password-toggle-icon ${showNewPassword ? 'show' : ''}`}*/}
                    {/*                style={{bottom: "6%"}}*/}
                    {/*                onClick={() => setShowNewPassword(!showNewPassword)}*/}
                    {/*            >*/}
                    {/*                {showNewPassword ? (*/}
                    {/*                    <i className='fas fa-eye-slash'></i>*/}
                    {/*                ) : (*/}
                    {/*                    <i className='fas fa-eye'></i>*/}
                    {/*                )}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        {formik.touched.new_password && formik.errors.new_password && (*/}
                    {/*            <span style={{*/}
                    {/*                color: 'var(--theme-color)',*/}
                    {/*                fontWeight: "500",*/}
                    {/*                fontSize: "14px"*/}
                    {/*            }}>{formik.errors.new_password}</span>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*    /!*<a href='#javascript' onClick={() => openProfileModal()}>{item.btn}</a>*!/*/}
                    {/*</li>*/}
                    {/*  );*/}
                    {/*})}*/}
                </ul>

            </form>

            <div className='product-buttons mt-4' style={{flexDirection: "column", width: "80px"}}>
                <button className='btn btn-solid hover-solid btn-animation'
                        style={{fontSize: "14px", padding: "2px 4px"}}
                        onClick={saveChangePassword}
                        disabled={!formik.values.password || formik.errors.password && !formik.values.password_confirmation || formik.errors.password_confirmation}>
                    save
                </button>
            </div>
        </>

    );
};

export default LoginDetail;
