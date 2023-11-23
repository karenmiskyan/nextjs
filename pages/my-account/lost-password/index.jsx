import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,getSlider, getShopByCategory,
    getMainMenu, getNewArrival, getNewOffer, getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu, selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider, selectSpecialOffer
} from "../../../ReduxToolkit/Slices/AllGetSlice";
import {selectAuth} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Layout6 from "../../../Layout/Layout6";
import {Container, Col, Input, Row} from "reactstrap";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../../Components/Element/CommonMobileView";
import {APICallUrl, OrderSuccess, PaymentDescription} from "../../../Components/Constant";
import {OrderSuccessSvg} from "../../../Data/SVG";
import store, {persistor} from "../../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";

export async function getServerSideProps({res}) {

    const currentMainMenu = selectMainMenu(store.getState());
    const currentSlider = selectSlider(store.getState());
    const currentSpecialOffer = selectSpecialOffer(store.getState());
    const currentShopByCategory = selectShopByCategory(store.getState());
    const currentNewArrival = selectNewArrival(store.getState());
    const currentNewOffer = selectNewOffer(store.getState());
    const currentBrands = selectBrands(store.getState());
    const currentFooterLeft = selectFooterLeft(store.getState());
    const currentFooterCenter = selectFooterCenter(store.getState());
    const currentFooterRight = selectFooterRight(store.getState());

    let data = {};

    try {


        if (!currentMainMenu || currentMainMenu.length === 0) {
            const mainMenuResponse = await store.dispatch(getMainMenu());
            const sliderResponse = await store.dispatch(getSlider());
            const specialOfferResponse = await store.dispatch(getSpecialOffer({token: "1"}));
            const shopByCategoryResponse = await store.dispatch(getShopByCategory());
            const newOfferResponse = await store.dispatch(getNewOffer());
            const newArrivalResponse = await store.dispatch(getNewArrival({token: "1"}));
            const brandsResponse = await store.dispatch(getBrands());
            const footerLeftResponse = await store.dispatch(getFooterLeft());
            const footerCenterResponse = await store.dispatch(getFooterCenter());
            const footerRightResponse = await store.dispatch(getFooterRight());

            data.mainMenu = mainMenuResponse.payload;
            data.slider = sliderResponse.payload;
            data.specialOffer = specialOfferResponse.payload;
            data.shopByCategory = shopByCategoryResponse.payload;
            data.newOffer = newOfferResponse.payload;
            data.newArrival = newArrivalResponse.payload;
            data.brands = brandsResponse.payload;
            data.footerLeft = footerLeftResponse.payload;
            data.footerCenter = footerCenterResponse.payload;
            data.footerRight = footerRightResponse.payload;

        } else {
            data.mainMenu = currentMainMenu;
            data.slider = currentSlider;
            data.specialOffer = currentSpecialOffer;
            data.shopByCategory = currentShopByCategory;
            data.newOffer = currentNewOffer;
            data.newArrival = currentNewArrival;
            data.brands = currentBrands;
            data.footerLeft = currentFooterLeft;
            data.footerCenter = currentFooterCenter;
            data.footerRight = currentFooterRight;
        }


        return {props: {data}};
    } catch (error) {
        const mainMenuResponse = await store.dispatch(getMainMenu());
        const sliderResponse = await store.dispatch(getSlider());
        const specialOfferResponse = await store.dispatch(getSpecialOffer({token: "1"}));
        const shopByCategoryResponse = await store.dispatch(getShopByCategory());
        const newOfferResponse = await store.dispatch(getNewOffer());
        const newArrivalResponse = await store.dispatch(getNewArrival({token: "1"}));
        const brandsResponse = await store.dispatch(getBrands());
        const footerLeftResponse = await store.dispatch(getFooterLeft());
        const footerCenterResponse = await store.dispatch(getFooterCenter());
        const footerRightResponse = await store.dispatch(getFooterRight());

        data.mainMenu = mainMenuResponse.payload;
        data.slider = sliderResponse.payload;
        data.specialOffer = specialOfferResponse.payload;
        data.shopByCategory = shopByCategoryResponse.payload;
        data.newOffer = newOfferResponse.payload;
        data.newArrival = newArrivalResponse.payload;
        data.brands = brandsResponse.payload;
        data.footerLeft = footerLeftResponse.payload;
        data.footerCenter = footerCenterResponse.payload;
        data.footerRight = footerRightResponse.payload;
        res.statusCode = 404;
        console.error("Error fetching main menu:", error);
        return {props: {data}};
    }
}

const LostPassword = ({data}) => {


    const auth = useSelector(selectAuth);
    const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
    const {overlay, TopMenuToggle} = useSelector((state) => state.ModalReducer);

    let [zIndex, setZIndex] = useState(1);
    useEffect(() => {
        if (Is_Focus || Is_Search || TopMenuToggle) {
            setZIndex(4000)
        } else {
            setZIndex(1)
        }
    }, [Is_Focus, Is_Search, TopMenuToggle]);


    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url) => {
            if (router.asPath !== url) {
                setIsLoading(true);
            }
        };

        const handleComplete = (url) => {
            if (router.asPath === url) {
                setIsLoading(false);
            }
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    useEffect(() => {
        if (!auth) {
            router.push("/my-account");
        }
    }, [auth]);

    const [err, setErr] = useState("");
    const [show, setShow] = useState(false);
    const signIn = true;

    const initialValues = {
        email: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid format").required("Required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })


    const reset = () => {
        setIsLoading(true);
        fetch(`${APICallUrl}/api/v1/password/forgot`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                // Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                "email": formik.values.email
            })
        })
            .then((res) => res.json()).then((res) => {
            if (res.errors) {
                setErr(res.message);
                setShow(false);
                setIsLoading(false);
            } else {
                setErr(res.message);
                setShow(true);
                setIsLoading(false);
            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to Password', error);
            });
    }

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>

            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                <PersistGate loading={null} persistor={persistor}>
                    {
                        !auth ? "" :
                            <Container>
                                <Row style={{padding: "20px 0", justifyContent: "center"}}>
                                    <Col lg="4" sm="8" xs="10">
                                        {
                                            !show ?
                                                <div className='login profile-dropdown'>
                                                    <div className='profile-dropdown-div'
                                                         style={signIn ? {
                                                             display: "grid",
                                                             gap: "12px"
                                                         } : {display: "grid"}}>
                                                        <div>
                                                            <h3 className="before-h3" style={signIn ? {
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                color: " var(--theme-color)",
                                                            } : {display: "flex"}}>
                                                                Forgot Password?</h3>
                                                            <p style={signIn ? {
                                                                display: "flex",
                                                                textAlign: "center",
                                                                justifyContent: "center",
                                                                color: "#969696",
                                                                marginBottom: "0"
                                                            } : {marginBottom: "0"}}>Enter your email address and we’ll
                                                                send you
                                                                an email with a link to reset your password.</p>
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
                                                                       setErr("");
                                                                   }}
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
                                                            {/*<div className='valid-feedback'>{Pleasefillthename}</div>*/}
                                                        </form>

                                                        <div className='product-buttons'
                                                             style={{marginBottom: "0", marginTop: "10px"}}>
                                                            {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                                            <a
                                                                onClick={reset}
                                                                className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                                <span>Reset Password</span>
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
                                                </div> :
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
                                                                setShow(false)
                                                                setErr("")
                                                            }}
                                                            className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                                            {/*<i className='fa fa-shopping-cart'></i>*/}
                                                            <span>Repeat the action</span>
                                                        </a>
                                                    </div>
                                                </div>
                                        }

                                    </Col>
                                </Row>
                            </Container>
                    }
                </PersistGate>
                {isLoading && (
                    <Backdrop sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + zIndex,
                        backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }} open>
                        <CircularProgress color="primary"/>
                    </Backdrop>
                )}
                <CommonMobileView/>

            </Layout6>

        </>

    );
};

export default LostPassword;