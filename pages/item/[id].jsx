import Head from 'next/head';
import React, {useEffect, useState} from 'react';
import {APICallUrl, APIImage} from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import ProductRightSidebarContain from '../../Components/Products/ProductRightSidebarContain.jsx';
import ElectronicHurryUp from "../../Components/ElectronicDemo/ElectronicHurryUp";
import ElectronicVR from "../../Components/ElectronicDemo/ElectronicVR";
import {
    getBrands,
    getFooterCenter,
    getFooterLeft,
    getFooterRight,
    getMainMenu,
    getNewArrival, getNewOffer, getShopByCategory, getSlider,
    getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu,
    selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider,
    selectSpecialOffer
} from "../../ReduxToolkit/Slices/AllGetSlice";
import {useDispatch, useSelector} from "react-redux";
import Layout6 from "../../Layout/Layout6";
import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../Components/Element/CommonMobileView";
import store from "../../ReduxToolkit/store";
import {selectLoginToken} from "../../ReduxToolkit/Slices/LoginSlice";
import SectionSvg from "../../Components/Pages/404/SectionSvg";
import Accessories from "../../Components/Products/Accessories";

// export async function getServerSideProps({params}) {
//     const product = await fetch(`${APICallUrl}/item/${params?.id}?json=true`);
//
//     const data = {
//         product: await product?.json(),
//         params: params.id
//     }
//     return {props: {data}}
// }

// export async function getServerSideProps({ params }) {
//     try {
//         const product = await fetch(`${APICallUrl}/item/${params?.id}?json=true`);
//         const data = {
//             product: await product?.json(),
//             params: params.id
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
        const productResponse = await fetch(`${APICallUrl}/item/${params?.id}?json=true`);
        const product = await productResponse?.json();

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
        data.domain = req.headers.host;
        data.product = product;
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

const Product = ({data}) => {

    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const specialOffer = useSelector(selectSpecialOffer);
    const newArrival = useSelector(selectNewArrival);
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

        fetch(`${APICallUrl}/item/${data?.product?.product?.slugable?.key}?json=true`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token || ""}`
            }
        }).then(res => res.json().then(res => {
                setProduct(res);
            })
        )
    }, [data, loginToken])

    useEffect(() => {

        if (Object.keys(loginToken).length > 0) {
            dispatch(getNewArrival(loginToken));
            dispatch(getSpecialOffer(loginToken));
        }
    }, [loginToken]);


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


    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function addProductJsonLd() {
        // const seoTitle = (data?.product?.product?.metadata[0]?.meta_value[0]?.seo_title || "").replace(/"/g, "\\"");
        const seoTitle = (data?.product?.product?.metadata[0]?.meta_value[0]?.seo_title || "").replace(/"/g, '\\"');
        const seoDescription = (data?.product?.product?.metadata[0]?.meta_value[0]?.seo_description || "").replace(/"/g, '\\"');

        const images = data?.product?.product?.images?.map(el => `${APIImage}/${el}`) || [];
        return {
            __html: `{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "${seoTitle}",
    "image": ${JSON.stringify(images)},
    "description": "${seoDescription}",
    "sku": "${data?.product?.product?.sku}",
    "mpn": "${data?.product?.product?.sku}",
    "brand": {
        "@type": "Brand",
        "name": "${data?.product?.product?.brand?.name}",
        "url": "${data.domain}/brand/${data?.product?.product?.brand?.slugable?.key}"
    },
    "offers": {
        "@type": "Offer",
        "url": "${data.domain}/${data?.product?.product?.slugable?.prefix}/${data?.product?.product?.slugable?.key}",
        "priceCurrency": "USD",
        "price": "${(product?.product?.front_sale_price !== null || undefined) && (product?.product?.price > product?.product?.front_sale_price) ? product?.product?.front_sale_price.toFixed(2) : product?.product?.price?.toFixed(2)}",
        "priceValidUntil": "${formatDate(data?.product?.product?.created_at || new Date())}",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "Organization",
            "name": "KOA E.D.I."
        }
    }
}
  `,
        };
    }


    return (
        <>
            <Head>
                <title>{data?.product?.product?.metadata[0]?.meta_value[0]?.seo_title}</title>
                <meta name="description" content={data?.product?.product?.metadata[0]?.meta_value[0]?.seo_description}/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addProductJsonLd()}
                    key="product-jsonld"
                />
                <link rel='icon' type='image/x-icon' href={`/assets/images/koalogo.png`}/>
            </Head>
            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>

                {
                    data.product ? <>
                        <BreadCrumb parent={[{
                            name: 'Item',
                            url: `shop`
                        }, {
                            name: `${data?.product?.product?.name}`,
                            url: `${data?.product?.product?.slugable?.prefix}/${data?.product?.product?.slugable?.key}`
                        }
                        ]}/>
                        <ProductRightSidebarContain
                            singleProduct={Object.keys(product).length > 0 && product?.product.id === data?.product?.product?.id ?
                                product : data?.product}/>
                        {/*<ProductSection productData={productData} />*/}

                        {
                            product?.product?.cross_sales?.length > 0 ? product?.product?.cross_sales?.length > 4 ?
                                <ElectronicVR productData={product?.product?.cross_sales} title="Accessories"
                                              addToCart={true}/> :
                                <Accessories acc={product?.product?.cross_sales} addToCart={true}
                                             title="Accessories"/> : ""

                        }


                        {data?.specialOffer?.length > 0 &&
                            <ElectronicHurryUp
                                tabSection={specialOffer.length > 0 ? specialOffer : data?.specialOffer}/>}


                        {data?.newArrival?.length > 0 &&
                            <ElectronicVR productData={newArrival.length > 0 ? newArrival : data?.newArrival}/>}

                        <FlowerSubscribe/>
                    </> : <SectionSvg/>
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

            {/*<RecentNotification/>*/}
            {/*<StickyFooter productData={productData}/>*/}
        </>

    );
};


export default Product;