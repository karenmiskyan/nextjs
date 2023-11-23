import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Input, Row} from 'reactstrap';
import {APICallUrl, Billingaddress} from '../../Constant';
import CheckoutForm from './CheckoutForm';
import SideBarCartBox from './SideBarCartBox';
import PaymantMode from "./PaymantMode";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuthUser,
    selectLoginToken, setShippingSing, setShippingThree, setShippingTwo,
    shippingSing,
    shippingThree,
    shippingTwo
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {selectCart, selectCheckoutErrors, selectShippingErrors,} from "../../../ReduxToolkit/Slices/CartSlice";
import Link from "next/link";
import ShippingForm from "./ShippingForm";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";


const local_part_1 = [
    // {title: "7306 Coldwater Canyon Ave Unit 1 North Hollywood CA 91605", id: 1},
    {title: "13704 Saticoy st Panorama City CA 91402", id: 9},
    {title: "416 Magnolia Ave Glendale CA 91204", id: 2},
    {title: "2201 E Winston RD Unit A Anaheim CA 92806", id: 3},
    // {title: "15823 Monte St unit 101 Sylmar CA 91342", id: 4},
    {title: "4518 W Hacienda Ave Las Vegas NV 89118", id: 5},
    {title: "7020 Topanga Canyon Blvd Canoga Park CA 91303", id: 6},
    {title: "7290 Clairemont Mesa Blvd San Diego CA 92111", id: 7},
    {title: "4921 West Exposition Blvd Los Angeles CA 90016", id: 8},
]

const local_part_2 = [
    // {title: "7306 Coldwater Canyon Ave Unit 1 North Hollywood CA 91605", id: 1},
    {title: "13704 Saticoy st Panorama City CA 91402", id: 9},
    {title: "416 Magnolia Ave Glendale CA 91204", id: 2},
    {title: "2201 E Winston RD Unit A Anaheim CA 92806", id: 3},
    // {title: "15823 Monte St unit 101 Sylmar CA 91342", id: 4},
    {title: "4518 W Hacienda Ave Las Vegas NV 89118", id: 5},
    {title: "7020 Topanga Canyon Blvd Canoga Park CA 91303", id: 6},
    {title: "7290 Clairemont Mesa Blvd San Diego CA 92111", id: 7},
    {title: "4921 West Exposition Blvd Los Angeles CA 90016", id: 8},
]

const local_part_3 = [
    // {title: "7306 Coldwater Canyon Ave Unit 1 North Hollywood CA 91605", id: 1},
    {title: "13704 Saticoy st Panorama City CA 91402", id: 9},
    {title: "416 Magnolia Ave Glendale CA 91204", id: 2},
    {title: "2201 E Winston RD Unit A Anaheim CA 92806", id: 3},
    // {title: "15823 Monte St unit 101 Sylmar CA 91342", id: 4},
    {title: "4518 W Hacienda Ave Las Vegas NV 89118", id: 5},
    {title: "7020 Topanga Canyon Blvd Canoga Park CA 91303", id: 6},
    {title: "7290 Clairemont Mesa Blvd San Diego CA 92111", id: 7},
    {title: "4921 West Exposition Blvd Los Angeles CA 90016", id: 8},
]

const SectionCheckout = ({setIsLoading, loading, loadError, isLoaded}) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [zip, setZip] = useState("");
    const [citi, setCiti] = useState({});
    const [tax, setTax] = useState({});
    const [lod, setLod] = useState(false);
    const cart = useSelector(selectCart);
    const userAuth = useSelector(selectAuthUser);
    const loginToken = useSelector(selectLoginToken);
    const [checkout, setCheckout] = useState({});
    const [address, setAddress] = useState(local_part_1[0].id);
    const [address2, setAddress2] = useState(local_part_2[0].id);
    const [address3, setAddress3] = useState(local_part_3[0].id);
    const selectedShipping = useSelector(shippingSing);
    const selectedShippingTwo = useSelector(shippingTwo);
    const selectedShippingThree = useSelector(shippingThree);
    const [zipMismatch, setZipMismatch] = useState(false);
    const [cityMismatch, setCityMismatch] = useState(false);
    const [stateMismatch, setStateMismatch] = useState(false);

    const checkoutErrors = useSelector(selectCheckoutErrors);
    const shippingErrors = useSelector(selectShippingErrors);


    const [zip2, setZip2] = useState("");
    const [citi2, setCiti2] = useState({});
    const [zipMismatch2, setZipMismatch2] = useState(false);
    const [cityMismatch2, setCityMismatch2] = useState(false);
    const [stateMismatch2, setStateMismatch2] = useState(false);

    useEffect(() => {
        setLod(true);
        fetch(`${APICallUrl}/api/get-card-new?zip_code=${isChecked ? zip2 : zip}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
        })
            .then((res) => res.json()).then((res) => {
            setCheckout(res);
            dispatch(setShippingSing(res.part_1.products ? res.part_1.shippingMethods[0] : {}));
            dispatch(setShippingTwo(res.part_2.products ? res.part_2.shippingMethods[0] : {}));
            dispatch(setShippingThree(res.part_3.products ? res.part_3.shippingMethods.some(el => el.shipping_method === "free_shipping") ? res.part_3.shippingMethods.filter(el => el.shipping_method === "free_shipping")[0] : res.part_3.shippingMethods[0] : {}));
            setLod(false);

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to update to cart', error);
                setLod(false);

            });
    }, [zip, zip2, isChecked])

    useEffect(() => {

        fetch(`${APICallUrl}/api/get-tax?state=${isChecked ? citi2?.id : citi?.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
        })
            .then((res) => res.json()).then((res) => {
            if (res.success === true) {
                setTax(res);
            } else {
                setTax({tax: 9.5});
            }
            // setCheckout(res);
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to update to cart', error);
            });
    }, [citi, citi2, isChecked])

    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({});

    const goToNextStep = (data) => {
        setUserData({...userData, ...data});
        setStep(step + 1);
    };

    const goToPreviousStep = () => {
        setStep(step - 1);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);


    const [onAccount, setOnAccount] = useState(false)

    useEffect(() => {

        fetch(`${APICallUrl}/api/visible_on_account`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            }
        })
            .then((res) => res.json()).then((res) => {
            if (res?.is_visibale === true) {
                setOnAccount(res.is_visibale);
            } else {
                setOnAccount(false);
            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to get info', error);

            });

    }, [cart]);

    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Row className='g-4'>
                    <Col lg="12">
                        <Row className="justify-content-center">
                            <Col xl="4" lg="4" xs="4" className="text-center" style={{
                                paddingBottom: "16px",
                                borderBottom: "4px solid var(--theme-color)"
                            }}><h4
                                style={{color: step === 1 ? "" : "#797979", fontWeight: step === 1 ? "500" : ""}}>1.
                                Billing Details</h4></Col>
                            <Col xl="4" lg="4" xs="4" className="text-center"
                                 style={{
                                     paddingBottom: "16px",
                                     borderBottom: step >= 2 ? "4px solid var(--theme-color)" : "4px solid #E2E5EA",
                                 }}><h4
                                style={{color: step === 2 ? "" : "#797979", fontWeight: step === 2 ? "500" : ""}}>2.
                                Order Summary</h4></Col>
                            <Col xl="4" lg="4" xs="4" className="text-center"
                                 style={{
                                     paddingBottom: "16px",
                                     borderBottom: step === 3 ? "4px solid var(--theme-color)" : "4px solid #E2E5EA"
                                 }}><h4
                                style={{color: step === 3 ? "" : "#797979", fontWeight: step === 3 ? "500" : ""}}>3.
                                Payment Method</h4></Col>
                        </Row>
                    </Col>
                    <Col lg='12' className="billing-details">
                        {/*{step === 1 &&*/}
                        <Row style={{display: step === 1 ? "block" : "none"}} className="g-3">
                            {/*<h2 className='mb-3' style={{paddingLeft: "0"}}>Billing Details</h2>*/}
                            <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>
                                <CheckoutForm setZip={setZip} info={userAuth?.data?.addresses[0]} citi={citi}
                                              loadError={loadError} isLoaded={isLoaded}
                                              company_name={userAuth?.data?.company_name || ""}
                                              zipMismatch={zipMismatch} setZipMismatch={setZipMismatch}
                                              cityMismatch={cityMismatch} setCityMismatch={setCityMismatch}
                                              stateMismatch={stateMismatch} setStateMismatch={setStateMismatch}
                                              setCiti={setCiti}/>
                            </Col>
                            <Col lg="12">
                                <div className='form-check p-0 custome-form-check'>
                                    <input
                                        className='checkbox_animated check-it'
                                        type='checkbox'
                                        onChange={() => setIsChecked(prev => !prev)}
                                        checked={isChecked}/>
                                    <p className='form-check-label'
                                       style={{marginBottom: "0", fontWeight: "500"}}>Ship to a different address?</p>

                                    {/*<p className='font-light'>(25)</p>*/}
                                </div>

                            </Col>
                            {/*<GooglePlacesAutocomplete/>*/}

                            {
                                isChecked &&
                                <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px"}}>
                                    <ShippingForm
                                        setZip={setZip2} info={userAuth?.data?.addresses[1]} citi={citi2}
                                        loadError={loadError} isLoaded={isLoaded}
                                        zipMismatch={zipMismatch2} setZipMismatch={setZipMismatch2}
                                        cityMismatch={cityMismatch2} setCityMismatch={setCityMismatch2}
                                        stateMismatch={stateMismatch2} setStateMismatch={setStateMismatch2}
                                        setCiti={setCiti2}
                                    />

                                </Col>

                            }

                        </Row>
                        {step === 2 &&
                            <SideBarCartBox zip={zip} loading={loading} checkout={checkout} tax={tax}
                                            local_part_1={local_part_1} lod={lod}
                                            local_part_2={local_part_2} local_part_3={local_part_3}
                                            address={address}
                                            setAddress={setAddress} address2={address2} address3={address3}
                                            setAddress2={setAddress2} setAddress3={setAddress3}/>
                        }
                        {step === 3 &&
                            <Row>
                                <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>
                                    <PaymantMode setIsLoading={setIsLoading} tax={tax} checkout={checkout}
                                                 check={isChecked} onAccount={onAccount}
                                                 address={local_part_1.find(el => el.id === Number(address))?.title}
                                                 address2={local_part_3.find(el => el.id === Number(address2))?.title}
                                                 address3={local_part_3.find(el => el.id === Number(address3))?.title}
                                    />
                                </Col>
                            </Row>
                        }
                        <Row className="mt-3 justify-content-end g-3">
                            <Col xl="2" lg="3" sm="4" xs="6">
                                <div className='product-buttons'
                                     style={{marginBottom: "0"}}>
                                    <button onClick={goToPreviousStep} disabled={step === 1}
                                            style={{
                                                fontSize: "14px",
                                                padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                            }}
                                            className='btn btn-solid btn-transparent hover-solid btn-animation'>
                                        <span>Back</span>
                                    </button>
                                </div>
                            </Col>
                            <Col xl="2" lg="3" sm="4" xs="6">
                                <div className='product-buttons'
                                     style={{marginBottom: "0"}}>
                                    <button onClick={goToNextStep} disabled={step === 3
                                        || checkoutErrors !== 0 ||
                                        (step === 2 && checkout?.part_1?.products?.length > 0 && Object.keys(selectedShipping).length === 0)
                                        ||
                                        (step === 2 && checkout?.part_2?.products?.length > 0 && Object.keys(selectedShippingTwo).length === 0)
                                        ||
                                        (step === 2 && checkout?.part_3?.products?.length > 0 && Object.keys(selectedShippingThree).length === 0)
                                        || cart.length === 0 ||
                                        // (cityMismatch || stateMismatch || zipMismatch) ||
                                        (isChecked && shippingErrors !== 0
                                            // || (cityMismatch2 || stateMismatch2 || zipMismatch2)
                                        )
                                    }
                                            style={{
                                                fontSize: "14px",
                                                padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"
                                            }}
                                            className='btn btn-solid hover-solid btn-animation'>
                                        <span>Next</span>
                                    </button>
                                </div>
                            </Col>
                            {
                                cart.length === 0 && !loading &&
                                <Col lg="12" className="text-end">
                                    <p className="mb-0">Your cart is empty. <Link href={`/shop`}
                                                                                  style={{fontWeight: "500"}}>Continue
                                        shopping</Link></p>
                                </Col>
                            }
                            {
                                ((step === 2 && checkout?.part_1?.products?.length > 0 && Object.keys(selectedShipping).length === 0) ||
                                    (step === 2 && checkout?.part_2?.products?.length > 0 && Object.keys(selectedShippingTwo).length === 0) ||
                                    (step === 2 && checkout?.part_3?.products?.length > 0 && Object.keys(selectedShippingThree).length === 0)) &&
                                <Col lg="12" className="text-end"><p className="mb-0" style={{fontWeight: "500"}}>Select
                                    the shipping option(s)<span style={{color: "var(--theme-color)"}}>*</span></p></Col>
                            }

                        </Row>

                    </Col>

                    {/*<Col lg='7' className="billing-details">*/}

                    {/*    <h2 className='mb-3' style={{paddingLeft: "0"}}>Billing Details</h2>*/}
                    {/*    <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>*/}
                    {/*        <CheckoutForm setZip={setZip} info={userAuth?.data?.addresses[0]}/>*/}
                    {/*    </Col>*/}
                    {/*    /!*<div className='form-check p-0 custome-form-check' style={{marginTop: "30px"}}>*!/*/}
                    {/*    /!*    <input className='checkbox_animated check-it'*!/*/}
                    {/*    /!*           type='checkbox' style={{top: "-10px"}}*!/*/}
                    {/*    /!*           onClick={() => setCheckBox(!checkBox)}*!/*/}
                    {/*    /!*    />*!/*/}
                    {/*    /!*    <h3 className='mb-3' style={{paddingLeft: "0"}}>Add a different shipping address</h3>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    /!*{*!/*/}
                    {/*    /!*    checkBox ?*!/*/}
                    {/*    /!*        <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>*!/*/}
                    {/*    /!*            <CheckoutForm/>*!/*/}
                    {/*    /!*        </Col> : ""*!/*/}
                    {/*    /!*}*!/*/}


                    {/*    <h2 className='mb-3' style={{paddingLeft: "0", marginTop: "20px"}}>Payment Method</h2>*/}
                    {/*    {*/}
                    {/*        width > 991 ?*/}
                    {/*            <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>*/}
                    {/*                <PaymantMode setIsLoading={setIsLoading}*/}
                    {/*                             address={local_part_1.find(el => el.id === Number(address))?.title}*/}
                    {/*                             address2={local_part_3.find(el => el.id === Number(address2))?.title}*/}
                    {/*                             address3={local_part_3.find(el => el.id === Number(address3))?.title}/>*/}
                    {/*            </Col> :*/}
                    {/*            <>*/}
                    {/*                <SideBarCartBox zip={zip} loading={loading} checkout={checkout}*/}
                    {/*                                local_part_1={local_part_1}*/}
                    {/*                                local_part_2={local_part_2} local_part_3={local_part_3}*/}
                    {/*                                address={address}*/}
                    {/*                                setAddress={setAddress} address2={address2} address3={address3}*/}
                    {/*                                setAddress2={setAddress2} setAddress3={setAddress3}/>*/}
                    {/*                <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "20px"}}>*/}
                    {/*                    <PaymantMode setIsLoading={setIsLoading}*/}
                    {/*                                 address={local_part_1.find(el => el.id === Number(address))?.title}*/}
                    {/*                                 address2={local_part_3.find(el => el.id === Number(address2))?.title}*/}
                    {/*                                 address3={local_part_3.find(el => el.id === Number(address3))?.title}/>*/}
                    {/*                </Col>*/}

                    {/*            </>*/}


                    {/*    }*/}
                    {/*</Col>*/}
                    {/*{*/}
                    {/*    width > 991 &&*/}
                    {/*    <SideBarCartBox zip={zip} loading={loading} checkout={checkout} local_part_1={local_part_1}*/}
                    {/*                    local_part_2={local_part_2} local_part_3={local_part_3} address={address}*/}
                    {/*                    setAddress={setAddress} address2={address2} address3={address3}*/}
                    {/*                    setAddress2={setAddress2} setAddress3={setAddress3}/>*/}
                    {/*}*/}

                </Row>
            </Container>
        </section>
    );
};

export default SectionCheckout;
