/* eslint-disable @next/next/no-page-custom-font */
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {useRouter} from 'next/router';
import CartSuccessModal from '../Components/Element/CartSuccessModal';
import CommonMobileView from '../Components/Element/CommonMobileView';
import '../public/assets/scss/app.scss';
import store, {persistor} from '../ReduxToolkit/store';
import CommonModel from '../Components/Element/CommonModel';
import SizeModal from '../Components/Element/SizeModal';
import YoutubeModal from '../Components/FashionDemo/YoutubeModal';
import DeleteModal from '../Components/Pages/UserDashboard/DeleteModal';
import ConfirmDeleteModal from '../Components/Pages/UserDashboard/ConfirmDeleteModal';
import CopyConfigModal from '../Layout/Common/Customizer/CopyConfigModal';
import {APICallUrl} from "../Components/Constant";
import {PersistGate} from "redux-persist/integration/react";
import {selectLoginToken} from "../ReduxToolkit/Slices/LoginSlice";
import {useLoadScript} from "@react-google-maps/api";

const libraries = ["places"];

export default function MyApp({Component, pageProps}) {
    const bootstarpRtl = '/assets/css/bootstrap.min.css';
    const router = useRouter();

    // useEffect(() => {
    //     router.pathname.search('/product') === -1 && document.body.classList.remove('stickyCart');
    //     if (router.pathname === '/page/coming_soon') {
    //         document.body.classList.add('light-gray-bg');
    //     } else if (router.pathname !== '/page/coming_soon') {
    //         document.body.classList.remove('light-gray-bg');
    //     }
    //
    // }, [router.pathname]);
    const pathArr = router.pathname.split('/');
    const titleName = pathArr[pathArr.length - (pathArr[pathArr.length - 1][0] == '[' ? 2 : 1)].split('_').map((data) => data.split().map((char, i) => char.charAt(0).toUpperCase() + char.slice(1)) + '');
    const [domain, setDomain] = useState("")
    const [scr, setScr] = useState("")


    useEffect(() => {
        setDomain(window.location.origin);
        // fetch(`${APICallUrl}/api/get-google-tag`, {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json;charset=UTF-8"
        //     },
        // })
        //     .then((res) => res.text()).then((res) => {
        //         setScr(res)
        //
        // })
        //     .catch((error) => {
        //         console.error('Failed to get States', error);
        //     });
    }, []);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDhBcYvcKqpiXO3jOcUX8erzH2491GOLjc",
        libraries,
    });


    function addProductJsonLd() {
        const modifiedTitleName = titleName.toString().replace(/-/g, ' ');

        return {
            __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "${titleName.toString() !== "" ? modifiedTitleName : "KOA E.D.I."}",
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
                {/*<script defer src="https://www.paypal.com/sdk/js?client-id=AdTomoL9x9F5h9cvocPIZvD4qXtMpAPHav3ADyWYPis7S7ArFH6Sig6w6mdrO46onJY-AElqEgUnBdV8"></script>*/}
                <title>{titleName}</title>
                <link rel='icon' type='image/x-icon' href={`/assets/images/koalogo.png`}/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link id="rtl-link" rel="stylesheet" type="text/css" href={bootstarpRtl}/>
                <link rel="canonical" href={`${domain}${router.asPath}`}/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
                    rel="stylesheet"/>
                <meta name="google-site-verification" content="jsrLdK6AIfFp5ne1rmK0LzERfE0QJn7KIOxSVf671zE"/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addProductJsonLd()}
                    key={`product-jsonld`}
                />

                {/*<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>*/}
                {/*<script type="text/javascript" async=""*/}
                {/*        src="https://www.googletagmanager.com/gtag/js?id=G-EJ0LRGKXYM&amp;l=dataLayer&amp;cx=c"></script>*/}
                {/*<script src="https://www.googletagmanager.com/gtag/js?id=UA-58151529-1" async="" defer=""></script>*/}
                {/*{google || ""}*/}

                {/*<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcIE4MU6ZTR_k3-9G9TYitUpx2dM3ur9Y"></script>*/}
                {/*<script async defer*/}
                {/*        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoVE9yQ3Y_48ThEQV7bYtdMxSXeBZ72AU&callback=initMap">*/}
                {/*</script>*/}
                {/*<script src='https://checkout.stripe.com/checkout.js'></script>*/}


            </Head>

            <Provider store={store}>
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                <Component  {...pageProps} loadError={loadError} isLoaded={isLoaded}/>
                {/*</PersistGate>*/}
                {/*<Overlay/>*/}
                <CartSuccessModal/>
                {/*{*/}
                {/*    pathArr.includes('register') || pathArr.includes('login') || pathArr.includes('forgot_password') || pathArr.includes('coming_soon') !== true &&*/}
                {/*    <CommonMobileView/>*/}
                {/*}*/}
                <ToastContainer/>
                <SizeModal/>
                <CommonModel/>
                <DeleteModal/>
                <ConfirmDeleteModal/>
                <YoutubeModal/>
                <CopyConfigModal/>
            </Provider>
        </>
    );
}

// MyApp.getInitialProps = async ({ req }) => {
//     try {
//         const data = {}
//         if (req) {  // Only available on server-side
//             data.domain = req.headers.host;
//         }
//         // Uncomment and modify your fetch API calls
//         // const mainMenu = await fetch(`${APICallUrl}/api/main-menu?slug=main-menu`);
//         // data.mainMenu = await mainMenu.json();
//
//         return {appProps: { data }};
//     } catch (error) {
//         console.error("Error fetching data in getInitialProps", error);
//         return {appProps: { data: {} }};
//     }
// }
// export default appWithTranslation(MyApp);

