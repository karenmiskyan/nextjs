import React from 'react';
import {Col, Form, Label, Row} from "reactstrap";

const Step3 = ({formik, ltrim, register}) => {
    return (
        <Row>
            <Col className="" lg="12">
                {/*<img src={`${CommonPath}/fashion/business.png`} className='img-fluid bg-img' alt='fashion'/>*/}
                <div className="text-center">
                    <h2 className="mt-5">AGREEMENT FOR SONY PRODUCTS</h2>
                </div>
            </Col>
            <Col style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "30px", borderRadius: "8px"}} lg="12">
                <Form className='needs-validation'
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <Row className='g-4 justify-content-center'>

                        <Col md='12' className="d-flex">
                            <p style={{maxWidth: "none", color: "black"}} className="text-start">
                                This Agreement by and between (Reseller name)

                                <input type='billing-company' className='form-control p-0 w-auto'
                                       name='reseller_name2' style={{display: "unset", margin: "0 8px"}}
                                       value={ltrim(formik.values.reseller_name2)}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}/>

                                with a principal place of business at

                                <input type='text' className='form-control p-0 w-auto' name='place_of_business'
                                       style={{display: "unset", margin: "0 8px"}}
                                    // placeholder='Enter KOA branch'
                                       value={ltrim(formik.values.place_of_business)}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />

                                and KOA EDI, applies to the purchase of and sale of Sony Products by Reseller. This
                                Agreement is effective as of the date last signed by Reseller or Distributor, as the
                                case may be (the “Effective Date”).
                            </p>
                        </Col>
                        <Col md='12'>
                            <Label htmlFor='lname' className='form-label mb-2'>
                                Reseller Responsibilities
                            </Label>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                A. Distributor has been authorized to sell certain Sony Products to Reseller and
                                Reseller agrees to purchase and sell these Sony
                                Products in accordance with the terms and conditions set forth herein and any other
                                policies, procedures and restrictions that
                                may be communicated from time to time by Distributor.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                B. Reseller may represent itself as an authorized reseller of Sony Products only via
                                sales from its location at the place of
                                business set forth above. At no time is Reseller authorized at any time to advertise or
                                sell products from its or any
                                third-party websites.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                C. Reseller shall sell SONY products only to bona fide end-user customers. Under no
                                circumstances shall Reseller resell or
                                distribute SONY products to any entities who will resell Sony Products. Reseller
                                understands and acknowledges that SONY
                                and Distributor may purchase products from other Resellers with the intent to track
                                their serial numbers to determine the
                                entity that Distributor originally sold them. In the event that any of these purchased
                                Products are determined to have been
                                initially sold to Reseller may result in punitive action including immediate cessation
                                of any further sales of Sony Products to
                                Reseller. Reseller shall warrant all product installation, programming and configuration
                                work performed or otherwise
                                provided to end-user customers.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                D. Reseller will only purchase SONY Products from Distributor and will not purchase them
                                from any other entity.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                E. Reseller understands and acknowledges that SONY has developed a premier product line
                                of home audio and home theater
                                electronic products, marketed under various trade and service marks including but not
                                limited to the SONY ES and SONY
                                XBR Products and will take the necessary steps to ensure that its marketing and sale of
                                these Sony Products will be
                                consistent with Sony’s premier brand.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start">
                                F. A copy of the following Sony pricing policies are attached hereto to this Agreement
                                and any updates will be provided from
                                time to time. Reseller understands that it can independently determine whether it wishes
                                to participate in these policies.

                            </p>
                            <div>
                                <p style={{maxWidth: "none"}} className="text-start">
                                i. SONY Unified Retail Execution (SURE) program
                                </p>
                                <p style={{maxWidth: "none" }} className="text-start">

                                ii. SONY Minimum Advertised Program (MAP) program
                                </p>
                            </div>
                        </Col>
                        <Col md='12'>
                            <Label htmlFor='lname' className='form-label mb-2'>
                                TERM
                            </Label>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                This Agreement shall have an initial term through March 31, 2024 This Agreement shall be renewed automatically for
                                successive terms of twelve (12) months each unless:
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                               A. Either party delivers notice to the other at least thirty (30) days before the termination of the then current term.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start mb-2">
                                B. Either party terminates this Agreement at any time for convenience, with no cause, reason or justification, upon at
                                least thirty (30) days’ prior written notice to the other party stating its intention to terminate.
                            </p>
                            <p style={{maxWidth: "none", color: "black"}} className="text-start">
                                C. Distributor terminates the Agreement for cause due to Reseller’s breach of any of the responsibilities set forth
                                above.
                            </p>
                        </Col>

                        <Col md='12'>
                            <Label htmlFor='suite-unit' className='form-label'>
                                IN WITNESS WHEREOF,
                                <p style={{maxWidth: "none", color: "black", display:"contents"}} className="text-start fw-normal"> the parties hereto have executed this Agreement as of the date last written below:
                                </p>
                            </Label>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>
                                KOA EDI
                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='distributer.organisation'
                                   value={ltrim(formik.values.distributer.organisation)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                                <span style={{color: 'black', paddingLeft:'0'}}>(Distributor)</span>

                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label required-label'>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='reseller.organisation'
                                   value={ltrim(formik.values.reseller.organisation)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                                <span style={{color: 'black', paddingLeft:'0'}}>(Reseller)</span>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='distributer.by'
                                   value={ltrim(formik.values.distributer.by)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>By</span>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='reseller.by'
                                   value={ltrim(formik.values.reseller.by)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>By</span>
                        </Col>

                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='distributer.name'
                                   value={ltrim(formik.values.distributer.name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>Name</span>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='reseller.name'
                                   value={ltrim(formik.values.reseller.name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>Name</span>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label required-label'>
                                KOA Branch Manger
                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='distributer.title'
                                   value={ltrim(formik.values.distributer.title)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>Title</span>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label required-label'>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='reseller.title'
                                   value={ltrim(formik.values.reseller.title)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>Title</span>
                        </Col>

                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='distributer.date'
                                   value={ltrim(formik.values.distributer.date)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>Date</span>
                        </Col>
                        <Col md='6' xs="6">
                            <Label htmlFor='billing' className='form-label '>

                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='reseller.date'
                                   value={ltrim(formik.values.reseller.date)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            <span style={{color: 'black', paddingLeft:'0'}}>Date</span>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col>
                <div className='product-buttons' style={{marginTop: "20px", flexDirection: "column"}}>
                    <button
                        style={{maxWidth: "280px"}}
                        onClick={register}
                        className='btn btn-solid hover-solid btn-animation quick-order-button'>
                        <span>SUBMIT</span>
                    </button>

                </div>
            </Col>
        </Row>
    );
};

export default Step3;