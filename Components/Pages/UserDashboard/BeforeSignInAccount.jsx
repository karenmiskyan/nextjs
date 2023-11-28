import React, {useState} from 'react';
import {Input, Label} from "reactstrap";
import {APICallUrl} from "../../Constant";
import {
    setAuth,
    setLoginToken,
    setUser
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import Link from "next/link";
import {Backdrop, CircularProgress} from "@mui/material";

const BeforeSignInAccount = ({isOpen, divRef, setIsCartOpen, signIn}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState("");

    const signIN = () => {
        setLoading(true);
        fetch(`${APICallUrl}/api/v1/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                email: formik.values.email,
                password: formik.values.password
            }),
        })
            .then((res) => res.json()).then((res) => {
            if (res.error === false) {
                dispatch(setLoginToken(res.data));
                dispatch(setAuth(res.error));

                fetch(`${APICallUrl}/api/v1/me`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${res.data.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {

                    dispatch(setUser(res));
                    setIsCartOpen(false);
                    setLoading(false);

                })
                    .catch((error) => {
                        console.error('Failed to fetch user data:', error);
                        setLoading(false);
                    });
            } else {
                // Handle error if the first fetch returns an error
                console.error('Login failed:', res.message);

                setErr(res)
                setLoading(false);

            }
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to login:', error);
                setLoading(false);
            });
    }


    const initialValues = {
        email: "",
        password: ""
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
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
    })


    return (
        <div className='login profile-dropdown' ref={divRef}>
            {
                !signIn && <span className='d-block' style={{cursor: "pointer"}} onClick={() => isOpen()}>
              <i className='fas fa-arrow-right back-cart'></i>
            </span>
            }
            <div className='profile-dropdown-div' style={signIn ? {display: "grid", gap: "12px"} : {display: "grid"}}>
                <div>
                    <h3 className="before-h3" style={signIn ? {
                        display: "flex",
                        justifyContent: "center",
                        color: " var(--theme-color)",
                    } : {display: "flex"}}>
                        Sign In</h3>
                    <p style={signIn ? {
                        display: "flex",
                        justifyContent: "center",
                        color: "#969696",
                        marginBottom: "0"
                    } : {marginBottom: "0"}}>Use Your email address & password to login</p>
                </div>

                <form>
                    <h5 style={{marginBottom: "6px"}}>Email</h5>
                    <Input type='email' placeholder='Email' name='email'
                           className='checkout-form login-form'
                        // onChange={(e) => setEmail(e.target.value)}
                        // value={email}
                           value={formik.values.email}
                           onChange={(e) => {
                               formik.handleChange(e)
                               setErr("")
                           }}
                           onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <span style={{
                            color: 'var(--theme-color)',
                            fontWeight: "500",
                            fontSize: "14px"
                        }}>{formik.errors.email}</span>
                    )}
                    <h5 style={{marginTop: "12px", marginBottom: "6px"}}>Password</h5>
                    <div className='password-input-container'>
                        <Input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password'
                               className='checkout-form login-form'
                               value={formik.values.password}
                               onChange={(e) => {
                                   formik.handleChange(e)
                                   setErr("")
                               }}
                               onBlur={formik.handleBlur}
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
                </form>

                <div className='form-check p-0 custome-form-check'>
                    <input className='checkbox_animated check-it'
                           type='checkbox' style={{top: "-4px"}}/>
                    <Label className='form-check-label'
                           style={{marginBottom: "0"}}>Remember me</Label>

                </div>
                {err.error && (
                    <span
                        style={{color: 'var(--theme-color)', fontWeight: "500", fontSize: "14px"}}>{err.message}</span>
                )}
                {err.errors && (
                    <span
                        style={{color: 'var(--theme-color)', fontWeight: "500", fontSize: "14px"}}>{err.message}</span>
                )}
                <div className='product-buttons' style={{marginBottom: "0"}}>
                    <a id='cartEffect' onClick={() => signIN()}
                       className='btn btn-solid hover-solid btn-animation quick-order-button'>

                        <span>SIGN IN</span>
                    </a>
                </div>
                <p
                    onClick={() => {
                        router.push("/my-account/lost-password");
                        isOpen()
                    }}
                    style={signIn ? {
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        color: "var(--theme-color)",
                    } : {color: "var(--theme-color)", cursor: "pointer"}}>Forgot Username or Password?</p>
            </div>

            <div className="profile-dropdown-div" style={{marginTop: "1rem", border: "none"}}>
                {
                    !signIn && <Link href={`/become-a-customer`}>
                        <h4 className="before-h4">
                            New Here?
                        </h4>
                    </Link>
                }

                <div className='product-buttons' style={{marginBottom: "0"}}>
                    {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                    <Link href={`/become-a-customer`}
                          className='btn btn-solid btn-transparent hover-solid btn-animation quick-order-button'>
                        {/*<i className='fa fa-shopping-cart'></i>*/}
                        <span>Become a customer</span>
                    </Link>
                </div>
            </div>

            {loading && (
                <Backdrop sx={{
                    position: "absolute",
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                }} open>
                    <CircularProgress color="primary"/>
                </Backdrop>
            )}
        </div>
    );
};

export default BeforeSignInAccount;