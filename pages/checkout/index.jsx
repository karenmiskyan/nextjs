import Head from 'next/head';
import React, {useEffect, useState} from 'react';
import Layout6 from "../../Layout/Layout6";
import SectionCheckout from "../../Components/Pages/Checkout";
import ElectronicVR from "../../Components/ElectronicDemo/ElectronicVR";
import FlowerSubscribe from "../../Components/FlowerDemo/FlowerSubscribe";
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands,
    getFooterCenter,
    getFooterLeft,
    getFooterRight,
    getMainMenu,
    getNewArrival,
    getNewOffer, getShopByCategory, getSlider,
    getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu,
    selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider, selectSpecialOffer,
} from "../../ReduxToolkit/Slices/AllGetSlice";
import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../Components/Element/CommonMobileView";
import {selectAuth, setShippingSing, setShippingThree, setShippingTwo} from "../../ReduxToolkit/Slices/LoginSlice";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "../../ReduxToolkit/store";
import {selectCart} from "../../ReduxToolkit/Slices/CartSlice";

export async function getServerSideProps() {
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
            const newArrivalResponse = await store.dispatch(getNewArrival({token: "1"}));
            const newOfferResponse = await store.dispatch(getNewOffer());
            const brandsResponse = await store.dispatch(getBrands());
            const footerLeftResponse = await store.dispatch(getFooterLeft());
            const footerCenterResponse = await store.dispatch(getFooterCenter());
            const footerRightResponse = await store.dispatch(getFooterRight());

            data.mainMenu = mainMenuResponse.payload;
            data.slider = sliderResponse.payload;
            data.specialOffer = specialOfferResponse.payload;
            data.shopByCategory = shopByCategoryResponse.payload;
            data.newArrival = newArrivalResponse.payload;
            data.newOffer = newOfferResponse.payload;
            data.brands = brandsResponse.payload;

            data.footerLeft = footerLeftResponse.payload;
            data.footerCenter = footerCenterResponse.payload;
            data.footerRight = footerRightResponse.payload;

        } else {
            data.mainMenu = currentMainMenu;
            data.slider = currentSlider;
            data.specialOffer = currentSpecialOffer;
            data.shopByCategory = currentShopByCategory;
            data.newArrival = currentNewArrival;
            data.newOffer = currentNewOffer;
            data.brands = currentBrands;
            data.footerLeft = currentFooterLeft;
            data.footerCenter = currentFooterCenter;
            data.footerRight = currentFooterRight;
        }

        return {props: {data}};
    } catch (error) {
        console.error("Error fetching main menu:", error);
        // Consider sending a default/fallback value or an error message
        return {props: {data: {}}};
    }
}


const Checkout = ({data, loadError, isLoaded}) => {

    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const auth = useSelector(selectAuth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth) {
            router.push('/sign-in');
        }
    }, [auth]);

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

    useEffect(() => {
        setLoading(true);

        if (cart.length === 0) {
        //     dispatch(getMainMenu());
        //     dispatch(getSpecialOffer());
        //     dispatch(getNewArrival());
        //     dispatch(getNewOffer());
        //     dispatch(getBrands());
        //     dispatch(getFooterLeft());
        //     dispatch(getFooterCenter());
        //     dispatch(getFooterRight());
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [cart]);

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url) => {
            if (router.asPath !== url) {
                setIsLoading(true);
                dispatch(setShippingSing({}));
                dispatch(setShippingTwo({}));
                dispatch(setShippingThree({}));
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



    return (

        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <title>Checkout Page</title>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>

            {/*mainMenu.length > 0 &&*/}
            {/*<PersistGate loading={null} persistor={persistor}>*/}

            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                <PersistGate loading={null} persistor={persistor}>
                    {
                        !auth && <SectionCheckout setIsLoading={setIsLoading} loading={loading}  loadError={loadError} isLoaded={isLoaded}/>

                    }
                </PersistGate>
                {/*{newArrival.length > 0 && <ElectronicVR productData={newArrival}/>}*/}

                <FlowerSubscribe/>

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


export default Checkout;
