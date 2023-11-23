import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {APICallUrl, Emailaddress} from "../../Constant";
import {setCheckoutDetails, setCheckoutErrors} from "../../../ReduxToolkit/Slices/CartSlice";
import {Col, Container, Form, Label, Row} from "reactstrap";
import StateField from "../Checkout/StateField";
import {selectLoginToken, setUser} from "../../../ReduxToolkit/Slices/LoginSlice";
import {toast} from "react-toastify";
import {Autocomplete} from "@react-google-maps/api";
import GooglePlacesAutocomplete from "../Checkout/GooglePlacesAutocomplete";

const AddressEditForm = ({info, setLoading, setShowModal, isLoaded, loadError, title}) => {
    const [citi, setCiti] = useState({});
    const [stateG, setState] = useState([]);
    const loginToken = useSelector(selectLoginToken);

    const [addressDetails, setAddressDetails] = useState({
        address: info?.address === null || info?.address === undefined ? "" : info?.address,
        city: info?.city === null || info?.city === undefined ? "" : info?.city_name,
        state: '',
        zipCode: info?.zip_code === null || info?.zip_code === undefined ? "" : info?.zip_code
    });



    const [zipMismatch, setZipMismatch] = useState(false);
    const [cityMismatch, setCityMismatch] = useState(false);
    const [stateMismatch, setStateMismatch] = useState(false);

    let dispatch = useDispatch();

    const initialValues = {
        name: info?.name === null || info?.name === undefined ? "" : info?.name,
        email: info?.email === null || info?.email === undefined ? "" : info?.email,
        phone: info?.phone === null || info?.phone === undefined ? "" : info?.phone,
        country: info?.country === null || info?.country === undefined ? 3 : info?.country,
        zip_code: info?.zip_code === null || info?.zip_code === undefined ? "" : info?.zip_code,
        city: info?.city === null || info?.city === undefined ? "" : info?.city_name,
        addr: info?.address === null || info?.address === undefined ? "" : info?.address,
        house: ""
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),
        zip_code: Yup.string()
            .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code")
            .required("Required"),
        city: Yup.string().required("Required"),
        addr: Yup.string().required("Required"),
        })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    useEffect(() => {

        formik.validateForm();
        fetch(`${APICallUrl}/api/get-states`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
        })
            .then((res) => res.json()).then((res) => {
            setState(res)
            setAddressDetails(prev => ({
                ...prev,
                state: res?.find((elem) => elem?.abbreviation === info?.location_state?.abbreviation)?.abbreviation
            }));
            setCiti(res?.find((elem) => elem?.abbreviation === info?.location_state?.abbreviation ))
        })
            .catch((error) => {
                console.error('Failed to get States', error);
            });
    }, []);



    const changeAddress = (e) => {
        e.preventDefault()
        // setLoading(true);
        fetch(`${APICallUrl}/api/v1/update/address`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify({
                id: info?.id || 0,
                name: formik.values.name,
                email: formik.values.email,
                phone: formik.values.phone,
                country: formik.values.country,
                zip_code: formik.values.zip_code,
                city: formik.values.city,
                state: citi?.id,
                address: `${formik.values.addr} ${formik.values.house}`,
            }),
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

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }


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
                // setZip(zipCode);
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
        <Form className='needs-validation'>
            <Container>
                <Row className='g-4'>
                    {/*<GooglePlacesAutocomplete/>*/}

                    <Col lg="12">
                        <h3>Change {title} Address Details</h3>
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='fname' className='form-label required-label'>
                            Full Name
                        </Label>
                        <input type='text' className='form-control checkout-form' name='name' id='fname'
                               placeholder='Enter Full Name'
                               value={ltrim(formik.values.name)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.name}</span>
                        )}
                    </Col>

                    <Col md='4'>
                        <Label htmlFor='email' className='form-label required-label'>
                            {Emailaddress}
                        </Label>
                        <input type='email' className='form-control checkout-form' id='email'
                               placeholder='example@example.com' name='email'
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}

                        />
                        {formik.errors.email && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.email}</span>
                        )}
                    </Col>
                    <Col md='4'>
                        <Label htmlFor='phone' className='form-label required-label'>
                            Phone Number
                        </Label>
                        <input type='phone' className='form-control checkout-form'
                               placeholder='Enter your phone number'
                               name='phone'
                               value={formik.values.phone}
                               onChange={(e) => {
                                   const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                   formik.setFieldValue('phone', phoneNumber); // Update the formik value
                               }}
                               onBlur={formik.handleBlur}
                        />
                        {/*{errors.phone && <span style={{color: 'red'}}>Phone is Required</span>}*/}
                        {formik.errors.phone &&
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.phone}</span>}
                    </Col>
                    <Col md='5'>
                        <Label className='form-label required-label'>
                            Street Address
                        </Label>

                        <Autocomplete
                            onLoad={ref => searchBoxRef.current = ref}
                            onPlaceChanged={() => handlePlacesChanged(searchBoxRef.current.getPlace())}
                            restrictions={{country: "US"}}
                        >
                            <input type='text' className='form-control checkout-form'
                                   // placeholder='Enter your address'
                                   name='addr'
                                   autoComplete="nope"
                                   value={ltrim(formik.values.addr)}
                                   onChange={(e) => {
                                       formik.handleChange(e)
                                       // setInputValue(e.target.value)
                                   }}
                                   onBlur={formik.handleBlur}
                            />
                        </Autocomplete>
                        {formik.errors.addr && (
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.addr}</span>
                        )}
                    </Col>
                    <Col md='3'>
                        <Label htmlFor='zip' className='form-label required-label'>
                            Postcode
                        </Label>
                        <input type='text' className='form-control checkout-form' id='zip'
                               placeholder='Enter your postcode' name='zip_code'
                               autoComplete="nope"
                               value={formik.values.zip_code}
                               onChange={(e) => {
                                   formik.handleChange(e);
                                   setZipMismatch(e.target.value !== addressDetails.zipCode);

                               }}
                               onBlur={formik.handleBlur}/>
                        {/*{zipMismatch &&*/}
                        {/*    <span*/}
                        {/*        style={{color: 'var(--theme-color)'}}>ZIP Code doesn't match the selected address</span>}*/}
                        {formik.errors.zip_code &&
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.zip_code}</span>}
                    </Col>


                    <Col md='4'>
                        <Label htmlFor='city' className='form-label required-label'>
                            City
                        </Label>
                        <input type='text' className='form-control checkout-form'
                               // placeholder='Enter your City'
                               name='city'
                               value={formik.values.city} disabled
                               onChange={(e) => {
                                   formik.handleChange(e)
                                   // handleInputChange('city', e.target.value)
                                   setCityMismatch(e.target.value.toLowerCase() !== addressDetails.city.toLowerCase());
                               }}
                               onBlur={formik.handleBlur}/>
                        {/*{cityMismatch &&*/}
                        {/*    <span style={{color: 'var(--theme-color)'}}>City doesn't match the selected address</span>}*/}
                        {formik.errors.city &&
                            <span style={{color: 'var(--theme-color)'}}>{formik.errors.city}</span>}
                    </Col>

                    <StateField state={stateG} defState={info?.state_name} citi={citi} setCiti={setCiti}
                                addressDetails={addressDetails} stateMismatch={stateMismatch}
                                setStateMismatch={setStateMismatch}
                    />
                    {/*<StateField/>*/}
                    {/*<CountryField cities={citi?.cities}/>*/}

                    <Col md='6'>
                        <Label htmlFor='house-number' className='form-label'>
                            House/Flat Number
                        </Label>
                        <input type='text' className='form-control checkout-form' id='address2'
                               placeholder='Enter your house/flat N' name='house'
                               value={ltrim(formik.values.house)}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               autoComplete="nope"
                        />
                        {/*{formik.touched.house && formik.errors.house && (*/}
                        {/*    <span style={{color: 'var(--theme-color)'}}>{formik.errors.house}</span>*/}
                        {/*)}*/}
                    </Col>
                    <Col lg="12">

                        <div className='product-buttons mb-0 mt-3' style={{flexDirection: "column"}}>
                            <button style={{maxWidth: "280px"}}
                                    onClick={(e) => changeAddress(e)}
                                disabled={
                                    !formik.values.name ||
                                    !formik.values.email ||
                                    !formik.values.phone ||
                                    !formik.values.zip_code ||
                                    !formik.values.city ||
                                    !formik.values.addr ||
                                    formik.errors.name ||
                                    formik.errors.email ||
                                    formik.errors.phone ||
                                    formik.errors.zip_code ||
                                    formik.errors.city ||
                                    formik.errors.addr
                                    // || zipMismatch || cityMismatch || stateMismatch
                                }
                                    className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                <span>Save Changes</span>
                            </button>

                        </div>
                    </Col>
                </Row>
            </Container>

        </Form>


    );
};


export default AddressEditForm;