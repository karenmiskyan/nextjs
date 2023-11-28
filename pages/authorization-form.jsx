import React, {useEffect, useState} from 'react';
import { useSelector} from "react-redux";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu,
    getNewArrival, getNewOffer, getShopByCategory, getSlider,
    getSpecialOffer, selectBrands, selectFooterCenter, selectFooterLeft, selectFooterRight,
    selectMainMenu,
    selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider,
    selectSpecialOffer
} from "../ReduxToolkit/Slices/AllGetSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout6 from "../Layout/Layout6";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../Components/Element/CommonMobileView";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "../ReduxToolkit/store";
import SonyDealerForm from "../Components/Pages/UserDashboard/SonyDealer/SonyDealerForm";
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
const AuthorizationForm = ({data}) => {



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

    const isCategories = true;
    const removePadding = true;
    const addBgColor = true;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        // fetch("https://www.apibackend.fast-cybers.com/item/samsung-83-class-oled-s90c-qn83s90caexza?json=true", {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json;charset=UTF-8",
        //         Authorization: `Bearer ${loginToken.token || ""}`
        //     },
        // })
        //     .then((res) => res.json()).then((res) => {

        // })
        //     .catch((error) => {
        //         console.error('Failed to get States', error);
        //     });
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

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>

            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                <PersistGate loading={null} persistor={persistor}>
                <SonyDealerForm />
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
}


export default AuthorizationForm;