import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import FlowerSubscribe from "../Components/FlowerDemo/FlowerSubscribe";
import dynamic from "next/dynamic";

const Layout6 = dynamic(() => import('../Layout/Layout6'))
const ElectronicHurryUp = dynamic(() => import('../Components/ElectronicDemo/ElectronicHurryUp'))
const FashionService = dynamic(() => import('../Components/FashionDemo/FashionService'))
const VegetableHomeSlider = dynamic(() => import('../Components/VegetablesDemo/VegetableHomeSlider'))
const FashionShopByCategory = dynamic(() => import('../Components/FashionDemo/FashionShopByCategory'))
const ElectronicVR = dynamic(() => import('../Components/ElectronicDemo/ElectronicVR'))
const FurnitureSlider = dynamic(() => import('../Components/FurnitureDemo/FurnitureSlider'))
const CommonMobileView = dynamic(() => import('../Components/Element/CommonMobileView'))
import {SortingByNameFunction} from "../Utils/sortingFunctions";
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
import store from '../ReduxToolkit/store';
import {selectLoginToken} from "../ReduxToolkit/Slices/LoginSlice";


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
    const {TopMenuToggle} = useSelector((state) => state.ModalReducer);

    let [zIndex, setZIndex] = useState(1);
    useEffect(() => {
        if (Is_Focus || Is_Search || TopMenuToggle) {
            setZIndex(4000)
        } else {
            setZIndex(1)
        }
    }, [Is_Focus, Is_Search, TopMenuToggle]);

    const removePadding = true;
    const addBgColor = true;

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


                {data?.newArrival?.products?.data?.length > 0 &&
                    <ElectronicVR
                        productData={newArrival?.products?.data?.length > 0 ? newArrival.products?.data : data?.newArrival?.products?.data}/>}

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

