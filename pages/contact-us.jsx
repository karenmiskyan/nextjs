import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands, getFooterCenter, getFooterLeft, getFooterRight,
    getMainMenu, getNewArrival, getNewOffer, getShopByCategory, getSlider, getSpecialOffer, selectBrands,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu, selectNewArrival, selectNewOffer, selectShopByCategory, selectSlider, selectSpecialOffer
} from "../ReduxToolkit/Slices/AllGetSlice";
import {useRouter} from "next/router";
import Layout6 from "../Layout/Layout6";
// import AboutUs from "../Components/AboutUs";
import {Backdrop, CircularProgress} from "@mui/material";
import FlowerSubscribe from "../Components/FlowerDemo/FlowerSubscribe";
import BreadCrumb from "../Components/Element/BreadCrumb";
import ContactContain from "../Components/Pages/ContactUs/ContactContain";
import MapSection from "../Components/Pages/ContactUs/MapSection";
import ContactSidebar from "../Components/Pages/ContactUs/ContactSidebar";
import CommonMobileView from "../Components/Element/CommonMobileView";
import store from "../ReduxToolkit/store";

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

        return {props: {data}};
    } catch (error) {
        console.error("Error fetching main menu:", error);
        return {props: {data: {}}};
    }
}

const locations = [
    // {
    //     lat: 34.20324304455863,
    //     lng: -118.41365990432996,
    //     name: "KOA North Hollywood",
    //     desc1: "7306 Coldwater Canyon Ave Unit 1",
    //     desc2: "North Hollywood CA 91605",
    //     phone: "(818) 255-6666",
    //     workingHours: {
    //         Sunday: "Closed",
    //         Monday: "07:00 AM - 05:30 PM",
    //         Tuesday: "07:00 AM - 05:30 PM",
    //         Wednesday: "07:00 AM - 05:30 PM",
    //         Thursday: "07:00 AM - 05:30 PM",
    //         Friday: "07:00 AM - 05:30 PM",
    //         Saturday: "08:00 AM - 12:00 PM"
    //     }
    // },
    {
        lat: 34.20920438716665,
        lng: -118.4316294886952,
        name: "HEADQUARTERS",
        desc1: "13704 Saticoy ST Panorama City",
        desc2: "CA 91402",
        phone: "(866) 606-5229",
        workingHours: {
            Sunday: "Closed",
            Monday: "07:00 AM - 05:30 PM",
            Tuesday: "07:00 AM - 05:30 PM",
            Wednesday: "07:00 AM - 05:30 PM",
            Thursday: "07:00 AM - 05:30 PM",
            Friday: "07:00 AM - 05:30 PM",
            Saturday: "08:00 AM - 12:00 PM"
        },
        textPickUp: () =>
            <>
                <p>HEADQUARTERS 24/7 Pick-up</p>
                <p>Service Available</p>
            </>
    },
    {
        lat: 34.13015858161867,
        lng: -118.26159175071113,
        name: "KOA GLENDALE",
        desc1: "416 Magnolia Ave",
        desc2: "Glendale CA 91204",
        phone: "(818) 937-9400",
        workingHours: {
            Sunday: "Closed",
            Monday: "08:00 AM - 05:00 PM",
            Tuesday: "08:00 AM - 05:00 PM",
            Wednesday: "08:00 AM - 05:00 PM",
            Thursday: "08:00 AM - 05:00 PM",
            Friday: "08:00 AM - 05:00 PM",
            Saturday: "Closed"
        }
    },
    {
        lat: 33.81468546911048,
        lng: -117.88564385221804,
        name: "KOA ANAHEIM",
        desc1: "2201 E Winston RD Unit A",
        desc2: "Anaheim CA 92806",
        phone: "(714) 464-0110",
        workingHours: {
            Sunday: "Closed",
            Monday: "06:30 AM - 05:00 PM",
            Tuesday: "06:30 AM - 05:00 PM",
            Wednesday: "06:30 AM - 05:00 PM",
            Thursday: "06:30 AM - 05:00 PM",
            Friday: "06:30 AM - 05:00 PM",
            Saturday: "Closed"
        }
    },
    // {
    //     lat: 34.31105728445525,
    //     lng: -118.4763723614668,
    //     name: "KOA SYLMAR DC",
    //     desc1: "15823 Monte ST Unit 101",
    //     desc2: "Sylmar CA 91342",
    //     phone: "(818) 380-3333",
    //     workingHours: {
    //         title: "Will-Call Only"
    //     }
    // },
    {
        lat: 36.09396273840021,
        lng: -115.20226392182711,
        name: "KOA LAS VEGAS",
        desc1: "4518 W Hacienda Ave",
        desc2: "Las Vegas NV 89118",
        phone: "(702) 876-6666",
        workingHours: {
            Sunday: "Closed",
            Monday: "07:00 AM - 05:00 PM",
            Tuesday: "07:00 AM - 05:00 PM",
            Wednesday: "07:00 AM - 05:00 PM",
            Thursday: "07:00 AM - 05:00 PM",
            Friday: "07:00 AM - 05:00 PM",
            Saturday: "Closed"
        },
        textPickUp: () =>
            <>
                <p>Vegas 24/7 Pick-up</p>
                <p>Service Available</p>
            </>
    },
    {
        lat: 34.198026001824566,
        lng: -118.60575384261355,
        name: "KOA WOODLAND HILLS",
        desc1: "7020 Topanga Canyon Blvd",
        desc2: "Canoga Park CA 91303",
        phone: "(818) 346-9999",
        workingHours: {
            Sunday: "Closed",
            Monday: "07:00 AM - 05:00 PM",
            Tuesday: "07:00 AM - 05:00 PM",
            Wednesday: "07:00 AM - 05:00 PM",
            Thursday: "07:00 AM - 05:00 PM",
            Friday: "07:00 AM - 05:00 PM",
            Saturday: "Closed"
        }
    },
    {
        lat: 32.833006626158266,
        lng: -117.16163721765068,
        name: "KOA SAN DIEGO",
        desc1: "7290 Clairemont Mesa Blvd",
        desc2: "San Diego CA 92111",
        phone: "(619) 603-6666",
        workingHours: {
            Sunday: "Closed",
            Monday: "07:00 AM - 05:00 PM",
            Tuesday: "07:00 AM - 05:00 PM",
            Wednesday: "07:00 AM - 05:00 PM",
            Thursday: "07:00 AM - 05:00 PM",
            Friday: "07:00 AM - 05:00 PM",
            Saturday: "Closed"
        }
    },
    {
        lat: 34.02485394134328,
        lng: -118.35158003436439,
        name: "KOA LOS ANGELES",
        desc1: "4921 West Exposition Blvd",
        desc2: "Los Angeles CA 90016",
        phone: "(213) 699-0000",
        workingHours: {
            Sunday: "Closed",
            Monday: "07:00 AM - 05:00 PM",
            Tuesday: "07:00 AM - 05:00 PM",
            Wednesday: "07:00 AM - 05:00 PM",
            Thursday: "07:00 AM - 05:00 PM",
            Friday: "07:00 AM - 05:00 PM",
            Saturday: "Closed"
        },

    },

];
const ContactUs = ({data, loadError, isLoaded}) => {
    const dispatch = useDispatch();

    const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
    const {overlay, TopMenuToggle} = useSelector((state) => state.ModalReducer);

    const [mapCenter, setMapCenter] = useState({lat: 34.20324304455863, lng: -118.41365990432996}); // Default center
    const [zoom, setZoom] = useState(6);

    const [zIndex, setZIndex] = useState(1);

    useEffect(() => {
        if (Is_Focus || Is_Search || TopMenuToggle) {
            setZIndex(4000)
        } else {
            setZIndex(1)
        }
    }, [Is_Focus, Is_Search, TopMenuToggle]);

    // useEffect(() => {
    //     if (shopByCategory.length === 0) {
    //         dispatch(getSlider());
    //         dispatch(getSpecialOffer());
    //         dispatch(getShopByCategory());
    //         dispatch(getNewArrival());
    //         dispatch(getNewOffer());
    //         dispatch(getBrands());
    //     }
    // }, []);

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

    const onLocationClick = (lat, lng) => {
        window.scrollTo(0, 0)
        setMapCenter({lat, lng});
        setZoom(18);
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>

            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                {/*<BreadCrumb parent={'Contact Us'} title={'Contact Us'}/>*/}
                <MapSection locations={locations} center={mapCenter} zoom={zoom}/>
                <ContactSidebar locations={locations} onLocationClick={onLocationClick}/>
                <ContactContain/>

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

export default ContactUs;
