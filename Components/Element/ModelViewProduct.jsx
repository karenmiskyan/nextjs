import React from 'react';
import { Eye } from 'react-feather';
import { useDispatch } from 'react-redux';

const ModelViewProduct = ({ elem }) => {
  const dispatch = useDispatch();
  const ModelOpen = (e) => {
    e.preventDefault();
    dispatch({
      type: 'IS_MODAL',
      payload: elem,
    });
  };
  return (
    <li
      onClick={(e) => {
        ModelOpen(e);
      }}>
      <a href='#javascript'>
        <Eye />
      </a>
    </li>
  );
};

export default ModelViewProduct;
