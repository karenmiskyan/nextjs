import React, {useState} from 'react';

import {Col, Container, Row} from "reactstrap";

import Step_1 from "./Step_1";
import * as Yup from "yup";
import {useFormik} from "formik";
import Step_2 from "./Step_2";
import Step_3 from "./Step_3";
import {APICallUrl} from "../../../Constant";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectLoginToken} from "../../../../ReduxToolkit/Slices/LoginSlice";
import {toast} from "react-toastify";

const SonyDealerForm = () => {
    const [loading, setLoading] = useState(false);
    const loginToken = useSelector(selectLoginToken);

    const [interested, setInterested] = useState({
        prewire: false,
        distributed: false,
        home_theater: false,
        lighting_control: false,
        networking: false,
        automation: false,
        security: false,
        otherCheck: false,
        other: "",
    });

    const [interested2, setInterested2] = useState({
        custom_homes: false,
        public_spaces: false,
        schools: false,
        light_commercial: false,
        production_homes: false,
        retrofit: false,
        otherCheck: false,
        other: "",
    });

    const [typeBusiness, setTypeBusiness] = useState({
        retail: false,
        custom: false,
        security: false,
        satellite: false,
        internet: false,
        otherCheck: false,
        other: "",
    });

    const [authItems, setAuthItems] = useState({
        "general_sony": "",
        "4k_tv": "",
        "audio": "",
        "projectors": ""
    });

    const initialValues = {
        "number_dedicated": "",
        "brief_description": "",
        "date": "",
        "reseller_name": "",
        "contact_name": "",
        "ship_address": "",
        "bill_address": "",
        "phone": "",
        "fax": "",
        "email": "",
        "site_address": "",
        "years_in_business": "",
        "employees": "",
        "name_of_firm": "",
        "firm_approval": "",
        "date2": "",
        "reseller_name2": "",
        "place_of_business": "",
        "distributer": {
            "organisation": "",
            "name": "",
            "by": "",
            "title": "",
            "date": ""
        },
        "reseller": {
            "organisation": "",
            "name": "",
            "by": "",
            "title": "",
            "date": ""
        }
    }

    const validationSchema = Yup.object({

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    const register = (e) => {
        e.preventDefault()
        setLoading(true)
        const mergedObj = {...formik.values, markets_served :interested2, services_offered: interested, authorized_items:authItems, type_of_business:typeBusiness};

        fetch(`${APICallUrl}/api/send-request`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`

            },
            body: JSON.stringify(mergedObj),
        })
            .then((res) => res.json()).then((res) => {
            if (res.success === true) {
                // setShowModal(true);
                setLoading(false);
                toast.success(`Message send successfully`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });

            } else {
                // setErr(res.message)
                setLoading(false);
                toast.error(`Message not sent `, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000
                });
                // setShowModal(true);
            }
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to login:', error);
                setLoading(false);
            });
    }

    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Step_2 formik={formik} typeBusiness={typeBusiness} setTypeBusiness={setTypeBusiness}
                        authItems={authItems} setAuthItems={setAuthItems}
                        setInterested2={setInterested2} ltrim={ltrim}/>
                <Step_1 formik={formik} interested={interested} interested2={interested2} setInterested={setInterested}
                        setInterested2={setInterested2} ltrim={ltrim}/>

                <Step_3 formik={formik} ltrim={ltrim} register={register}/>
                {loading && (
                    <Backdrop sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 2000,
                        backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }} open>
                        <CircularProgress color="primary"/>
                    </Backdrop>
                )}
                {/*<Row className='g-4'>*/}
                {/*    <Col lg="12">*/}
                {/*        <Row className="justify-content-center">*/}
                {/*            <Col xl="4" lg="4" xs="4" className="text-center" style={{*/}
                {/*                paddingBottom: "16px",*/}
                {/*                borderBottom: "4px solid var(--theme-color)"*/}
                {/*            }}><h4*/}
                {/*                style={{color: step === 1 ? "" : "#797979", fontWeight: step === 1 ? "500" : ""}}>1.*/}
                {/*                Billing Details</h4></Col>*/}
                {/*            <Col xl="4" lg="4" xs="4" className="text-center"*/}
                {/*                 style={{*/}
                {/*                     paddingBottom: "16px",*/}
                {/*                     borderBottom: step >= 2 ? "4px solid var(--theme-color)" : "4px solid #E2E5EA",*/}
                {/*                 }}><h4*/}
                {/*                style={{color: step === 2 ? "" : "#797979", fontWeight: step === 2 ? "500" : ""}}>2.*/}
                {/*                Order Summary</h4></Col>*/}
                {/*            <Col xl="4" lg="4" xs="4" className="text-center"*/}
                {/*                 style={{*/}
                {/*                     paddingBottom: "16px",*/}
                {/*                     borderBottom: step === 3 ? "4px solid var(--theme-color)" : "4px solid #E2E5EA"*/}
                {/*                 }}><h4*/}
                {/*                style={{color: step === 3 ? "" : "#797979", fontWeight: step === 3 ? "500" : ""}}>3.*/}
                {/*                Payment Method</h4></Col>*/}
                {/*        </Row>*/}
                {/*    </Col>*/}
                {/*    <Col lg='12' className="billing-details">*/}
                {/*        /!*{step === 1 &&*!/*/}
                {/*        <Row style={{display: step === 1 ? "block" : "none"}} className="g-3">*/}
                {/*            <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>*/}
                {/*                <Step_1/>*/}
                {/*            </Col>*/}

                {/*        </Row>*/}
                {/*        {step === 2 &&*/}
                {/*            <SideBarCartBox zip={zip} loading={loading} checkout={checkout} tax={tax}*/}
                {/*                            local_part_1={local_part_1} lod={lod}*/}
                {/*                            local_part_2={local_part_2} local_part_3={local_part_3}*/}
                {/*                            address={address}*/}
                {/*                            setAddress={setAddress} address2={address2} address3={address3}*/}
                {/*                            setAddress2={setAddress2} setAddress3={setAddress3}/>*/}
                {/*        }*/}
                {/*        {step === 3 &&*/}
                {/*            <Row>*/}
                {/*                <Col lg='12' style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "0"}}>*/}
                {/*                    <PaymantMode setIsLoading={setIsLoading} tax={tax} checkout={checkout}*/}
                {/*                                 check={isChecked} onAccount={onAccount}*/}
                {/*                                 address={local_part_1.find(el => el.id === Number(address))?.title}*/}
                {/*                                 address2={local_part_3.find(el => el.id === Number(address2))?.title}*/}
                {/*                                 address3={local_part_3.find(el => el.id === Number(address3))?.title}*/}
                {/*                    />*/}
                {/*                </Col>*/}
                {/*            </Row>*/}
                {/*        }*/}
                {/*        <Row className="mt-3 justify-content-end g-3">*/}
                {/*            <Col xl="2" lg="3" sm="4" xs="6">*/}
                {/*                <div className='product-buttons'*/}
                {/*                     style={{marginBottom: "0"}}>*/}
                {/*                    <button onClick={goToPreviousStep} disabled={step === 1}*/}
                {/*                            style={{*/}
                {/*                                fontSize: "14px",*/}
                {/*                                padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"*/}
                {/*                            }}*/}
                {/*                            className='btn btn-solid btn-transparent hover-solid btn-animation'>*/}
                {/*                        <span>Back</span>*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </Col>*/}
                {/*            <Col xl="2" lg="3" sm="4" xs="6">*/}
                {/*                <div className='product-buttons'*/}
                {/*                     style={{marginBottom: "0"}}>*/}
                {/*                    <button onClick={goToNextStep} disabled={step === 3*/}
                {/*                        || checkoutErrors !== 0 ||*/}
                {/*                        (step === 2 && checkout?.part_1?.products?.length > 0 && Object.keys(selectedShipping).length === 0)*/}
                {/*                        ||*/}
                {/*                        (step === 2 && checkout?.part_2?.products?.length > 0 && Object.keys(selectedShippingTwo).length === 0)*/}
                {/*                        ||*/}
                {/*                        (step === 2 && checkout?.part_3?.products?.length > 0 && Object.keys(selectedShippingThree).length === 0)*/}
                {/*                        || cart.length === 0 ||*/}
                {/*                        (cityMismatch || stateMismatch || zipMismatch) ||*/}
                {/*                        (isChecked && shippingErrors !== 0 || (cityMismatch2 || stateMismatch2 || zipMismatch2))*/}
                {/*                    }*/}
                {/*                            style={{*/}
                {/*                                fontSize: "14px",*/}
                {/*                                padding: "calc(4px + 4 * (100vw - 320px) / 1600) calc(15px + 15 * (100vw - 320px) / 1600)"*/}
                {/*                            }}*/}
                {/*                            className='btn btn-solid hover-solid btn-animation'>*/}
                {/*                        <span>Next</span>*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </Col>*/}

                {/*            {*/}
                {/*                ((step === 2 && checkout?.part_1?.products?.length > 0 && Object.keys(selectedShipping).length === 0) ||*/}
                {/*                    (step === 2 && checkout?.part_2?.products?.length > 0 && Object.keys(selectedShippingTwo).length === 0) ||*/}
                {/*                    (step === 2 && checkout?.part_3?.products?.length > 0 && Object.keys(selectedShippingThree).length === 0)) &&*/}
                {/*                <Col lg="12" className="text-end"><p className="mb-0" style={{fontWeight: "500"}}>Select*/}
                {/*                    the shipping option(s)<span style={{color: "var(--theme-color)"}}>*</span></p></Col>*/}
                {/*            }*/}

                {/*        </Row>*/}

                {/*    </Col>*/}
                {/*    */}
                {/*</Row>*/}
            </Container>
        </section>
    );
};

export default SonyDealerForm;
