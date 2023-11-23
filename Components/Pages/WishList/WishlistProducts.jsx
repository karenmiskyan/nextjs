import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { getAPIData } from '../../../Utils';
import { Btn } from '../../AbstractElements';
import { ContinueShopping } from '../../Constant';
import WishlistDataList from './WishlistDataList';

const WishlistProducts = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const router = useRouter();
  const { wishlist } = useSelector((state) => state.AddToCartReducer);

  return (
    <section className='wish-list-section section-b-space'>
      <Container>
        <Row className='justify-content-center'>
          {wishlistData.length > 0 ? (
            <Col sm='12' className='table-responsive'>
              <WishlistDataList wishlistData={wishlistData} />
            </Col>
          ) : (
            <Col sm='3' xs='9' className='mx-auto'>
              <img src='/assets/images/wishlistEmpty.png' className='img-fluid mb-3' alt='wishlist empty' />
              <div className='w-100 text-center'>
                <h5 className='text-center mb-3'>Wishlist is empty! No products were added to the Wish List</h5>
                <Btn attrBtn={{ className: 'btn-solid-default', onClick: () => router.push('/shop/shop_left_sidebar') }}>{ContinueShopping}</Btn>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default WishlistProducts;
