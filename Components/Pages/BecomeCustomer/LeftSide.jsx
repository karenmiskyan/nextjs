import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    addressrequired, APICallUrl,
    CommonPath,
    Emailaddress,
    emailrequired,
    FirstName,
    firstnamerequired,
    LastName,
    lastnamerequired, StateArr, ziprequired
} from "../../Constant";
import {Button, Col, Form, Input, Label, Modal, ModalFooter, ModalBody, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setAuth, setLoginToken, setUser, toggleDivVisibility} from "../../../ReduxToolkit/Slices/LoginSlice";
import Link from "next/link";
import {FaCheckCircle} from "react-icons/fa";
import {Autocomplete, useLoadScript} from "@react-google-maps/api";


let companyType = ["Wholesale", "Distributor", "Dealer", "Installer"];
let yearsInBusiness = ["Less than 1 year", "1 to 5 years", "More than 5 years"];
let projectSize = ["Less than $10,000", "$10,000 to $30,000", "$30,000 to $50,000", "$50,000 to $100,000", "More than $100,000"];
let annualSale = ["Less than $100,000", "$100,000 to $200,000", " $200,000 to $500,000", "$500,000 to $1,000,000", "$1,000,000 to $2,000,000", "More than $2,000,000"];
let phoneType = ["Mobile", "Office"];
let koa = ["Search Engines (Google, Bing, Yahoo)Social Media", "Blog or Publications", "Word of Mouth", "Advertisement"];

//
// const libraries = ["places"];
const LeftSide = ({setIsLoading, isLoaded, loadError}) => {

    const [selectedValues, setSelectedValues] = useState({
        company_type: '',
        business_years: '',
        project_size: '',
        annual_sale: '',
        phone_type: '',
        howDidYouHear: ''
    });


    let [stateG, setState] = useState([]);
    let [citi, setCiti] = useState({});
    const [zipMismatch, setZipMismatch] = useState(false);
    const [cityMismatch, setCityMismatch] = useState(false);
    const [stateMismatch, setStateMismatch] = useState(false);

    const [addressDetails, setAddressDetails] = useState({
        address: '',
        city: '',
        state: '',
        zipCode: ''
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


    const handleSelectChange = (name, value) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {

        fetch(`${APICallUrl}/api/get-states`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
        })
            .then((res) => res.json()).then((res) => {

            setState(res)
            // setCiti(res?.find((elem) => elem?.abbreviation === info?.location_state?.abbreviation))
        })
            .catch((error) => {
                console.error('Failed to get States', error);
            });
    }, []);


    let dispatch = useDispatch();
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        company_name: "",
        company_tax_id: "",
        license_number: "",
        employees_number: "",
        phone_number: "",
        website_url: "",
        suite: "",
        city: "",
        zip_code: "",
        addr: "",
        house: ""

    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 characters minimum.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&+=!()~`\\*£|.<>:"'\[\]_{}?,/;-]*$/,
                'Password must include at least one uppercase letter, one lowercase letter, and one number.'
            ),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please repeat your password.'),
        company_name: Yup.string().required("Required"),
        // license_number: Yup.string().required("Required"),
        employees_number: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        phone_number: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),
        zip_code: Yup.string()
            .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code")
            .required("Required"),
        addr: Yup.string().required("Required"),
        house: Yup.string().required("Required"),

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowPRepeatPassword] = useState(false);
    let [err, setErr] = useState("")
    const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

    const register = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const { addr, ...formikValuesWithoutAddr } = formik.values;

        const mergedObj = {
            ...formikValuesWithoutAddr, ...selectedValues, ...interested, ...{
                state: `${citi.id}`,
                street_address: addr
            }
        };

        fetch(`${APICallUrl}/api/v1/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(mergedObj),
        })
            .then((res) => res.json()).then((res) => {

            if (res.error === false) {
                setShowModal(true);
                setIsLoading(false);

            } else {
                setErr(res.message)
                setIsLoading(false);
                // setShowModal(true);
            }
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to login:', error);
            });
    }


    const handleSelectChangeState = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = stateG?.find((elem) => elem?.abbreviation === selectedValue);
        setCiti(selectedOption);
    }

    // const {isLoaded, loadError} = useLoadScript({
    //     googleMapsApiKey: "AIzaSyCoVE9yQ3Y_48ThEQV7bYtdMxSXeBZ72AU",
    //     libraries,
    // });


    const searchBoxRef = useRef(null);
    const [inputValue, setInputValue] = useState("");


    const handlePlacesChanged = useCallback((place) => {
        if (place) {

            let address = '', city = '', state = '', zipCode = '';
            if (place && Array.isArray(place.address_components)) {
                for (let component of place?.address_components) {
                    switch (component.types[0]) {
                        case 'street_number':
                            address = `${component.long_name} `;
                            break;
                        case 'route':
                            address += component.short_name;
                            break;
                        // case "neighborhood":
                        //     city = component.long_name;
                        //     break;
                        case 'administrative_area_level_1':
                            state = component.short_name;
                            break;
                        case 'postal_code':
                            zipCode = component.short_name;
                            break;
                        default:
                            break;
                    }
                }

                const fullAddress = place.formatted_address;
                const addressParts = fullAddress.split(', ');
                if (addressParts.length >= 2) {
                    city = addressParts[1]; // The city should be the second element
                }
                setAddressDetails({address, city, state, zipCode});
                // setInputValues({city, state, zipCode});  // Setting input values based on selection
                formik.setFieldValue("city", city);
                formik.setFieldValue("zip_code", zipCode);
                formik.setFieldValue("addr", address);

                setCiti(stateG?.find((elem) => elem?.abbreviation === state));
                const isZipMismatched = !(zipCode.length > 0);
                const isCityMismatched = !(city.length > 0);
                const isStateMismatched = false;

                setZipMismatch(isZipMismatched);
                setCityMismatch(isCityMismatched);
                setStateMismatch(isStateMismatched);

            }
        }
    }, [citi, addressDetails, formik]);


    useEffect(() => {
        // Check for zipMismatch
        if (!zipMismatch) {
            formik.setErrors((prevErrors) => ({
                ...prevErrors,
                zip_code: undefined
            }));
        }

        // Check for cityMismatch
        if (!cityMismatch) {
            formik.setErrors((prevErrors) => ({
                ...prevErrors,
                city: undefined
            }));
        }
    }, [zipMismatch, cityMismatch]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;


    return (
        <>
            <div className="sign-in-banner"
                 style={{backgroundImage: `url(${CommonPath}/fashion/business.png)`}}>
                {/*<img src={`${CommonPath}/fashion/business.png`} className='img-fluid bg-img' alt='fashion'/>*/}
                <div className="sign-in-banner-div">
                    <h2>ONLINE ACCOUNT REGISTRATION</h2>
                    <h4>To become a new KOA EDI customer, complete the form below. </h4>

                    <h4> If you are an existing customer please </h4>
                    <div className='product-buttons' style={{marginBottom: "0", justifyContent: 'left'}}>
                        <a style={{maxWidth: "180px"}} onClick={() => dispatch(toggleDivVisibility(true))}
                           className='btn btn-solid hover-solid btn-animation quick-order-button'>
                            <span>SIGN IN</span>
                        </a>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: "#eff2f7", padding: "30px", marginTop: "30px", borderRadius: "8px"}}>
                <Form className='needs-validation'
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <Row className='g-4'>
                        <Col md='6'>
                            <Label htmlFor='fname' className='form-label required-label'>
                                {FirstName}
                            </Label>
                            <input type='text' className='form-control checkout-form' name='first_name'
                                   placeholder='Enter First Name'
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
                                {LastName}
                            </Label>
                            <input type='text' className='form-control checkout-form' name='last_name'
                                   placeholder='Enter Last Name'
                                   value={ltrim(formik.values.last_name)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                            {formik.touched.last_name && formik.errors.last_name && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.last_name}</span>
                            )}
                        </Col>

                        <Col md='12'>
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
                        <Col md='12'>
                            <p>To keep your account safe create a strong password. Password must be min.
                                8 characters (max. 30) Including one uppercase letter, one lowercase
                                letter and alphanumeric characters</p>
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='password' className='password required-label'>
                                Password
                            </Label>
                            <div className='password-input-container'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='form-control checkout-form'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div
                                    className={`password-toggle-icon ${showPassword ? 'show' : ''}`}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <i className='fas fa-eye-slash'></i>
                                    ) : (
                                        <i className='fas fa-eye'></i>
                                    )}
                                </div>
                            </div>

                            {formik.touched.password && formik.errors.password && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.password}</span>
                            )}
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='repeat-password' className='form-label required-label'>
                                Repeat Password
                            </Label>
                            <div className='password-input-container'>

                                <input
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    className='form-control checkout-form'
                                    name='password_confirmation'
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div
                                    className={`password-toggle-icon ${showRepeatPassword ? 'show' : ''}`}
                                    onClick={() => setShowPRepeatPassword(!showRepeatPassword)}
                                >
                                    {showRepeatPassword ? (
                                        <i className='fas fa-eye-slash'></i>
                                    ) : (
                                        <i className='fas fa-eye'></i>
                                    )}
                                </div>
                            </div>

                            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.password_confirmation}</span>
                            )}
                        </Col>
                        <Col md='6'>
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
                        <Col md='6'>
                            <Label htmlFor='company_type' className='form-label required-label'>
                                Company Type
                            </Label>
                            <select className='form-select custome-form-select checkout-form' defaultValue="def"
                                    onChange={(e) => handleSelectChange('company_type', e.target.value)}>
                                <option disabled value="def">Make Selection</option>
                                {companyType?.map((elem, i) => {
                                    return <option key={i}>{elem}</option>;
                                })}
                            </select>
                        </Col>
                        <Col md='6'>
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
                        <Col md='6'>
                            <Label htmlFor='resaleLicense' className='form-label '>
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
                        <Col md='6'>
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
                        <Col md='6'>
                            <Label htmlFor='yearsInBusiness' className='form-label required-label'>
                                Years In Business
                            </Label>
                            <select className='form-select custome-form-select checkout-form' defaultValue="def"
                                    onChange={(e) => handleSelectChange('business_years', e.target.value)}>
                                <option disabled value="def">Make Selection</option>
                                {yearsInBusiness.map((elem, i) => {
                                    return <option key={i}>{elem}</option>;
                                })}
                            </select>
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='averageProjectSize' className='form-label required-label'>
                                Average Project Size
                            </Label>
                            <select className='form-select custome-form-select checkout-form' defaultValue="def"
                                    onChange={(e) => handleSelectChange('project_size', e.target.value)}>
                                <option disabled value="def">Make Selection</option>
                                {projectSize.map((elem, i) => {
                                    return <option key={i}>{elem}</option>;
                                })}
                            </select>
                        </Col>
                        <Col md='6'>
                            <Label htmlFor='annualSale' className='form-label required-label'>
                                Annual Sale
                            </Label>
                            <select className='form-select custome-form-select checkout-form' defaultValue="def"
                                    onChange={(e) => handleSelectChange('annual_sale', e.target.value)}>
                                <option disabled value="def">Make Selection</option>
                                {annualSale.map((elem, i) => {
                                    return <option key={i}>{elem}</option>;
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
                            <select className='form-select custome-form-select checkout-form' defaultValue="def"
                                    onChange={(e) => handleSelectChange('phone_type', e.target.value)}>
                                <option disabled value="def">Make Selection</option>
                                {phoneType.map((elem, i) => {
                                    return <option key={i}>{elem}</option>;
                                })}
                            </select>
                        </Col>
                        <Col md='4'>
                            <Label htmlFor='website-url' className='form-label'>
                                Website URL
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='website_url'
                                   value={ltrim(formik.values.website_url)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>
                        <Col md='6'>
                            <Label className='form-label required-label'>
                                Street Address
                            </Label>
                            {/*<input type='text' className='form-control checkout-form' id='address'*/}
                            {/*       placeholder='Enter your address' name='street_address'*/}
                            {/* */}
                            {/*/>*/}

                            <Autocomplete
                                onLoad={ref => searchBoxRef.current = ref}
                                onPlaceChanged={() => handlePlacesChanged(searchBoxRef.current.getPlace())}
                                restrictions={{country: "US"}}
                            >
                                <input type='text' className='form-control checkout-form'
                                    // id='address'
                                    // placeholder='Enter your address'
                                       name='addr'
                                       autoComplete="nope"
                                       value={ltrim(formik.values.addr)}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </Autocomplete>
                            {formik.touched.addr && formik.errors.addr && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.addr}</span>
                            )}
                        </Col>

                        <Col md='6'>
                            <Label htmlFor='suite-unit' className='form-label'>
                                Suite, Unit
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='suite'
                                   autoComplete="nope"
                                   value={ltrim(formik.values.suite)}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                        </Col>
                        <Col md='4'>
                            <Label htmlFor='city' className='form-label required-label'>
                                City
                            </Label>
                            <input type='text' className='form-control checkout-form'
                                   name='city'
                                   disabled
                                   value={ltrim(formik.values.city)}
                                   onChange={(e) => {
                                       formik.handleChange(e)
                                       setCityMismatch(e.target.value.toLowerCase() !== addressDetails.city.toLowerCase());
                                   }}
                                   onBlur={formik.handleBlur}
                            />
                            {/*{cityMismatch &&*/}
                            {/*    <span*/}
                            {/*        style={{color: 'var(--theme-color)'}}>City doesn't match the selected address</span>}*/}
                            {formik.touched.city && formik.errors.city && (
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.city}</span>
                            )}
                        </Col>
                        {/*<CountryField/>*/}
                        {/*<StateField/>*/}

                        <Col md='4'>
                            <Label htmlFor='validationCustom04' className='form-label required-label'>
                                State
                            </Label>
                            <select className='form-select custome-form-select checkout-form' value={citi?.abbreviation}
                                    onChange={(e) => {
                                        handleSelectChangeState(e)
                                        setStateMismatch(e.target.value.toLowerCase() !== addressDetails.state.toLowerCase())
                                    }}>
                                <option disabled value="def">Make Selection</option>
                                {stateG.map((elem, i) => {
                                    return <option value={elem?.abbreviation} key={i}>{elem?.name}</option>;
                                })}
                            </select>
                            {/*{stateMismatch &&*/}
                            {/*    <span*/}
                            {/*        style={{color: 'var(--theme-color)'}}>State doesn't match the selected address</span>}*/}
                        </Col>
                        <Col md='4'>
                            <Label htmlFor='zip' className='form-label required-label'>
                                Zip Code
                            </Label>
                            <input type='text' className='form-control checkout-form' id='zip'
                                   placeholder='Enter your postcode' name='zip_code'
                                   value={formik.values.zip_code}
                                   autoComplete="nope"
                                   onChange={(e) => {
                                       formik.handleChange(e)
                                       setZipMismatch(e.target.value !== addressDetails.zipCode);
                                   }}
                                   onBlur={formik.handleBlur}/>
                            {/*{zipMismatch &&*/}
                            {/*    <span*/}
                            {/*        style={{color: 'var(--theme-color)'}}>ZIP Code doesn't match the selected address</span>}*/}
                            {formik.touched.zip_code && formik.errors.zip_code &&
                                <span style={{color: 'var(--theme-color)'}}>{formik.errors.zip_code}</span>}
                        </Col>
                        <Col md='12'>
                            <Label htmlFor='KOA' className='form-label'>
                                How did you hear about KOA?
                            </Label>
                            <select className='form-select custome-form-select checkout-form' defaultValue="def"
                                    onChange={(e) => handleSelectChange('howDidYouHear', e.target.value)}>
                                <option disabled value="def">Please Make Selection</option>
                                {koa.map((elem, i) => {
                                    return <option key={i}>{elem}</option>;
                                })}
                            </select>
                        </Col>
                        <Col md='12'>
                            <div className="product-your-interest">
                                <h3>WHICH TYPE OF PRODUCTS ARE YOU INTERESTED IN?</h3>
                                <Row className="product-your-interest-row">
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
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
                                    <Col lg="6">
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                    <Col lg="6">
                                        <div className='form-check p-0 custome-form-check'>
                                            <input className='checkbox_animated check-it'
                                                   type='checkbox' style={{top: "-2px"}}
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
                                <p>By clicking submit button below, I agree to receive promotional emails
                                    from KOA EDI. I agree to KOA EDI's <Link href={"/privacy-and-policy/"}><span
                                        style={{
                                            color: "black",
                                            fontWeight: "500",
                                            padding: "0"
                                        }}>Terms</span></Link> and
                                    acknowledge <Link href={"/terms-conditions/"}><span
                                        style={{color: "black", fontWeight: "500", padding: "0"}}>Privacy Policy</span></Link>,
                                    including Cookies policy.I understand I may unsubscribe from promotional
                                    emails at anytime.</p>
                                <div className='product-buttons' style={{marginTop: "20px", flexDirection: "column"}}>
                                    <button
                                        // disabled={(cityMismatch || stateMismatch || zipMismatch)}
                                        style={{maxWidth: "280px"}} onClick={register}
                                        className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                        <span>SUBMIT</span>
                                    </button>
                                    <span style={{color: 'var(--theme-color)'}}>{err.length > 0 && err}</span>

                                </div>

                                <h4>Already have an Account?
                                    <a onClick={() => dispatch(toggleDivVisibility(true))}
                                       style={{
                                           textDecoration: "underline",
                                           color: "var(--theme-color)",
                                           cursor: "pointer"
                                       }}> Sign In</a></h4>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Modal
                // returnFocusAfterClose={focusAfterClose}
                isOpen={showModal}>
                <ModalBody>
                    <div className="text-center modal-success">
                        <FaCheckCircle color="green" size={30}/>
                        <h2>Thank you!</h2>
                        <h3>Your registration is complete.</h3>
                        <p>We want to make sure that we have your accurate information so that we can process your
                            request.</p><p style={{fontWeight: "500"}}>Please check your inbox for email address
                        verification.</p>
                    </div>

                </ModalBody>

                {/*<Button color="primary" onClick={() => setShowModal(false)}>*/}
                {/*    Close*/}
                {/*</Button>*/}
                <Link className="btn" style={{color: "var(--theme-color)"}} href="/">Back to Home Page</Link>

            </Modal>
        </>
    );
};

export default LeftSide;