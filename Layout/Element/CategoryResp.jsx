import React from 'react';
import { useDispatch } from 'react-redux';
import { CategoryList } from '../../Components/Constant';
import useWindowDimensions from '../../Utils/useWindowDimensions';

const CategoryResp = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const toggleModal = () => {
    if (width > 1200) {
      dispatch({ type: 'CATEGORYRESPONSIVE' });
      dispatch({ type: 'OVERLAY',payload:true});
    }
  };
  return (
    <div className='close-btn d-xl-none' onClick={() => toggleModal()}>
      {CategoryList}
      <span className='back-category'>
        <i className='fa fa-angle-left'></i>
      </span>
    </div>
  );
};

export default CategoryResp;
