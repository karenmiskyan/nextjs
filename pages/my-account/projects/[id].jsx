import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands,
    getFooterCenter,
    getFooterLeft,
    getFooterRight,
    getMainMenu,
    getNewArrival,
    getNewOffer,
    getSpecialOffer,
    getSlider,
    getShopByCategory,
    selectFooterCenter,
    selectFooterLeft,
    selectFooterRight,
    selectMainMenu,
    selectSpecialOffer,
    selectSlider,
    selectNewArrival,
    selectShopByCategory,
    selectNewOffer,
    selectBrands
} from "../../../ReduxToolkit/Slices/AllGetSlice";
import {selectAuth, selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout6 from "../../../Layout/Layout6";
import MyProjectsSection from "../../../Components/Pages/UserDashboard/MyProjectsSection";
import {Col, Container, Row} from "reactstrap";
import BeforeSignInAccount from "../../../Components/Pages/UserDashboard/BeforeSignInAccount";
import {Backdrop, CircularProgress} from "@mui/material";
import CommonMobileView from "../../../Components/Element/CommonMobileView";
import {APICallUrl} from "../../../Components/Constant";
import MyProject from "../../../Components/Pages/UserDashboard/MyProject";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "../../../ReduxToolkit/store";

// export async function getServerSideProps({params}) {
//     const project = await fetch(`${APICallUrl}/api/projects/${params.id}`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json;charset=UTF-8",
//                 // Authorization: `Bearer ${loginToken.token}`
//             }
//         });
//     const data = {
//         project: await project?.json(),
//     }
//     return {props: {data}}
// }


export async function getServerSideProps({res}) {

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

const Id = ({data}) => {
    const dispatch = useDispatch();

    const auth = useSelector(selectAuth);
    const loginToken = useSelector(selectLoginToken);
    const [isLoading, setIsLoading] = useState(false);
    const [project, setProject] = useState({});
    const [s, setS] = useState(true);

    const
        [isCartOpen, setIsCartOpen] = useState(false);
    const router = useRouter();


    const isOpen = () => {
        setIsCartOpen(!isCartOpen);
    };

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
        if (router?.query?.id) {
            fetch(`${APICallUrl}/api/projects/${router?.query?.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                }
            })
                .then((res) => res.json()).then((res) => {

                if (res?.project) {
                    setProject(res);
                    setS(false);

                } else {
                    // router.push('/404');
                    // setProjects(res?.projects);
                    setProject(res);
                    setS(false);
                }

            })
                .catch((error) => {
                    // Handle general fetch error
                    setS(false);
                    console.error('Failed to get Project', error);
                });
        }
        // setS(false);

    }, [loginToken, router])


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

    let signIn = true;
    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' type='image/x-icon' href={`/assets/svg/koalogo.png`}/>
            </Head>
            <Layout6 mainMenu={data?.mainMenu[0]} footerLeft={data?.footerLeft} footerCenter={data?.footerCenter}
                     footerRight={data?.footerRight}>
                <PersistGate loading={null} persistor={persistor}>

                    {
                        !auth ?
                            <MyProject project={project?.project} setProject={setProject} s={s}/>
                            :
                            <Container>
                                <Row style={{padding: "20px 0", justifyContent: "center"}}>
                                    <Col lg="4">
                                        <BeforeSignInAccount signIn={signIn} isOpen={isOpen}
                                                             setIsCartOpen={setIsCartOpen}/>
                                    </Col>

                                </Row>
                            </Container>

                    }
                </PersistGate>

                {(isLoading || s)  && (
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