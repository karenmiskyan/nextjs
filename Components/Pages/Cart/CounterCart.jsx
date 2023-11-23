import { useRouter } from 'next/router';
import React from 'react';
import { Col } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { cartDescription, CheckOut, minutes } from '../../Constant';
import TimeCountDown from '../../Element/TimeCountDown';

const CounterCart = () => {
  const router = useRouter();
  return (
    <Col xs='12'>
      <div className='count-down'>
        <h5>
          {cartDescription} <TimeCountDown /> {minutes}
        </h5>
        <Btn attrBtn={{ className: 'btn btn-solid-default btn-sm fw-bold', onClick: () => router.push('/page/checkout') }}>{CheckOut}</Btn>
      </div>
    </Col>
  );
};

export default CounterCart;
