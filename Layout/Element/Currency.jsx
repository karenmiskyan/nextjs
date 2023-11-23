import React from 'react';
import { DollarSign } from 'react-feather';
import { useDispatch } from 'react-redux';
import { allCurrency } from '../../Data/TopHeaderData';

const Currency = () => {
  const dispatch = useDispatch();
  const onHandleClick = (value) => {
    dispatch({ type: 'CURRENCYCHANGE', payload: value });
  };
  return (
    <li className='onhover-dropdown small-dropdown'>
      <div className='cart-media'>
        <a href='#javascript'>
          <DollarSign />
        </a>
      </div>
      <div className='onhover-div profile-dropdown'>
        <ul>
          {allCurrency.map((elem, i) => {
            return (
              <li key={i}>
                <a href='#javascript' className='d-block' onClick={() => onHandleClick(elem)}>
                  {elem.currency}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};
export default Currency;
