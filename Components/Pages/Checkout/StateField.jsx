import React, {useEffect} from 'react';
import {Col, Label} from 'reactstrap';
import {Choose, State, StateArr} from '../../Constant';

const StateField = ({state, citi, setCiti, stateMismatch, setStateMismatch, addressDetails, l}) => {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = state?.find((elem) => elem?.abbreviation === selectedValue);
        setCiti(selectedOption);
    };

    return (
        <Col md={l ? l : "4"}>
            <Label htmlFor='validationCustom04' className='form-label required-label'>
                State
            </Label>
            <select
                className='form-select custome-form-select checkout-form'
                id='validationCustom05'
                value={citi?.abbreviation ? citi?.abbreviation : "def"}
                onChange={(e) => {
                    handleSelectChange(e)
                    // setStateMismatch(e.target.value.toLowerCase() !== addressDetails?.state?.toLowerCase())
                }}>
                <option disabled value="def">{Choose}</option>
                {state?.map((elem, i) => (
                    <option key={i} value={elem.abbreviation}>
                        {elem.name}
                    </option>
                ))}
            </select>
            {/*{stateMismatch &&*/}
            {/*    <span style={{color: 'var(--theme-color)'}}>State doesn't match the selected address</span>}*/}
        </Col>
    );
};

export default StateField;