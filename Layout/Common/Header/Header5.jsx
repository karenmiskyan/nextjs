import React, {useEffect, useRef, useState} from 'react';
import {Col, Row} from 'reactstrap';
import {useHeaderScroll} from '../../../Utils/HeaderScroll';
import AllCategories from '../../Element/AllCategories';
import HeadingLogo from '../../Element/HeadingLogo';
import ItemCart from '../../Element/ItemCart';
import SearchBarToggle from '../../Element/SearchBarToggle';
import SearchBarWithBgColor from '../../Element/SearchBarWithBgColor';
import SearchForVegitable from '../../Element/SearchForVegitable';
import TopHeaderBar2 from '../../Element/TopHeaderBar2';
import AdminUser from "../../Element/AdminUser";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../../ReduxToolkit/store";
import NavBar from "../../Element/NavBar";
import {APICallUrl} from "../../../Components/Constant";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

const Header5 = ({noStyle, mainMenu, defImg}) => {

    const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const UpScroll = useHeaderScroll(false);

    const [onInputText, setOnInputText] = useState('');

    const [categoriesData, setCategoriesData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);
    const [productData, setProductData] = useState([]);
    const divRef = useRef();
    const [loading, setLoading] = useState(true);

    const [timer, setTimer] = useState(null);

    const makeAPICall = async (searchQuery) => {
        if (searchQuery.length > 1) {
            const apiUrl = `${APICallUrl}/api/search-products?q=${searchQuery}&json=true`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProductData(data?.products?.data);
                setBrandsData(data?.brands);
                setCategoriesData(data?.categories);

            } catch (error) {
                console.error('Error making API call:', error);
            }
        }
    };

    const handleKeyUp = () => {
        dispatch({type: 'IS_FOCUS', payload: true});
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout(() => {

                makeAPICall(onInputText);
            }, 500)
        );
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    const handleOutsideClick = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            dispatch({type: 'IS_FOCUS', payload: false});
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    useEffect(() => {
        if (onInputText.length > 1 && Is_Focus) {
            document.body.style.overflow = 'hidden'; // Hide body overflow
        } else {
            document.body.style.overflow = 'visible'; // Restore body overflow
        }
    }, [onInputText, Is_Focus]);


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            router.push(`/shop?s=${onInputText}`);
        }
    };

    return (
        <header id='home' className={` nav-down  ${!noStyle ? `${UpScroll ? 'nav-up' : ''}` : ''} `}
                style={{zIndex: "1300", position: "relative", height: "160px"}}>
            <TopHeaderBar2 UpScroll={UpScroll}/>
            <div className="navbar-searchbar">
                <div className='main-header search-header' style={{backgroundColor: "#0D2427"}}>
                    <div className='container-fluid-lg'>
                        <Row>
                            <Col lg='12'>
                                <div className='main-menu'>
                                    <div className='menu-left'>
                                        <HeadingLogo defImg={defImg}/>
                                    </div>
                                    <SearchForVegitable productData={productData} brandsData={brandsData}
                                                        categoriesData={categoriesData} Is_Focus={Is_Focus}
                                                        onInputText={onInputText}
                                                        divRef={divRef} loading={loading}
                                                        handleKeyPress={handleKeyPress}
                                                        setOnInputText={setOnInputText} handleKeyUp={handleKeyUp}
                                    />
                                    <div className='menu-right'>
                                        <SearchBarToggle productData={productData} brandsData={brandsData}
                                                         setOnInputText={setOnInputText}
                                                         categoriesData={categoriesData} Is_Focus={Is_Focus}
                                                         onInputText={onInputText}
                                                         handleKeyUp={handleKeyUp}
                                                         handleKeyPress={handleKeyPress}
                                                         Is_Search={Is_Search} loading={loading}/>
                                        <SearchBarWithBgColor customeClass={'d-lg-none d-block'}/>
                                        {Is_Search &&
                                            <div className="overlay"/>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='main-header'>
                    <div className='container-fluid-lg' style={{backgroundColor: " #eff2f7"}}>
                        <Row>
                            <Col lg='12'>
                                <div className='main-menu'>
                                    <nav>
                                        <NavBar mainMenu={mainMenu}/>
                                    </nav>
                                    <div className='menu-right'>
                                        <ul>
                                            {/*<li>*/}
                                            {/*  <ThreeBarToggle />*/}
                                            {/*</li>*/}
                                            {/*<li className='onhover-dropdown wislist-dropdown'>*/}
                                            {/*  <div className='cart-media'>*/}
                                            {/*    <div className='cart-icon'>*/}
                                            {/*      <RefreshCw />*/}
                                            {/*      <span className='label label-theme rounded-pill'>0</span>*/}
                                            {/*    </div>*/}
                                            {/*    <div className='cart-content'>*/}
                                            {/*      <h6>Empty</h6>*/}
                                            {/*      <span>Compare</span>*/}
                                            {/*    </div>*/}
                                            {/*  </div>*/}
                                            {/*</li>*/}

                                            {/*<li className='onhover-dropdown account-dropbox'>*/}
                                            {/*    <div className='cart-media'>*/}
                                            {/*        <img className="percent-image"*/}
                                            {/*             src={"/assets/images/Vector.png"}/>*/}
                                            {/*        <Percent*/}
                                            {/*            size={15}*/}
                                            {/*            className="percent"*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*</li>*/}
                                            {/*<WishList />*/}
                                            <PersistGate loading={null} persistor={persistor}>
                                                <AllCategories/>
                                                <AdminUser/>
                                                <ItemCart/>
                                            </PersistGate>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header5;
