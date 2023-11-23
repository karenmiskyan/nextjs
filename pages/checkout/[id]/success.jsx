import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu, getNewArrival, getNewOffer, getShopByCategory, getSlider, getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft, selectFooterRight,
    selectMainMenu,
    selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider, selectSpecialOffer
} from "../../../ReduxToolkit/Slices/AllGetSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout6 from "../../../Layout/Layout6";
import SectionCheckout from "../../../Components/Pages/Checkout";
import ElectronicVR from "../../../Components/ElectronicDemo/ElectronicVR";
import FlowerSubscribe from "../../../Components/FlowerDemo/FlowerSubscribe";
import {Backdrop, CircularProgress} from "@mui/material";
import TopSection from "../../../Components/Pages/OrderSuccess/TopSection";
import OrderDetails from "../../../Components/Pages/OrderSuccess/OrderDetails";
import {APICallUrl} from "../../../Components/Constant";
import {selectMyToken, selectPaypalToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {selectCart} from "../../../ReduxToolkit/Slices/CartSlice";
import CommonMobileView from "../../../Components/Element/CommonMobileView";
import store from "../../../ReduxToolkit/store";
import SectionSvg from "../../../Components/Pages/404/SectionSvg";


// export async function getServerSideProps({params}) {
//     const success = await fetch(`${APICallUrl}/api/checkout/${params.id}/success`);
//
//     const data = {
//         success: await success?.json(),
//         params: params
//     }
//     return {props: {data}}
// }

export async function getServerSideProps({res, params}) {

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
        const successResponse = await fetch(`${APICallUrl}/api/checkout/${params.id}/success`);
        const success = await successResponse?.json();

        // const accessoriesResponse = await (`${APICallUrl}/ajax/related-products/${product?.product?.id}?limit=20&json=true`)
        // const accessories = await accessoriesResponse?.json();

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

        if (success?.error) {
            res.statusCode = 404;
        }
        data.success = success;
        // data.accessories = accessories;
        // data.params = params;


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

const Success = ({data}) => {

    let dispatch = useDispatch();

    const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
    const {overlay, TopMenuToggle} = useSelector((state) => state.ModalReducer);
    const router = useRouter();

    const [zIndex, setZIndex] = useState(1);
    useEffect(() => {
        if (Is_Focus || Is_Search || TopMenuToggle) {
            setZIndex(4000)
        } else {
            setZIndex(1)
        }
    }, [Is_Focus, Is_Search, TopMenuToggle]);


    // useEffect(() => {
    //     dispatch(getMainMenu());
    //     dispatch(getSpecialOffer());
    //     dispatch(getNewArrival());
    //     dispatch(getNewOffer());
    //     dispatch(getBrands());
    //     dispatch(getFooterLeft());
    //     dispatch(getFooterCenter());
    //     dispatch(getFooterRight());
    //     if (data?.success?.error === true) {
    //         router.push('/404');
    //     }
    // }, []);


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
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>
            <>
                {
                    !data?.success?.error ?
                        <>
                            <TopSection token={data?.success?.code}/>
                            <OrderDetails details={data?.success}/>
                        </> :
                        <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft}
                                 footerCenter={data?.footerCenter}
                                 footerRight={data?.footerRight}>
                            <SectionSvg/>
                        </Layout6>
                }

                {isLoading && (
                    <Backdrop sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + zIndex,
                        backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }} open>
                        <CircularProgress color="primary"/>
                    </Backdrop>
                )}
            </>
        </>

    );
};

export default Success;