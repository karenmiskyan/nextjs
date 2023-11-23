import React, {useState} from 'react';
import {Col, Container, Input, Row} from "reactstrap";
import {APICallUrl, Pleasefillthename} from "../../Constant";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/router";
import {OrderSuccessSvg} from "../../../Data/SVG";
import {toggleDivVisibility} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useDispatch} from "react-redux";


const ResetPassword = () => {
    const [err, setErr] = useState("");
    const [show, setShow] = useState(false);
    const router = useRouter();
    const signIn = true;
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
        password_confirmation: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid format").required("Required"),
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

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowPRepeatPassword] = useState(false);


    const savePassword = () => {

        const mergedObj = {...formik.values, token: router.query.id};


        fetch(`${APICallUrl}/api/v1/password/reset`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                // Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify(mergedObj)
        })
            .then((res) => res.json()).then((res) => {
            if (res.errors) {
                setErr(res.message);
                setShow(false);
            } else {
                setErr(res.message);
                setShow(true);
            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to Save Password', error);
            });
    }
    return (
        <Container>
            <Row style={{padding: "20px 0", justifyContent: "center"}}>
                <Col lg="4" sm="8" xs="10">
                    {
                        !show ?
                            <div className='login profile-dropdown'>
                                <div className='profile-dropdown-div'
                                     style={signIn ? {display: "grid", gap: "12px"} : {display: "grid"}}>
                                    <div>
                                        <h3 className="before-h3" style={signIn ? {
                                            display: "flex",
                                            justifyContent: "center",
                                            color: " var(--theme-color)",
                                        } : {display: "flex"}}>
                                            Be sure to use a strong password!
                                        </h3>
                                    </div>
                                    <form>
                                        <h5 style={{marginBottom: "6px"}}>Email</h5>
                                        <Input type='email' placeholder='Email' name='email'
                                               className='checkout-form login-form'
                                            // onChange={(e) => setEmail(e.target.value)}
                                            // value={email}
                                               value={formik.values.email}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <span style={{
                                                textAlign: "center",
                                                color: 'var(--theme-color)',
                                                fontWeight: "500",
                                                fontSize: "14px"
                                            }}>{formik.errors.email}</span>
                                        )}
                                        <h5 style={{marginTop: "12px", marginBottom: "6px"}}>Password</h5>
                                        <div className='password-input-container'>
                                            <Input type={showPassword ? 'text' : 'password'} name='password'
                                                   placeholder='Password'
                                                   className='checkout-form login-form'
                                                // onChange={(e) => setPassword(e.target.value)}
                                                   value={formik.values.password}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                // value={password} onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div
                                                className={`password-toggle-icon ${showPassword ? 'show' : ''}`}
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
                                        <h5 style={{marginTop: "12px", marginBottom: "6px"}}>Repeat Password</h5>
                                        <div className='password-input-container'>
                                            <Input type={showRepeatPassword ? 'text' : 'password'}
                                                   placeholder='Repeat Password'
                                                   className='checkout-form login-form'
                                                   name='password_confirmation'
                                                   value={formik.values.password_confirmation}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                            />
                                            <div
                                                className={`password-toggle-icon ${showRepeatPassword ? 'show' : ''}`}
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
                                    </form>

                                    <div className='product-buttons'
                                         style={{marginBottom: "0", marginTop: "10px"}}>
                                        <a onClick={savePassword}
                                           className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                            <span>Save Password</span>
                                        </a>
                                    </div>
                                    {
                                        err !== "" &&
                                        <span style={{
                                            textAlign: "center",
                                            color: 'var(--theme-color)',
                                            fontWeight: "500",
                                            fontSize: "14px"
                                        }}>{err}</span>
                                    }
                                </div>
                            </div>
                            :
                            <div className='success-icon'
                                 style={{backgroundColor: "white", textAlign: "center"}}>
                                <div className='main-container'>
                                    <div className='check-container'>
                                        <div className='check-background'>
                                            <OrderSuccessSvg/>
                                        </div>
                                        <div className='check-shadow'></div>
                                    </div>
                                </div>

                                {
                                    err !== "" &&
                                    <span style={{
                                        color: 'var(--theme-color)',
                                        fontWeight: "500",
                                        fontSize: "14px"
                                    }}>{err}</span>
                                }
                                <div className='product-buttons'
                                     style={{marginBottom: "0", marginTop: "10px"}}>
                                    {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                    <a
                                        onClick={() => {
                                            if (window.innerWidth <= 575) {
                                                router.push("/my-account");
                                            } else {
                                                dispatch(toggleDivVisibility(true));
                                            }
                                        }}
                                        className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                        {/*<i className='fa fa-shopping-cart'></i>*/}
                                        <span>Login</span>
                                    </a>
                                </div>
                            </div>
                    }
                < /Col>

            </Row>
        </Container>
    );
};

export default ResetPassword;