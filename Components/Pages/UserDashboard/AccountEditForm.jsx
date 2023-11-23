import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {APICallUrl, Emailaddress, FirstName, LastName} from "../../Constant";
import {setCheckoutDetails, setCheckoutErrors} from "../../../ReduxToolkit/Slices/CartSlice";
import {Col, Container, Form, Label, Row} from "reactstrap";
import StateField from "../Checkout/StateField";
import {selectLoginToken, setUser, toggleDivVisibility} from "../../../ReduxToolkit/Slices/LoginSlice";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";

let companyType = ["Wholesale", "Distributor", "Dealer", "Installer"];
let yearsInBusiness = ["Less than 1 year", "1 to 5 years", "More than 5 years"];
let projectSize = ["Less than $10,000", "$10,000 to $30,000", "$30,000 to $50,000", "$50,000 to $100,000", "More than $100,000"];
let annualSale = ["Less than $100,000", "$100,000 to $200,000", " $200,000 to $500,000", "$500,000 to $1,000,000", "$1,000,000 to $2,000,000", "More than $2,000,000"];
let phoneType = ["Mobile", "Office"];
const AccountEditForm = ({info, setShowModal, setLoading}) => {

    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const [selectedValues, setSelectedValues] = useState({
        company_type: '',
        business_years: '',
        project_size: '',
        annual_sale: '',
        phone_type: '',
    });

    const [interested, setInterested] = useState({
        video_surveillance: false,
        av_distribution: false,
        intrusion: false,
        lighting_control: false,
        networking: false,
        smart_home: false,
        bulk_wire: false,
        cables: false,
        structured_wiring: false,
        mounts: false,
        television: false,
        projectors_screens: false
    });

    useEffect(() => {
        formik.validateForm();

        const updatedInterested = {...interested};  // Create a copy of the current state
        for (let key in info.checkboxes) {
            if (info.checkboxes[key] === true) {
                // Ensure the key exists in the 'interested' state before updating it
                if (updatedInterested.hasOwnProperty(key)) {
                    updatedInterested[key] = true;
                }
            }
        }
        setInterested(updatedInterested);
        setSelectedValues(prevState => ({
            ...prevState,
            company_type: info.company_type || '',
            business_years: info.business_years || '',
            project_size: info.project_size || '',
            annual_sale: info.annual_sale || '',
            phone_type: info.phone_type || ''
        }));
    }, [info]);


    const initialValues = {
        name: info?.name === null || info?.name === undefined ? "" : info?.name,
        // last_name: info?.last_name === null || info?.last_name === undefined ? "" : info?.last_name,
        email: info?.email === null || info?.email === undefined ? "" : info?.email,
        company_name: info?.company_name === null || info?.company_name === undefined ? "" : info?.company_name,
        company_tax_id: info?.company_tax_id === null || info?.company_tax_id === undefined ? "" : info?.company_tax_id,
        license_number: info?.license_number === null || info?.license_number === undefined ? "" : info?.license_number,
        employees_number: info?.employees_number === null || info?.employees_number === undefined ? "" : info?.employees_number,
        phone_number: info?.phone_number === null || info?.phone_number === undefined ? "" : info?.phone_number,
        website_url: info?.website_url === null || info?.website_url === undefined ? "" : info?.website_url,
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        // last_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        company_name: Yup.string().required("Required"),
        // license_number: Yup.string().required("Required"),
        employees_number: Yup.string().required("Required"),
        phone_number: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })


    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    const handleSelectChange = (name, value) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const changeAccount = (e) => {
        e.preventDefault()
        setLoading(true);
        const mergedObj = {...formik.values, ...selectedValues, ...interested, phone: formik.values.phone_number};

        fetch(`${APICallUrl}/api/v1/me`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify(mergedObj),
        })
            .then((res) => res.json()).then((res) => {

            if (res.error === false) {
                dispatch(setUser(res));
                setShowModal(false);
                setLoading(false);
                toast.success('Changes saved successfully', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });
            } else {
                setLoading(false);
                toast.error('A problem occurred, please try again later ', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 1000
                });

            }

        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to update to cart', error);
                setLoading(false);

            });
    }

    return (

        <Form className='needs-validation'>
            <Container>
                <Row className='g-4'>
                    <Col lg="12">
                        <h3>Change Account Details</h3>
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='fname' className='form-label required-label'>
                            Full Name
                        </Label>
                        <input type='text' className='form-control checkout-form' name='name'
                               placeholder='Enter Full Name'
                               value={ltrim(formik.values.name)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.name}</span>
                        )}
                    </Col>
                    {/*<Col md='4'>*/}
                    {/*    <Label htmlFor='lname' className='form-label required-label'>*/}
                    {/*        {LastName}*/}
                    {/*    </Label>*/}
                    {/*    <input type='text' className='form-control checkout-form' name='last_name'*/}
                    {/*           placeholder='Enter Last Name'*/}
                    {/*           value={ltrim(formik.values.last_name)}*/}
                    {/*           onChange={formik.handleChange}*/}
                    {/*           onBlur={formik.handleBlur}*/}
                    {/*    />*/}
                    {/*    {formik.touched.last_name && formik.errors.last_name && (*/}
                    {/*        <span style={{color: 'var(--theme-color)'}}>{formik.errors.last_name}</span>*/}
                    {/*    )}*/}
                    {/*</Col>*/}
                    <Col md='4'>
                        <Label htmlFor='email' className='form-label required-label'>
                            {Emailaddress}
                        </Label>
                        <input type='email' className='form-control checkout-form' id='email'
                               placeholder='example@example.com' name='email'
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                        {formik.touched.email && formik.errors.email && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.email}</span>
                        )}
                    </Col>

                    <Col md='4'>
                        <Label htmlFor='billing' className='form-label required-label'>
                            Company Name
                        </Label>
                        <input type='billing-company' className='form-control checkout-form'
                               name='company_name'
                               value={ltrim(formik.values.company_name)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                        {formik.touched.company_name && formik.errors.company_name && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.company_name}</span>)}
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='company_type' className='form-label required-label'>
                            Company Type
                        </Label>
                        <select
                            className='form-select custome-form-select checkout-form'
                            value={info.company_type || ""}  // updated this line
                            onChange={(e) => handleSelectChange('company_type', e.target.value)}>
                            <option disabled value="def">Make Selection</option>
                            {companyType?.map((elem, i) => {
                                return <option key={i} value={elem}>{elem}</option>;
                            })}
                        </select>
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='companyTaxID' className='form-label '>
                            Company Tax ID
                        </Label>
                        <input type='company_tax_id' className='form-control checkout-form'
                               name='company_tax_id'
                               value={ltrim(formik.values.company_tax_id)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                        {/*{errors.email && <span style={{ color: 'red' }}>{emailrequired}</span>}*/}
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='resaleLicense' className='form-label required-label'>
                            Resale License
                        </Label>
                        <input type='license_number' className='form-control checkout-form'
                               name='license_number'
                               value={ltrim(formik.values.license_number)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                        />
                        {formik.touched.license_number && formik.errors.license_number && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.license_number}</span>
                        )}
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='Employees' className='form-label required-label'>
                            # of Employees
                        </Label>
                        <input
                            type="text"
                            className="form-control checkout-form"
                            name="employees_number"
                            value={ltrim(formik.values.employees_number)}
                            onChange={(e) => {
                                const sanitizedValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                formik.setFieldValue('employees_number', sanitizedValue); // Update the formik value
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.employees_number && formik.errors.employees_number && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.employees_number}</span>
                        )}
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='yearsInBusiness' className='form-label required-label'>
                            Years In Business
                        </Label>
                        <select
                            className='form-select custome-form-select checkout-form'
                            value={info.business_years || ""} // set this line
                            onChange={(e) => handleSelectChange('business_years', e.target.value)}>
                            <option disabled value="def">Make Selection</option>
                            {yearsInBusiness.map((elem, i) => {
                                return <option key={i} value={elem}>{elem}</option>;
                            })}
                        </select>
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='averageProjectSize' className='form-label required-label'>
                            Average Project Size
                        </Label>
                        <select
                            className='form-select custome-form-select checkout-form'
                            value={info.project_size || ""} // set this line
                            onChange={(e) => handleSelectChange('project_size', e.target.value)}>
                            <option disabled value="def">Make Selection</option>
                            {projectSize.map((elem, i) => {
                                return <option key={i} value={elem}>{elem}</option>;
                            })}
                        </select>
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='annualSale' className='form-label required-label'>
                            Annual Sale
                        </Label>
                        <select
                            className='form-select custome-form-select checkout-form'
                            value={info.annual_sale || ""} // set this line
                            onChange={(e) => handleSelectChange('annual_sale', e.target.value)}>
                            <option disabled value="def">Make Selection</option>
                            {annualSale.map((elem, i) => {
                                return <option key={i} value={elem}>{elem}</option>;
                            })}
                        </select>
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='phone' className='form-label required-label'>
                            Phone Number
                        </Label>
                        <input type='phone' className='form-control checkout-form'
                               placeholder='Enter your phone number' name='phone_number'
                               value={formik.values.phone_number}
                               onChange={(e) => {
                                   const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                   formik.setFieldValue('phone_number', phoneNumber); // Update the formik value
                               }}
                               onBlur={formik.handleBlur}
                        />
                        {/*{errors.phone && <span style={{color: 'red'}}>Phone is Required</span>}*/}
                        {formik.touched.phone_number && formik.errors.phone_number &&
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.phone_number}</span>}
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='phoneType' className='form-label required-label'>
                            Phone Type
                        </Label>
                        <select
                            className='form-select custome-form-select checkout-form'
                            value={info.phone_type || ""}  // set this line
                            onChange={(e) => handleSelectChange('phone_type', e.target.value)}>
                            <option disabled value="def">Make Selection</option>
                            {phoneType.map((elem, i) => {
                                return <option key={i} value={elem}>{elem}</option>;
                            })}
                        </select>
                    </Col>
                    <Col md='8'>
                        <Label htmlFor='website-url' className='form-label'>
                            Website URL
                        </Label>
                        <input type='text' className='form-control checkout-form'
                               name='website_url'
                               value={ltrim(formik.values.website_url)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                    </Col>
                    <Col lg="12">
                        <Label htmlFor='website-url' className='form-label mb-3'>
                            Interested
                        </Label>
                        <Row className="g-3">
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           checked={interested.video_surveillance}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   video_surveillance: !prevState.video_surveillance,
                                               }))
                                           }
                                           type='checkbox' style={{top: "-2px"}}/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Video Survelliance</Label>
                                    {/*<p className='font-light'>(25)</p>*/}
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested?.av_distribution}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   av_distribution: !prevState.av_distribution,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        A/V Distribution</Label>
                                    {/*<p className='font-light'>(25)</p>*/}
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested?.intrusion}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   intrusion: !prevState.intrusion,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Intrusion</Label>
                                    {/*<p className='font-light'>(25)</p>*/}
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested?.lighting_control}
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
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.networking}
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
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.smart_home}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   smart_home: !prevState.smart_home,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Smart Home</Label>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.bulk_wire}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   bulk_wire: !prevState.bulk_wire,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Bulk Wire & Connectors</Label>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.cables}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   cables: !prevState.cables,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Cables</Label>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.structured_wiring}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   structured_wiring: !prevState.structured_wiring,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Structured Wiring</Label>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.mounts}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   mounts: !prevState.mounts,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Mounts</Label>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.television}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   television: !prevState.television,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Television</Label>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className='form-check p-0 custome-form-check'>
                                    <input className='checkbox_animated check-it'
                                           type='checkbox' style={{top: "-2px"}}
                                           checked={interested.projectors_screens}
                                           onChange={() =>
                                               setInterested((prevState) => ({
                                                   ...prevState,
                                                   projectors_screens: !prevState.projectors_screens,
                                               }))
                                           }/>
                                    <Label className='form-check-label'
                                           style={{marginBottom: "0"}}>
                                        Projectors & Screens</Label>
                                </div>
                            </Col>


                        </Row>
                    </Col>
                    <Col>

                        <div className='product-buttons mb-0 mt-3' style={{flexDirection: "column"}}>
                            <button style={{maxWidth: "280px"}} onClick={(e) => changeAccount(e)}
                                    disabled={
                                        !formik.values.name ||
                                        !formik.values.email ||
                                        !formik.values.company_name ||
                                        // !formik.values.license_number ||
                                        !formik.values.employees_number ||
                                        !formik.values.phone_number ||
                                        formik.errors.name ||
                                        formik.errors.email ||
                                        formik.errors.company_name ||
                                        // formik.errors.license_number ||
                                        formik.errors.employees_number ||
                                        formik.errors.phone_number
                                    }
                                    className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                <span>Save Changes</span>
                            </button>
                            {/*{*/}
                            {/*    err.length > 0 &&*/}
                            {/*    <span style={{color: 'var(--theme-color)'}}>{err}</span>*/}
                            {/*}*/}
                        </div>
                    </Col>

                </Row>

            </Container>

        </Form>

    );
};

export default AccountEditForm;