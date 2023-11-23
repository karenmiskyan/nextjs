import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu, getNewArrival, getNewOffer, getShopByCategory, getSlider, getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft, selectFooterRight,
    selectMainMenu, selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider,
    selectSpecialOffer
} from "../ReduxToolkit/Slices/AllGetSlice";
import {
    selectShopCategory,
    setFilterAttribute,
    setFilterBrands,
    setFilterCategory, setFirst, setLoading, setPopState, setPriceRange, setResetAll, setShopCategory
} from "../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import BreadCrumb from "../Components/Element/BreadCrumb";
import Layout6 from "../Layout/Layout6";
import ShopLeftSidebarContain from "../Components/Shop/ShopLeftSidebarContain";
import ElectronicHurryUp from "../Components/ElectronicDemo/ElectronicHurryUp";
import FlowerSubscribe from "../Components/FlowerDemo/FlowerSubscribe";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../Components/Element/CommonMobileView";
import {APICallUrl} from "../Components/Constant";
import store from "../ReduxToolkit/store";
import {selectLoginToken} from "../ReduxToolkit/Slices/LoginSlice";


export async function getServerSideProps() {
    const brandsData = await fetch(`${APICallUrl}/item?json=true&per_page=12&sale_price=true`);
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
        data.brandsData = await brandsData?.json();

        return {props: {data}};
    } catch (error) {
        console.error("Error fetching main menu:", error);
        return {props: {data: {}}};
    }
}

const Specials = ({data}) => {

    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const shopCategory = useSelector(selectShopCategory);
    const specialOffer = useSelector(selectSpecialOffer);
    const shopByCategory = useSelector(selectShopByCategory);

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
        dispatch(setPopState(false));
        // dispatch(setFirst(false));
        dispatch(setShopCategory(data?.brandsData));
        dispatch(setFilterBrands([]));
        dispatch(setFilterAttribute([]));
        dispatch(setFilterCategory([]));
        dispatch(setPriceRange([]));
    }, [])

    // useEffect(() => {
    //     if (Object.keys(loginToken).length > 0) {
    //         fetch(`${APICallUrl}/item?json=true&per_page=12&sale_price=true`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": "application/json;charset=UTF-8",
    //                 Authorization: `Bearer ${loginToken.token || ""}`
    //             },
    //         })
    //             .then((res) => res.json()).then((res) => {
    //             dispatch(setShopCategory(res));
    //         })
    //             .catch((error) => {
    //                 console.error('Failed to update shop category', error);
    //             });
    //         dispatch(getSpecialOffer(loginToken));
    //     } else {
    //         fetch(`${APICallUrl}/item?json=true&per_page=12&sale_price=true`)
    //             .then((res) => res.json()).then((res) => {
    //             dispatch(setShopCategory(res));
    //         })
    //             .catch((error) => {
    //                 console.error('Failed to update shop category', error);
    //             });
    //     }
    // }, [loginToken]);




    const listGrid = true;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const handleStart = (url) => {
            const basePath = url.split("?")[0];

            if (`/specials/` !== basePath) {
                setIsLoading(true);
                dispatch(setFirst(false));
                dispatch(setShopCategory({}));
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
                {/*<title>{data?.categoriesData?.category?.metadata[0]?.meta_value[0]?.seo_title}</title>*/}
                {/*<meta name="description" content={data?.categoriesData?.category?.metadata[0]?.meta_value[0]?.seo_description}/>*/}
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
            </Head>
            {/*{*/}
            {/*    mainMenu.length > 0 &&*/}
            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                {
                    shopCategory && Object.keys(shopCategory).length !== 0 &&
                    <>
                        <BreadCrumb parent={[{
                            name: 'Specials',
                            url: ``
                        }
                        ]} title={'Specials'} slug={"specials"}
                                    categoryBanner={shopCategory?.brand?.active_children}
                        />

                        <ShopLeftSidebarContain
                            shopProducts={Object.keys(shopCategory).length > 0 ? shopCategory.products : data?.brandsData?.products}
                            shopFilters={shopCategory?.filters} sale="&sale_price=true"
                            shopCategory={shopCategory?.brand}
                            listGrid={listGrid}/>
                    </>
                }

                {data?.specialOffer?.length > 0 &&
                    <ElectronicHurryUp tabSection={specialOffer.length > 0 ? specialOffer : data?.specialOffer}/>}
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
                {/*<CanvasOffset productData={productData}/>*/}
                <CommonMobileView/>
            </Layout6>


        </>
    );
};


export default Specials;