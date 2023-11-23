import React from 'react';
import { Col, Label } from 'reactstrap';
import { Choose, Country, CountryArr } from '../../Constant';

const CountryField = ({cities}) => {
  return (
    <Col md='6'>
      <Label htmlFor='validationCustom04' className='form-label '>
        Citi
      </Label>
      <select className='form-select custome-form-select checkout-form' id='validationCustom04'>
        <option disabled>{Choose}</option>
        {cities?.map((elem, i) => {
          return <option key={i}>{elem?.name}</option>;
        })}
      </select>
    </Col>
  );
};

export default CountryField;
