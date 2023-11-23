import React from 'react';
import {Col, Form, Label, Row} from "reactstrap";

const Step2 = ({formik, typeBusiness, setTypeBusiness, ltrim, authItems,setAuthItems}) => {
    const handleRadioChange = (event, key) => {
        const { value } = event.target;
        setAuthItems(prevState => ({
            ...prevState,
            [key]: value
        }));
    };
    return (
        <Row>
            <Col className="" lg="12">
                {/*<img src={`${CommonPath}/fashion/business.png`} className='img-fluid bg-img' alt='fashion'/>*/}
                <div className="text-center">
                    {/*<h1 className="mb-2"></h1>*/}
                    <h2 className="">Reseller Authorization Request</h2>
                </div>
            </Col>
            <Col style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "30px", borderRadius: "8px"}} lg="12">
                <Form className='needs-validation'
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <Row className='g-4 justify-content-center'>

                        <Col md='2'>
                            <Label htmlFor='billing' className='form-label required-label'>
                                Date
                            </Label>
                            <input type='billing-company' className='form-control checkout-form'
                                   name='date'
                                   value={ltrim(formik.values.date)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            {formik.touched.company_name && formik.errors.company_name && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.company_name}</span>)}
                        </Col>

                        <Col md='5'>
                            <Label htmlFor='fname' className='form-label required-label'>
                                Reseller Name (and dba if different)
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='reseller_name'
                                   value={ltrim(formik.values.reseller_name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                        </Col>
                        <Col md='5'>
                            <Label htmlFor='lname' className='form-label required-label'>
                                Contact Name/ Title
                            </Label>
                            <input type='text' className='form-control checkout-form' name='contact_name'

                                   value={ltrim(formik.values.contact_name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                            {formik.touched.last_name && formik.errors.last_name && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.last_name}</span>
                            )}
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Ship to Address
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='ship_address'
                                   value={ltrim(formik.values.ship_address)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Bill to Address
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='bill_address'
                                   value={ltrim(formik.values.bill_address)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>

                        <Col md='4'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Phone
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='phone'
                                   value={ltrim(formik.values.phone)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>
                        <Col md='4'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Fax #
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='fax'
                                   value={ltrim(formik.values.fax)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>
                        <Col md='4'>
                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Web Site Address
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='site_address'
                                   value={ltrim(formik.values.site_address)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>

                            <Col  md='6'>

                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Email Address
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='email'
                                   value={ltrim(formik.values.email)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                            </Col>
                        <Col  md='3'>

                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                Years in Business
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='years_in_business'
                                   value={ltrim(formik.values.years_in_business)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>
                        <Col  md='3'>

                            <Label htmlFor='suite-unit' className='form-label required-label'>
                                # of Employees
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='employees'
                                   value={ltrim(formik.values.employees)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>

                        <Col md='4'>
                            <div className="product-your-interest">
                                <h3 className="text-start required-label " style={{color: "black"}}>Type of
                                    Business</h3>
                                <Row className="product-your-interest-row justify-content-center"
                                     style={{borderBottom: "none"}}>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   onChange={() =>
                                                       setTypeBusiness((prevState) => ({
                                                           ...prevState,
                                                           retail: !prevState.retail,
                                                       }))
                                                   }
                                                   type='checkbox' style={{top: "-2px"}}/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Retail</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setTypeBusiness((prevState) => ({
                                                           ...prevState,
                                                           custom: !prevState.custom,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Custom</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setTypeBusiness((prevState) => ({
                                                           ...prevState,
                                                           security: !prevState.security,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Security</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setTypeBusiness((prevState) => ({
                                                           ...prevState,
                                                           satellite: !prevState.satellite,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Satellite</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setTypeBusiness((prevState) => ({
                                                           ...prevState,
                                                           internet: !prevState.internet,
                                                       }))
                                                   }/>
                                            <Label className='form-check-label'
                                                   style={{marginBottom: "0"}}>
                                                Internet Sales</Label>
                                            {/*<p className='font-light'>(25)</p>*/}
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
                                                   onChange={() =>
                                                       setTypeBusiness((prevState) => ({
                                                           ...prevState,
                                                           otherCheck: !prevState.otherCheck,
                                                       }))
                                                   }/>
                                            {typeBusiness.otherCheck ? (
                                                <input
                                                    type="text"
                                                    className="form-control p-0 w-auto"
                                                    name="other"
                                                    value={typeBusiness.other}
                                                    onChange={(e) => setTypeBusiness({ ...typeBusiness, other: e.target.value })}
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
                                <h3 className="text-start required-label " style={{color: "black"}}>Authorized Items /
                                    Product Categories</h3>
                                <Row className="product-your-interest-row justify-content-center g-3"
                                     style={{borderBottom: "none"}}>
                                    <Col lg="12" >
                                        <Row>
                                            <Label className='form-check-label'>
                                                General Sony Line</Label>
                                            <Col lg="12" className="d-flex justify-content-between">
                                                <div className='d-flex'>
                                                    <input className="form-check-input" type="radio"
                                                           name="auth-1"
                                                           value='Requested Authorization'
                                                           checked={authItems.general_sony === 'Requested Authorization'}
                                                           onChange={(e) => handleRadioChange(e, 'general_sony')}
                                                    />
                                                    <Label className='form-check-label fw-normal'
                                                           style={{margin: "0 0 0 6px"}}>
                                                        Requested Authorization</Label>
                                                    {/*<p className='font-light'>(25)</p>*/}
                                                </div>
                                                {/*<div className='d-flex'>*/}
                                                {/*    <input className="form-check-input" type="radio"*/}
                                                {/*           name="auth-1"*/}
                                                {/*           value='Approved Authorization'*/}
                                                {/*           checked={authItems.general_sony === 'Approved Authorization'}*/}
                                                {/*           onChange={(e) => handleRadioChange(e, 'general_sony')}*/}
                                                {/*    />*/}
                                                {/*    <Label className='form-check-label fw-normal'*/}
                                                {/*           style={{margin: "0 0 0 6px"}}>*/}
                                                {/*        Approved Authorization</Label>*/}
                                                {/*    /!*<p className='font-light'>(25)</p>*!/*/}
                                                {/*</div>*/}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="12" >
                                        <Row>
                                            <Label className='form-check-label'>
                                                4K TV’s</Label>
                                            <Col lg="12" className="d-flex justify-content-between">
                                                <div className='d-flex'>
                                                    <input className="form-check-input" type="radio"
                                                           name="auth-2"
                                                           value='Requested Authorization'
                                                           checked={authItems['4k_tv'] === 'Requested Authorization'}
                                                           onChange={(e) => handleRadioChange(e, '4k_tv')}
                                                    />
                                                    <Label className='form-check-label fw-normal'
                                                           style={{margin: "0 0 0 6px"}}>
                                                        Requested Authorization</Label>
                                                    {/*<p className='font-light'>(25)</p>*/}
                                                </div>
                                                {/*<div className='d-flex'>*/}
                                                {/*    <input className="form-check-input" type="radio"*/}
                                                {/*           name="auth-2"*/}
                                                {/*           value='Approved Authorization'*/}
                                                {/*           checked={authItems['4k_tv'] === 'Approved Authorization'}*/}
                                                {/*           onChange={(e) => handleRadioChange(e, '4k_tv')}*/}
                                                {/*    />*/}
                                                {/*    <Label className='form-check-label fw-normal'*/}
                                                {/*           style={{margin: "0 0 0 6px"}}>*/}
                                                {/*        Approved Authorization</Label>*/}
                                                {/*    /!*<p className='font-light'>(25)</p>*!/*/}
                                                {/*</div>*/}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="12" >
                                        <Row>
                                            <Label className='form-check-label'>
                                                ES Audio</Label>
                                            <Col lg="12" className="d-flex justify-content-between">
                                                <div className='d-flex'>
                                                    <input className="form-check-input" type="radio"
                                                           name="auth-3"
                                                           value='Requested Authorization'
                                                           checked={authItems.audio === 'Requested Authorization'}
                                                           onChange={(e) => handleRadioChange(e, 'audio')}
                                                    />
                                                    <Label className='form-check-label fw-normal'
                                                           style={{margin: "0 0 0 6px"}}>
                                                        Requested Authorization</Label>
                                                    {/*<p className='font-light'>(25)</p>*/}
                                                </div>
                                                {/*<div className='d-flex'>*/}
                                                {/*    <input className="form-check-input" type="radio"*/}
                                                {/*           name="auth-3"*/}
                                                {/*           value='Approved Authorization'*/}
                                                {/*           checked={authItems.audio === 'Approved Authorization'}*/}
                                                {/*           onChange={(e) => handleRadioChange(e, 'audio')}*/}
                                                {/*    />*/}
                                                {/*    <Label className='form-check-label fw-normal'*/}
                                                {/*           style={{margin: "0 0 0 6px"}}>*/}
                                                {/*        Approved Authorization</Label>*/}
                                                {/*    /!*<p className='font-light'>(25)</p>*!/*/}
                                                {/*</div>*/}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="12" >
                                        <Row>
                                            <Label className='form-check-label'>
                                                ES 4K Projectors</Label>
                                            <Col lg="12" className="d-flex justify-content-between">
                                                <div className='d-flex'>
                                                    <input className="form-check-input" type="radio"
                                                           name="auth-4"
                                                           value='Requested Authorization'
                                                           checked={authItems.projectors === 'Requested Authorization'}
                                                           onChange={(e) => handleRadioChange(e, 'projectors')}
                                                    />
                                                    <Label className='form-check-label fw-normal'
                                                           style={{margin: "0 0 0 6px"}}>
                                                        Requested Authorization</Label>
                                                    {/*<p className='font-light'>(25)</p>*/}
                                                </div>
                                                {/*<div className='d-flex'>*/}
                                                {/*    <input className="form-check-input" type="radio"*/}
                                                {/*           name="auth-4"*/}
                                                {/*           value='Approved Authorization'*/}
                                                {/*           checked={authItems.projectors === 'Approved Authorization'}*/}
                                                {/*           onChange={(e) => handleRadioChange(e, 'projectors')}*/}
                                                {/*    />*/}
                                                {/*    <Label className='form-check-label fw-normal'*/}
                                                {/*           style={{margin: "0 0 0 6px"}}>*/}
                                                {/*        Approved Authorization</Label>*/}
                                                {/*    /!*<p className='font-light'>(25)</p>*!/*/}
                                                {/*</div>*/}
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                        {/*<Col md='5'>*/}
                        {/*    <Label htmlFor='suite-unit' className='form-label required-label'>*/}
                        {/*        NAME OF FIRM*/}
                        {/*    </Label>*/}
                        {/*    <input type='text' className='form-control checkout-form'*/}
                        {/*           name='name_of_firm'*/}
                        {/*           value={ltrim(formik.values.name_of_firm)}*/}
                        {/*           onChange={formik.handleChange}*/}
                        {/*           onBlur={formik.handleBlur}/>*/}
                        {/*</Col>*/}
                        {/*<Col md='5'>*/}
                        {/*    <Label htmlFor='suite-unit' className='form-label required-label'>*/}
                        {/*        REP FIRM APPROVAL*/}
                        {/*    </Label>*/}
                        {/*    <input type='text' className='form-control checkout-form'*/}
                        {/*           name='firm_approval'*/}
                        {/*           value={ltrim(formik.values.firm_approval)}*/}
                        {/*           onChange={formik.handleChange}*/}
                        {/*           onBlur={formik.handleBlur}/>*/}
                        {/*</Col>*/}
                        {/*<Col md='2'>*/}
                        {/*    <Label htmlFor='suite-unit' className='form-label required-label'>*/}
                        {/*        Date*/}
                        {/*    </Label>*/}
                        {/*    <input type='text' className='form-control checkout-form'*/}
                        {/*           name='date2'*/}
                        {/*           value={ltrim(formik.values.date2)}*/}
                        {/*           onChange={formik.handleChange}*/}
                        {/*           onBlur={formik.handleBlur}/>*/}
                        {/*</Col>*/}
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default Step2;