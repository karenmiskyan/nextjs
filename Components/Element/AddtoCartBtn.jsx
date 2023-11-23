import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Btn } from '../AbstractElements';
import { Addtocart } from '../Constant';

const AddtoCartBtn = ({ customeclass, data, btn }) => {
  const dispatch = useDispatch();
  // const AddtoCart = () => {
  //   axios
  //     .post(`${process.env.API_URL}addtocart`, { id: data?.id })
  //     .then((res) => {
  //       dispatch({ type: 'ADDTOCART', payload: res.data });
  //     })
  //     .catch((error) => {
  //       console.error('There was an error!', error);
  //     });
  //   toast.success('Successfully Added to Cart!!');
  // };
  useEffect(() => {}, [dispatch]);
  return (
    <>
      {btn ? (
        <Btn attrBtn={{ className: customeclass, onClick: AddtoCart }}>{Addtocart}</Btn>
      ) : (
        <a className={customeclass} onClick={AddtoCart}>
          {Addtocart}
        </a>
      )}
    </>
  );
};

export default AddtoCartBtn;
