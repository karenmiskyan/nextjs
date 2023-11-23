import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostCartData } from '../../../Utils';
import { wishlist } from '../../Constant';

const ProductWishListAction = ({ singleProduct }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const AddtoWishList = () => {
  //   PostCartData(`${process.env.API_URL}addtowishlist`, { id: singleProduct ? singleProduct[0]?.id : 1 })
  //     .then((res) => {
  //       dispatch({ type: 'ADDTOWISHLIST', payload: res?.data });
  //     })
  //     .catch((error) => {
  //       console.error('There was an error!', error);
  //     });
  //   dispatch({ type: 'NOTIFICATIONALTER', payload: singleProduct, value: true });
  //   router.push('/page/wishlist');
  // };
  useEffect(() => { }, [dispatch]);
  return (
    <a className='btn btn-solid' onClick={AddtoWishList}>
      <i className='fa fa-bookmark fz-16 me-2'></i>
      <span>{wishlist}</span>
    </a>
  );
};

export default ProductWishListAction;
