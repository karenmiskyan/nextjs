import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout6 from "../../Layout/Layout6";
import PagesSection from "../../Components/Pages/PagesSection";
import BreadCrumb from "../../Components/Element/BreadCrumb";
import BlogDetails from "../../Components/Blog/BlogDetails";
import SectionSvg from "../../Components/Pages/404/SectionSvg";
import FlowerSubscribe from "../../Components/FlowerDemo/FlowerSubscribe";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../Components/Element/CommonMobileView";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu, getNewArrival, getNewOffer, getShopByCategory, getSlider, getSpecialOffer,
    selectBrands, selectFooterCenter, selectFooterLeft, selectFooterRight,
    selectMainMenu, selectNewArrival, selectNewOffer,
    selectShopByCategory,
    selectSlider,
    selectSpecialOffer
} from "../../ReduxToolkit/Slices/AllGetSlice";
import store from "../../ReduxToolkit/store";
import {APICallUrl} from "../../Components/Constant";
import EventSingle from "../../Components/Pages/EventPage/EventSingle";
import Script from "next/script";

export async function getServerSideProps({res, req, params}) {
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
        const postResponse = await fetch(`${APICallUrl}/api/v1/posts/${params.id}`);
        const eventsPopularResponse = await fetch(`${APICallUrl}/api/v1/posts?is_featured=true&type=event`);
        const blogsPopularResponse = await fetch(`${APICallUrl}/api/v1/posts?is_featured=true`);
        const blogsPopular = await blogsPopularResponse?.json();
        const postJson = await postResponse?.json();
        const eventsPopular = await eventsPopularResponse?.json();

        // Checking the condition for 404 early on to avoid unnecessary operations.

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

        if (postJson.error === true || postJson.data.categories[0].slug !== "events") {
            res.statusCode = 404;
            data.post = {
                error: true
            }
            // blogsPopular.error = true
        } else {
            data.post = postJson;

        }

        data.domain = req.headers.host;
        data.eventsPopular = eventsPopular;
        data.blogsPopular = blogsPopular;
        data.params = params
        return {props: {data}};

    } catch (error) {
        console.error("Error fetching:", error);
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
        return {props: {data}};
        // res.statusCode = 500;
        // res.end("Internal Server Error");
        // return;
    }
}

const Id = ({data}) => {


    const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
    const {overlay, TopMenuToggle} = useSelector((state) => state.ModalReducer);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    let [zIndex, setZIndex] = useState(1);

    useEffect(() => {
        if (Is_Focus || Is_Search || TopMenuToggle) {
            setZIndex(4000)
        } else {
            setZIndex(1)
        }
    }, [Is_Focus, Is_Search, TopMenuToggle]);


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

    function addProductJsonLd() {

        return {
            __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "${data?.post?.data?.metadata[0]?.meta_value[0]?.seo_title || "KOA E.D.I."}",
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
            {

                data?.post?.error !== true ? <Head>

                        <title>{data?.post?.data?.metadata[0]?.meta_value[0]?.seo_title}</title>
                        <meta name="description"
                              content={data?.post?.data?.metadata[0]?.meta_value[0]?.seo_description}/>
                        <Script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={addProductJsonLd()}
                            key={`product-jsonld`}
                        />
                    </Head>
                    :
                    <Head>
                        <meta name='viewport' content='width=device-width, initial-scale=1'/>
                    </Head>

            }


            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>

                {
                    data?.post?.error !== true ? <>
                            <BreadCrumb parent={[{
                                name: 'Event',
                                url: `event`
                            }, {
                                name: `${data?.post?.data?.name}`,
                                url: `event/${data?.post?.data?.slug}`
                            }

                            ]} title={'Blog Details'}/>

                            <EventSingle post={data?.post} domain={data?.domain} blogsPopular={data?.eventsPopular}
                                         two={data?.blogsPopular}/>
                        </> :
                        <SectionSvg/>
                }

                {/*<RelatedBlog/>*/}
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

export default Id;