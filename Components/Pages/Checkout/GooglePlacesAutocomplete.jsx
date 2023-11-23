
import React, { useState, useCallback, useRef } from 'react';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

// const libraries = ["places"];

function PlaceAutocomplete() {
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: "AIzaSyCoVE9yQ3Y_48ThEQV7bYtdMxSXeBZ72AU",
    //     libraries,
    // });

    const [addressDetails, setAddressDetails] = useState({
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const [inputValues, setInputValues] = useState({
        city: '',
        state: '',
        zipCode: ''
    });

    const [errors, setErrors] = useState({
        city: false,
        state: false,
        zipCode: false
    });

    const searchBoxRef = useRef(null);
    const [inputValue, setInputValue] = useState("");


    const handlePlacesChanged = useCallback(() => {
        const places = searchBoxRef.current.getPlaces();
        if (places && places.length === 1) {
            const place = places[0];

            let address = '', city = '', state = '', zipCode = '';

            for (let component of place?.address_components) {

                switch (component.types[0]) {
                    case 'street_number':
                        address = `${component.long_name} `;
                        break;
                    case 'route':
                        address += component.short_name;
                        break;
                    case "neighborhood":
                        city = component.long_name;
                        break;
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
            setAddressDetails({ address, city, state, zipCode });
            setInputValues({ city, state, zipCode });  // Setting input values based on selection

            setInputValue(address);
        }
    }, []);

    const handleInputChange = (field, value) => {
        setInputValues(prev => ({ ...prev, [field]: value }));
        if (value.toLowerCase() !== addressDetails[field].toLowerCase()) {
            setErrors({ ...errors, [field]: true });
        } else {
            setErrors({ ...errors, [field]: false });
        }
    };

    // if (loadError) return <div>Error loading maps</div>;
    // if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div >
            Address:     <StandaloneSearchBox
            onLoad={ref => searchBoxRef.current = ref}
            onPlacesChanged={handlePlacesChanged}
        >
            <input
                type="text"
                placeholder=""
                // value={inputValue}  // Bind the inputValue state here
                // onChange={e => setInputValue(e.target.value)}  // Update the state when the input changes
                style={{
                    width: "600px"
                }}
            />
        </StandaloneSearchBox>

            <div>
                <label>
                    City:
                    <input
                        type="text"
                        value={inputValues.city}
                        onChange={e => handleInputChange('city', e.target.value)}
                    />
                    {errors.city && <span style={{ color: 'red' }}>City doesn't match the selected address</span>}
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        value={inputValues.state}
                        onChange={e => handleInputChange('state', e.target.value)}
                    />
                    {errors.state && <span style={{ color: 'red' }}>State doesn't match the selected address</span>}
                </label>

                <label>
                    Zip Code:
                    <input
                        type="text"
                        value={inputValues.zipCode}
                        onChange={e => handleInputChange('zipCode', e.target.value)}
                    />
                    {errors.zipCode && <span style={{ color: 'red' }}>Zip Code doesn't match the selected address</span>}
                </label>
            </div>
        </div>
    );
}

export default PlaceAutocomplete;