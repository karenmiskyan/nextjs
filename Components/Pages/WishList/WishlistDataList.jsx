import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { deleteProduct } from '../../../Utils';
import { CommonPath } from '../../Constant';
import MobileViewData from './MobileViewData';
import WishlistTableHead from './WishlistTableHead';

const WishlistDataList = ({ wishlistData }) => {
  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  // const removeProduct = (product) => {
  //   deleteProduct(`${process.env.API_URL}remove/wishlist/${product.id}`).then((res) => {
  //     dispatch({ type: 'ADDTOWISHLIST', payload: res?.data });
  //   });
  // };
  return (
    <Table className='cart-table wishlist-table'>
      <WishlistTableHead />
      <tbody>
        {wishlistData &&
          wishlistData.map((elem) => {
            return (
              <tr key={elem.id}>
                <td>
                  {/*<Link href={`/product/product_left_sidebar/${elem.id}`}>*/}
                  {/*  {elem?.images?.slice(0, 1).map((item, i) => (*/}
                  {/*    <img src={`${CommonPath}/${item.src}`} alt='product' key={i} />*/}
                  {/*  ))}*/}
                  {/*</Link>*/}
                </td>
                <MobileViewData elem={elem} />
                <td>
                  <p className='fw-bold'>{`${symbol}${(elem.price * currencyValue).toFixed(2)}`}</p>
                </td>
                <td>
                  <p>{elem.inStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                </td>
                <td>
                  <a className='icon' href='#javascript' onClick={() => removeProduct(elem)}>
                    <i className='fas fa-times'></i>
                  </a>
                  <Link href={`/page/cart`} className='icon'>
                    <i className='fas fa-shopping-cart'></i>
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default WishlistDataList;
