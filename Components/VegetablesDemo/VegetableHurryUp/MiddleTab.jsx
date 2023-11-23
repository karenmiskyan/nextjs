import Link from 'next/link';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import { CommonPath, NEW } from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';

const MiddleTab = ({ elem }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  return (
    <Fragment>
      {elem.childtype === 'middlebanner' && (
        <Col lg='4' className='product-banner'>
          <div className='product-box bg-image'>
            <div className='img-wrapper bg-trans'>
              <div className='label-block'>
                <span className='label label-black'>{NEW}</span>
              </div>
              <Link href={'/shop/shop_left_sidebar'}>
                <img src={`${CommonPath}/${elem.image1}`} className='img-fluid' alt='shop' />
                <img src={`${CommonPath}/${elem.image2}`} className='round-circle' alt='shop' />
              </Link>
            </div>
            <div className='product-details text-center'>
              <h3 className='theme-color'>
                {symbol}
                {(elem.price * currencyValue).toFixed(2)}
                <span className='font-light ml-1'>
                  {symbol}
                  {(elem.mrp * currencyValue).toFixed(2)}
                </span>
              </h3>
              <a href='#javascript' className='font-default' tabIndex='-1'>
                <h5 className='mx-auto'>{elem.title}</h5>
              </a>
              <DynamicRating data={elem.ratingStars} customeclass={'mt-1'} />
            </div>
          </div>
        </Col>
      )}
    </Fragment>
  );
};

export default MiddleTab;
