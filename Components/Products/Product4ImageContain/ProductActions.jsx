import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Addtocart, freeshipping } from '../../Constant';
import ProductWishListAction from './ProductWishListAction';

const ProductActions = ({ singleProduct }) => {
  const dispatch = useDispatch();
  // const AddtoCart = () => {
  //   axios
  //     .post(`${process.env.API_URL}addtocart`, { id: singleProduct ? singleProduct[0]?.id : 1 })
  //     .then((res) => {
  //       dispatch({ type: 'ADDTOCART', payload: res.data });
  //     })
  //     .catch((error) => {
  //       console.error('There was an error!', error);
  //     });
  //   dispatch({ type: 'NOTIFICATIONALTER', payload: singleProduct ? singleProduct : 1, value: true });
  //   toast.success('Item Added');
  // };
  useEffect(() => { }, [dispatch]);
  return (
    <>
      <div className='product-buttons'>
        {/*<ProductWishListAction singleProduct={singleProduct} />*/}
        <a href='#javascript' id='cartEffect' className='btn btn-solid hover-solid btn-animation' onClick={AddtoCart}>
          {/*<i className='fa fa-shopping-cart'></i>*/}
          <span>{Addtocart}</span>
        </a>
      </div>

      {/*<ul className='product-count shipping-order'>*/}
      {/*  <li>*/}
      {/*    <img src='/assets/images/gif/truck.png' className='img-fluid' alt='image' />*/}
      {/*    <span className='lang'>{freeshipping}</span>*/}
      {/*  </li>*/}
      {/*</ul>*/}
    </>
  );
};

export default ProductActions;
