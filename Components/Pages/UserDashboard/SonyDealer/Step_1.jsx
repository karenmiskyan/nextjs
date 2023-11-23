import React, {useCallback, useEffect, useRef, useState} from 'react';
import {APICallUrl, CommonPath, Emailaddress, FirstName, LastName} from "../../../Constant";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Col, Form, Label, Row} from "reactstrap";
import Link from "next/link";

const Step1 = ({formik, interested, interested2,setInterested, setInterested2, ltrim}) => {

    return (
        <Row>
            <Col className="" lg="12">
                {/*<img src={`${CommonPath}/fashion/business.png`} className='img-fluid bg-img' alt='fashion'/>*/}
                <div className="text-center">
                    <h1 className="mb-2 mt-4">KOA EDI</h1>
                    <h4 className="">SONY APPROVAL PROCESS QUESTIONNAIRE</h4>
                </div>
            </Col>
            <Col style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "30px", borderRadius: "8px"}} lg="12">
                <Form className='needs-validation'
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <Row className='g-4 justify-content-center'>

                        <Col md='6'>
                            <Label htmlFor='billing' className='form-label required-label'>
                                Dealer Code
                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='company_name'
                                   value={ltrim(formik.values.company_name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            {formik.touched.company_name && formik.errors.company_name && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.company_name}</span>)}
                        </Col>

                        <Col md='6'>
                            <Label htmlFor='fname' className='form-label required-label'>
                                KOA branch
                            </Label>
                            <input type='text' className='form-control checkout-form' name='first_name'
                                // placeholder='Enter KOA branch'
                                   value={ltrim(formik.values.first_name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                            {formik.touched.first_name && formik.errors.first_name && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.first_name}</span>
                            )}
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='lname' className='form-label required-label'>
                                Sales person
                            </Label>
                            <input type='text' className='form-control checkout-form' name='last_name'
                                // placeholder='Enter Sales person'
                                   value={ltrim(formik.values.last_name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                            {formik.touched.last_name && formik.errors.last_name && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.last_name}</span>
                            )}
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Number Dedicated to installation
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='number_dedicated'
                                   value={ltrim(formik.values.number_dedicated)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>


                        <Col md='4'>
                            <div className="product-your-interest">
                                <h3 className="text-start required-label " style={{color: "black"}}>Services
                                    Offered</h3>
                                <Row className="product-your-interest-row justify-content-center"
                                     style={{borderBottom: "none"}}>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           prewire: !prevState.prewire,
                                                       }))
                                                   }
                                                   type='checkbox' style={{top: "-2px"}}/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Prewire</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           distributed: !prevState.distributed,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                A/V Distribution</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           home_theater: !prevState.home_theater,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Home Theater</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           lighting_control: !prevState.lighting_control,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Lighting & Control</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           networking: !prevState.networking,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Networking</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           automation: !prevState.automation,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Automation</Label>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           security: !prevState.security,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Security</Label>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested((prevState) => ({
                                                           ...prevState,
                                                           otherCheck: !prevState.otherCheck,
                                                       }))
                                                   }/>
                                            {interested.otherCheck ? (
                                                <input
                                                    type="text"
                                                    className="form-control p-0 w-auto"
                                                    name="other"
                                                    value={interested.other}
                                                    onChange={(e) => setInterested({ ...interested, other: e.target.value })}
                                                />
                                            ) : (
                                                <Label className="form-check-label" style={{ marginBottom: "0" }}>
                                                    Other
                                                </Label>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md='4'>
                            <div className="product-your-interest">
                                <h3 className="text-start required-label" style={{color: "black"}}>Markets Served</h3>
                                <Row className="product-your-interest-row justify-content-center"
                                     style={{borderBottom: "none"}}>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           custom_homes: !prevState.custom_homes,
                                                       }))
                                                   }
                                                   type='checkbox' style={{top: "-2px"}}/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                New Custom Homes</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           public_spaces: !prevState.public_spaces,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Large Public Spaces</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           home_theater: !prevState.home_theater,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Schools</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           light_commercial: !prevState.light_commercial,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Light Commercial</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           production_homes: !prevState.production_homes,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Production Homes</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           retrofit: !prevState.retrofit,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Retrofit</Label>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setInterested2((prevState) => ({
                                                           ...prevState,
                                                           otherCheck: !prevState.otherCheck,
                                                       }))
                                                   }/>
                                            {interested2.otherCheck ? (
                                                <input
                                                    type="text"
                                                    className="form-control p-0 w-auto"
                                                    name="other"
                                                    value={interested2.other}
                                                    onChange={(e) => setInterested2({ ...interested2, other: e.target.value })}
                                                />
                                            ) : (
                                                <Label className="form-check-label" style={{ marginBottom: "0" }}>
                                                    Other
                                                </Label>
                                            )}
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col md='12'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Brief description of the account if non-traditional system integrator or retailer
                            </Label>
                            <textarea className='form-control checkout-form' rows='5'
                                      name='brief_description'
                                      value={ltrim(formik.values.brief_description)}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}/>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default Step1;