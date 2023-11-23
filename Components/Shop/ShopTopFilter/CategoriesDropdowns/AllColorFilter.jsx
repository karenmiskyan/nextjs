import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '../../../Constant';

const AllColorFilter = ({ productData, setIsNum, isNum }) => {
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state.ProductFilter);
  const [colorArray, setColorArray] = useState([]);
  useEffect(() => {
    productData?.map((el) => setColorArray((prev) => Array.from(new Set([...prev, ...el?.colors]))));
  }, [productData]);
  const onShow = (val) => {
    if (val !== isNum) {
      setIsNum(val);
    } else {
      setIsNum(0);
    }
  };
  return (
    <li className={`category-color onclick-title${isNum === 3 ? ' show-2' : ''}`}>
      <h6 onClick={() => onShow(3)}>{Color}</h6>
      <ul className='onclick-content top-filter-color category-list'>
        {colorArray?.map((elem, i) => (
          <li className={`${color?.includes(elem) ? 'active' : ''}`} key={i}>
            <a href='#javascript' style={{ background: elem }} onClick={() => dispatch({ type: 'COLORFILTER', payload: elem })}></a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default AllColorFilter;
