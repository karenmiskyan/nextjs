import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectLoginToken} from "../../ReduxToolkit/Slices/LoginSlice";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu,
    getNewArrival, getNewOffer,
    getShopByCategory,
    getSlider,
    getSpecialOffer,
    selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu,
    selectNewArrival,
    selectNewOffer,
    selectShopByCategory,
    selectSlider,
    selectSpecialOffer
} from "../../ReduxToolkit/Slices/AllGetSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout6 from "../../Layout/Layout6";
import EventPage from "../../Components/Pages/EventPage/EventPage";
import FurnitureSlider from "../../Components/FurnitureDemo/FurnitureSlider";
import {SortingByNameFunction} from "../../Utils/sortingFunctions";
import ElectronicVR from "../../Components/ElectronicDemo/ElectronicVR";
import FlowerSubscribe from "../../Components/FlowerDemo/FlowerSubscribe";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../Components/Element/CommonMobileView";
import store from "../../ReduxToolkit/store";
import {APICallUrl} from "../../Components/Constant";
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
        const blogsResponse = await fetch(`${APICallUrl}/api/v1/posts?type=event&per_page=9`);
        const blogs = await blogsResponse?.json();

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

        data.blogs = blogs;

        return {props: {data}};
    } catch (error) {
        console.error("Error fetching main menu:", error);
        // Consider sending a default/fallback value or an error message
        return {props: {data: {}}};
    }
}
const Index = ({data}) => {
    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const newArrival = useSelector(selectNewArrival);
    const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
    const {overlay, TopMenuToggle} = useSelector((state) => state.ModalReducer);

    const [zIndex, setZIndex] = useState(1);

    useEffect(() => {
        if (Is_Focus || Is_Search || TopMenuToggle) {
            setZIndex(4000)
        } else {
            setZIndex(1)
        }
    }, [Is_Focus, Is_Search, TopMenuToggle]);

    useEffect(() => {
        if (Object.keys(loginToken).length > 0) {
            dispatch(getNewArrival(loginToken));
        }
    }, [loginToken]);


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
    }, [router]);

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>
            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>

                {/*<BreadCrumb parent={'Blog Left Sidebar'} title={'Blog Left Sidebar'} />*/}
                <EventPage blogs={data?.blogs}/>

                {Object.keys(data?.brands).length > 0 &&
                    <FurnitureSlider brands={SortingByNameFunction([...data?.brands?.data])}/>}

                {data?.newArrival?.products?.data?.length > 0 &&
                    <ElectronicVR
                        productData={newArrival?.products?.data?.length > 0 ? newArrival.products?.data : data?.newArrival?.products?.data}/>}

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


export default Index;