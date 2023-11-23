import React from 'react';
import { deleteProduct } from '../../../Utils';
import { Remove } from '../../Constant';
import AddtoCartBtn from '../../Element/AddtoCartBtn';

const CompareAction = ({ setComapreData, comapreData }) => {

  return (
    <tr className='table-cart-button'>
      <td></td>
      {comapreData?.map((elem, i) => (
        <td key={i}>
          <a className='btn btn-solid-blue mb-2' onClick={(e) => handleDelete(elem.id, e)}>
            - {Remove}
          </a>
          <AddtoCartBtn customeclass={'btn btn-solid-blue'} data={elem} />
        </td>
      ))}
    </tr>
  );
};

export default CompareAction;
