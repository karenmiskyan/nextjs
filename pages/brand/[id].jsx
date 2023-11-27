import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    selectShopCategory, setFilterAttribute,
    // selectUrl,
    setFilterBrands, setFilterCategory, setFirst, setLoading, setPopState, setPriceRange, setResetAll,
    setShopCategory,
    // setShopFilters,
    // setShopProducts
} from "../../ReduxToolkit/Slices/ShopProductsSlice";
import Layout6 from "../../Layout/Layout6";
import Head from "next/head";
import BreadCrumb from "../../Components/Element/BreadCrumb";
import ShopLeftSidebarContain from "../../Components/Shop/ShopLeftSidebarContain";
import ElectronicHurryUp from "../../Components/ElectronicDemo/ElectronicHurryUp";
import FlowerSubscribe from "../../Components/FlowerDemo/FlowerSubscribe";
import {APICallUrl} from "../../Components/Constant";
import {
    getBrands,
    getFooterCenter,
    getFooterLeft,
    getFooterRight,
    getMainMenu, getNewArrival, getNewOffer, getShopByCategory, getSlider,
    getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu, selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider,
    selectSpecialOffer
} from "../../ReduxToolkit/Slices/AllGetSlice";
import {Backdrop, CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import CommonMobileView from "../../Components/Element/CommonMobileView";
import store from "../../ReduxToolkit/store";
import {selectLoginToken} from "../../ReduxToolkit/Slices/LoginSlice";
import SectionSvg from "../../Components/Pages/404/SectionSvg";
import Script from "next/script";


// export async function getServerSideProps({ params }) {
//     try {
//         const brandsData = await fetch(`${APICallUrl}/brand/${params?.id}?per_page=12&json=true`);
//         const data = {
//             brandsData: await brandsData?.json(),
//             params: params
//         }
//         return { props: { data } };
//     } catch (error) {
//         return {
//             redirect: {
//                 destination: '/404', // Redirect to your 404 page
//                 permanent: false,
//             },
//         };
//     }
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
        const brandsDataResponse = await fetch(`${APICallUrl}/brand/${params?.id}?per_page=12&json=true`);
        const brandsData = await brandsDataResponse?.json();

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

        data.brandsData = brandsData;

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

const BrandCategory = ({data}) => {

    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const shopCategory = useSelector(selectShopCategory);
    const specialOffer = useSelector(selectSpecialOffer);
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
        if (Object.keys(loginToken).length > 0) {
            dispatch(getSpecialOffer(loginToken))
        }
    }, [loginToken]);

    useEffect(() => {
        dispatch(setShopCategory(data?.brandsData));
        // dispatch(setFirst(false));
        dispatch(setPopState(false));
        dispatch(setFilterBrands([]));
        dispatch(setFilterAttribute([]));
        dispatch(setFilterCategory([]));
        dispatch(setPriceRange([]));
    }, [])
    useEffect(() => {
        dispatch({type: 'IS_FOCUS', payload: false});
        dispatch({type: 'IS_SEARCH', payload: false});
    }, [data])

    // useEffect(() => {
    //     dispatch(setShopCategory(data?.brandsData));
    //     // dispatch(setShopFilters(data?.brandsData?.filters));
    //     // dispatch(setShopProducts(data?.brandsData?.products));
    //     dispatch(setLoading(false));
    //     dispatch(setResetAll(false));
    //     dispatch({type: 'IS_FOCUS', payload: false});
    //     dispatch({type: 'IS_SEARCH', payload: false});
    // }, [data])


    const listGrid = true;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => {
            const basePath = url.split("?")[0];
            // if (router.asPath !== url) {
            //     const basePath = url.split("?")[0];
            //     setIsLoading(true);
            // }
            if (`/brand/${router?.query?.id}/` !== basePath) {
                setIsLoading(true);
                dispatch(setFirst(false));
                dispatch(setShopCategory({}));
            }
            // if (router.asPath !== url) {
            //     setIsLoading(true);
            // }
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

    function addProductJsonLd() {

        return {
            __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "${data?.brandsData?.brand?.metadata[0]?.meta_value[0]?.seo_title || "KOA E.D.I."}",
                        "url": "https://koaedi.com${router.asPath}",
                        "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://koaedi.com/?s={search_term}",
                        "query-input": "required name=search_term"
                    }
  `,
        };
    }


    return (
        <>
            <Head>
                <title>{data?.brandsData?.brand?.metadata[0]?.meta_value[0]?.seo_title}</title>
                <meta name="description"
                      content={data?.brandsData?.brand?.metadata[0]?.meta_value[0]?.seo_description}/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addProductJsonLd()}
                    key={`product-jsonld`}
                />
            </Head>

            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                {
                    shopCategory ?
                        <>
                            {
                                Object.keys(shopCategory).length !== 0 &&
                                <>
                                    <BreadCrumb parent={[{
                                        name: 'Brands',
                                        url: `brands`
                                    }, {
                                        name: `${data?.brandsData?.brand?.name}`,
                                        url: `${data?.brandsData?.brand?.slugable?.prefix}/${data?.brandsData?.brand?.slugable?.key}`
                                    }
                                    ]} title={data?.brandsData?.brand?.name} slug={"brands"}
                                                categoryBanner={data?.brandsData?.brand?.active_children}/>

                                    <ShopLeftSidebarContain
                                        shopProducts={Object.keys(shopCategory).length > 0 ? shopCategory.products : data?.brandsData?.products}
                                        shopFilters={Object.keys(shopCategory).length > 0 ? shopCategory.filters : data?.brandsData?.filters}
                                        shopCategory={shopCategory?.brand} sale=""
                                                            listGrid={listGrid}/>
                                </>
                            }

                            {data?.specialOffer?.length > 0 &&
                                <ElectronicHurryUp
                                    tabSection={specialOffer.length > 0 ? specialOffer : data?.specialOffer}/>}
                            <FlowerSubscribe/>
                        </>
                        : <SectionSvg/>

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
                {/*<CanvasOffset productData={productData}/>*/}
                <CommonMobileView/>

            </Layout6>

        </>
    );
};


export default BrandCategory;