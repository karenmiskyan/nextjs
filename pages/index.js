import Head from 'next/head';
import React, {useEffect, useState, Fragment} from 'react';
import {APICallUrl, APIImage} from '../Components/Constant'; // Update this line
import VegetableDeal from "../Components/VegetablesDemo/VegetableDeal";
import FlowerSubscribe from "../Components/FlowerDemo/FlowerSubscribe";
import dynamic from "next/dynamic";

// import CommonMobileView from "../Components/Element/CommonMobileView";
// import Layout6 from "../Layout/Layout6";
// import FurnitureSlider from "../Components/FurnitureDemo/FurnitureSlider";
// import ElectronicVR from "../Components/ElectronicDemo/ElectronicVR";
// import FashionShopByCategory from "../Components/FashionDemo/FashionShopByCategory";
// import VegetableHomeSlider from "../Components/VegetablesDemo/VegetableHomeSlider";
// import FashionService from "../Components/FashionDemo/FashionService";
// import ElectronicHurryUp from "../Components/ElectronicDemo/ElectronicHurryUp";
const Layout6 = dynamic(() => import('../Layout/Layout6'))
const ElectronicHurryUp = dynamic(() => import('../Components/ElectronicDemo/ElectronicHurryUp'))
const FashionService = dynamic(() => import('../Components/FashionDemo/FashionService'))
const VegetableHomeSlider = dynamic(() => import('../Components/VegetablesDemo/VegetableHomeSlider'))
const FashionShopByCategory = dynamic(() => import('../Components/FashionDemo/FashionShopByCategory'))
const ElectronicVR = dynamic(() => import('../Components/ElectronicDemo/ElectronicVR'))
const FurnitureSlider = dynamic(() => import('../Components/FurnitureDemo/FurnitureSlider'))
const CommonMobileView = dynamic(() => import('../Components/Element/CommonMobileView'))

import {SortingByNameFunction, SortingByOrderFunction,} from "../Utils/sortingFunctions";
import {useDispatch, useSelector} from "react-redux";

import {
    getBrands,
    getFooterCenter,
    getFooterLeft,
    getFooterRight,
    getMainMenu,
    getNewArrival,
    getNewOffer, getShopByCategory, getSlider,
    getSpecialOffer,
    selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu,
    selectNewArrival,
    selectNewOffer, selectShopByCategory, selectSlider,
    selectSpecialOffer
} from "../ReduxToolkit/Slices/AllGetSlice";
import {Backdrop, CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import store, {persistor} from '../ReduxToolkit/store';
import {PersistGate} from "redux-persist/integration/react";
import Link from "next/link";
import {selectLoginToken} from "../ReduxToolkit/Slices/LoginSlice";
import {Col, Container, Row} from "reactstrap";
import {CustomerService} from "../Data/CustomerService";
import useWindowDimensions from "../Utils/useWindowDimensions";
import SonyDealerForm from "../Components/Pages/UserDashboard/SonyDealer/SonyDealerForm";

// export async function getServerSideProps({req}) {
//     const mainMenu = await fetch(`${APICallUrl}/api/main-menu?slug=main-menu`);
//     const slider = await fetch(`${APICallUrl}/api/home-slider`);
//     const specialOffer = await fetch(`${APICallUrl}/api/get-products-with-categories-by-collection?collection=special-offer`);
//     const shopByCategory = await fetch(`${APICallUrl}/api/get-featured-product-categories`);
//     const newArrival = await fetch(`${APICallUrl}/api/get-products-by-collection?collection=new-arrival`);
//     const newOffer = await fetch(`${APICallUrl}/api/brand?per_page=2&page=1&new_offer=true`);
//     const brand = await fetch(`${APICallUrl}/api/brand?per_page=13&page=1&is_featured=true`);
//     const footerLeft = await fetch(`${APICallUrl}/api/main-menu?slug=footer`);
//     const footerCenter = await fetch(`${APICallUrl}/api/main-menu?slug=categories`);
//     const footerRight = await fetch(`${APICallUrl}/api/main-menu?slug=get-help`);
//
//     const data = {
//         mainMenu: await mainMenu?.json(),
//         slider: await slider?.json(),
//         specialOffer: await specialOffer?.json(),
//         shopByCategory: await shopByCategory?.json(),
//         newArrival: await newArrival?.json(),
//         newOffer: await newOffer?.json(),
//         brand: await brand?.json(),
//         footerLeft: await footerLeft?.json(),
//         footerCenter: await footerCenter?.json(),
//         footerRight: await footerRight?.json(),
//
//     }
//     return {props: {data}}
// }

export async function getStaticProps() {

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

export default function Home({data}) {


    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const specialOffer = useSelector(selectSpecialOffer);
    const newArrival = useSelector(selectNewArrival);


    useEffect(() => {
        if (Object.keys(loginToken).length > 0) {
            dispatch(getNewArrival(loginToken));
            dispatch(getSpecialOffer(loginToken));
        }
    }, [loginToken]);

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

    const {width} = useWindowDimensions();

    return (
        <>
            <Head>
                <title>KOA - Electronics Distribution Inc.</title>
                <meta name="description"
                      content="KOA CCTV Wholesale distributor of CCTV Cameras DVRs, Audio &amp; Video Products and low voltage products. Hikvision USA, Samsung WisiNet, Bosch, Western Digital, Seagate."/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' href="/assets/images/koalogo.png"/>
            </Head>

            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>

                <VegetableHomeSlider slider={data?.slider?.slider_items}/>

                {

                    <section
                        className={`service-section icons-info ${!removePadding ? 'service-style-2 section-b-space' : ''} icons-info-top`}>
                        <FashionService removePadding={removePadding}/>
                    </section>
                }

                <FashionShopByCategory popularCard={data?.shopByCategory}/>

                {data?.specialOffer?.length > 0 &&
                    <ElectronicHurryUp tabSection={specialOffer.length > 0 ? specialOffer : data?.specialOffer}/>}


                {data?.newArrival?.length > 0 &&
                    <ElectronicVR productData={newArrival.length > 0 ? newArrival : data?.newArrival}/>}

                {/*{Object.keys(data?.newOffer).length > 0 &&*/}
                {/*    <VegetableDeal newOffer={SortingByOrderFunction([...data?.newOffer?.data])}/>}*/}

                {Object.keys(data?.brands).length > 0 &&
                    <FurnitureSlider brands={SortingByNameFunction([...data?.brands?.data])}/>}


                {

                    <section
                        className={`service-section icons-info ${!removePadding ? 'service-style-2 section-b-space' : ''} icons-info-bottom`}>
                        <FashionService removePadding={removePadding}/>
                    </section>
                }
                <FlowerSubscribe addBgColor={addBgColor}/>

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

