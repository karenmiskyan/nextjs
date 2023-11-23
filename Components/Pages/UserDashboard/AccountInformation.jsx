import React, {useState} from 'react';
import { Col, Row } from 'reactstrap';

const AccountInformation = ({ user }) => {
  return (
    <div className='box-account box-info mt-0'>
      {/*<div className='box-head'>*/}
      {/*  */}
      {/*  <h3>{elem.mainhead}</h3>*/}
      {/*</div>*/}
      {/*<Row>*/}
      {/*  <Col sm='6'>*/}
      {/*    <div className='box'>*/}
      {/*      <div className='box-title'>*/}
      {/*        <h4>{elem.head1}</h4>*/}
      {/*        <a href='#javascript'>{elem.btn}</a>*/}
      {/*      </div>*/}
      {/*      <div className='box-content'>*/}
      {/*        <h6 className='font-light'>{elem.name}</h6>*/}
      {/*        <h6 className='font-light'>{elem.email}</h6>*/}
      {/*        <a href='#javascript'>{elem.password}</a>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </Col>*/}
      {/*  <Col sm='6'>*/}
      {/*    <div className='box'>*/}
      {/*      <div className='box-title'>*/}
      {/*        <h4>{elem.head2}</h4>*/}
      {/*        <a href='#javascript'>{elem.btn}</a>*/}
      {/*      </div>*/}
      {/*      <div className='box-content'>*/}
      {/*        <h6 className='font-light'>{elem.info}</h6>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <div>
        <div className='box address-box mt-0'>
          <div className='box-head '>
          {/*  <h4>{elem.head3}</h4>*/}
            <h2 className="">Edit Address</h2>
          {/*  <a href='#javascript'>{elem.subhead}</a>*/}
          </div>
          <div className='box-content'>
            <Row className='row g-4'>
              <Col sm='6'>
                <h4>Billing Address</h4>
                <h6 className='font-light'>{user.billing}</h6>
                <h6 className='font-light'>{user.billinginfo}</h6>
                {/*<a href='#javascript'>{elem.btn2}</a>*/}

                <div className='product-buttons mt-3' style={{flexDirection: "column", width: "80px"}}>
                  <button className='btn btn-solid hover-solid btn-animation'
                          style={{fontSize: "14px", padding: "2px 4px"}}>Edit </button>
                </div>
              </Col>
              <Col sm='6'>
                <h4>Shipping Address</h4>
                <h6 className='font-light'>{user.shipping}</h6>
                <h6 className='font-light'>{user.shippinginfo}</h6>
                <div className='product-buttons mt-3' style={{flexDirection: "column", width: "80px"}}>
                  <button className='btn btn-solid hover-solid btn-animation'
                          style={{fontSize: "14px", padding: "2px 4px"}}>Edit</button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
