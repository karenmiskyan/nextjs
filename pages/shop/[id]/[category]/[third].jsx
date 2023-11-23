import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu, getNewArrival, getNewOffer, getShopByCategory, getSlider, getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft, selectFooterRight,
    selectMainMenu, selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider,
    selectSpecialOffer
} from "../../../../ReduxToolkit/Slices/AllGetSlice";
import {
    selectResetAll,
    selectShopCategory, setFilterAttribute,
    // selectShopFilters,
    // selectShopProducts,
    // selectUrl,
    setFilterBrands,
    setFilterCategory, setFirst, setLoading, setPopState,
    setPriceRange, setResetAll,
    setShopCategory,
    // setShopFilters,
    // setShopProducts
} from "../../../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout6 from "../../../../Layout/Layout6";
import BreadCrumb from "../../../../Components/Element/BreadCrumb";
import ShopLeftSidebarContain from "../../../../Components/Shop/ShopLeftSidebarContain";
import ElectronicHurryUp from "../../../../Components/ElectronicDemo/ElectronicHurryUp";
import FlowerSubscribe from "../../../../Components/FlowerDemo/FlowerSubscribe";
import {APICallUrl} from "../../../../Components/Constant";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../../../Components/Element/CommonMobileView";
import store from "../../../../ReduxToolkit/store";
import {selectLoginToken} from "../../../../ReduxToolkit/Slices/LoginSlice";
import SectionSvg from "../../../../Components/Pages/404/SectionSvg";


// export async function getServerSideProps({ params }) {
//     try {
//         const categoriesData = await fetch(`${APICallUrl}/shop/${params?.third}?per_page=12&json=true`);
//         const data = {
//             categoriesData: await categoriesData?.json(),
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
        const categoriesDataResponse = await fetch(`${APICallUrl}/shop/${params?.third}?per_page=12&json=true`);
        const categoriesData = await categoriesDataResponse?.json();
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

        data.categoriesData = categoriesData;

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

const Third = ({data}) => {
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
        dispatch(setPopState(false));
        // dispatch(setFirst(false));
        dispatch(setShopCategory(data?.categoriesData));
        dispatch(setPriceRange([]));
        dispatch(setFilterBrands([]));
        dispatch(setFilterAttribute([]));
        dispatch(setFilterCategory([]));

    }, []);

    useEffect(() => {
        if (Object.keys(loginToken).length > 0) {
            dispatch(getSpecialOffer(loginToken));
        }
    }, [loginToken]);

    const router = useRouter();




    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => {
            // if (router.asPath !== url) {
            //     setIsLoading(true);
            // }
            const basePath = url.split("?")[0];
            // if (router.asPath !== url) {
            //     const basePath = url.split("?")[0];
            //     setIsLoading(true);
            // }
            if (`/shop/${router?.query?.id}/${router?.query?.category}/${router?.query?.third}/` !== basePath) {
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


    const listGrid = true;
    function addProductJsonLd() {

        return {
            __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "${data?.categoriesData?.category?.metadata[0]?.meta_value[0]?.seo_title || "KOA E.D.I."}",
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
                <title>{data?.categoriesData?.category?.metadata[0]?.meta_value[0]?.seo_title}</title>
                <meta name="description"
                      content={data?.categoriesData?.category?.metadata[0]?.meta_value[0]?.seo_description}/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <script
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
                                        name: 'Shop',
                                        url: `${data?.categoriesData?.category?.parent?.slugable?.prefix}`
                                    }, {
                                        name: `${data?.categoriesData?.category?.parent?.parent?.name}`,
                                        url: `${data?.categoriesData?.category?.parent?.parent?.slugable?.prefix}/${data?.categoriesData?.category?.parent?.parent?.slugable?.key}`
                                    }, {
                                        name: `${data?.categoriesData?.category?.parent?.name}`,
                                        url: `${data?.categoriesData?.category?.parent?.slugable?.prefix}/${data?.categoriesData?.category?.parent?.slugable?.key}`
                                    }, {
                                        name: `${data?.categoriesData?.category?.name}`,
                                        url: `${data?.categoriesData?.category?.slugable?.prefix}/${data?.categoriesData?.category?.slugable?.key}`
                                    }
                                    ]}
                                                title={data?.categoriesData?.category?.name}
                                                categoryBanner={data?.categoriesData?.category?.active_children}/>

                                    <ShopLeftSidebarContain
                                        shopProducts={Object.keys(shopCategory).length > 0 ? shopCategory.products : data?.categoriesData?.products}
                                        shopFilters={Object.keys(shopCategory).length > 0 ? shopCategory.filters : data?.categoriesData?.filters}
                                        shopCategory={shopCategory?.category} sale="" listGrid={listGrid}/>
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
                <CommonMobileView/>

            </Layout6>
        </>
    );
};

export default Third;