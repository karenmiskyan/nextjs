import Router, { useRouter } from 'next/router';
import React from 'react';
import { RefreshCw } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PostCartData } from '../../Utils';

const CompareProducts = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const ProductCompare = () => {
  //   if (staticActions) {
  //     router.push('/page/compare');
  //   } else {
  //     PostCartData(`${process.env.API_URL}addtocompare/${elem?.id}`)
  //       .then((res) => {
  //         dispatch({ type: 'CHANGECOMPARE', payload: res?.data });
  //       })
  //       .catch((error) => {
  //         console.error('There was an error!', error);
  //       });
  //     toast.success('Item Added');
  //   }
  // };
  return (
    <li onClick={ProductCompare}>
      <a href='#javascript'>
        <RefreshCw />
      </a>
    </li>
  );
};

export default CompareProducts;
