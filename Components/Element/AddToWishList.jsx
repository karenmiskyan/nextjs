import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Heart } from 'react-feather';
import { useDispatch } from 'react-redux';
import { PostCartData } from '../../Utils';

const AddToWishList = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const AddtoWishList = () => {
  //   if (staticActions) {
  //     router.push('/page/wishlist');
  //   } else {
  //     PostCartData(`${process.env.API_URL}addtowishlist`, { id: elem?.id })
  //       .then((res) => {
  //         dispatch({ type: 'ADDTOWISHLIST', payload: res?.data });
  //       })
  //       .catch((error) => {
  //         console.error('There was an error!', error);
  //       });
  //     router.push(`/page/wishlist`);
  //   }
  // };
  useEffect(() => {}, [dispatch]);
  return (
    <li onClick={() => AddtoWishList()}>
      <a href='#javascript' className='wishlist'>
        <Heart />
      </a>
    </li>
  );
};

export default AddToWishList;
