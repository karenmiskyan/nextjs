import React from 'react';
import { useState } from 'react';
import { Color } from '../../Constant';

const ContainColor = () => {
  const [active, setActive] = useState();
  return (
    <div className='color-image'>
      <div className='image-select'>
        <h5>{Color} :</h5>
        <ul className='image-section'>
          <li className={active === 1 ? 'active' : ''}>
            <a href='#javascript' onClick={() => setActive(1)}>
              <img src='/assets/images/fashion/product/front/5.jpg' className='img-fluid' alt='front' />
            </a>
          </li>
          <li className={active === 2 ? 'active' : ''}>
            <a href='#javascript' onClick={() => setActive(2)}>
              <img src='/assets/images/fashion/product/front/6.jpg' className='img-fluid' alt='front' />
            </a>
          </li>
          <li className={active === 3 ? 'active' : ''}>
            <a href='#javascript' onClick={() => setActive(3)}>
              <img src='/assets/images/fashion/product/front/7.jpg' className='img-fluid' alt='front' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContainColor;
