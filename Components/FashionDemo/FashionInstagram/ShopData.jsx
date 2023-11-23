import React from 'react';
import Slider from 'react-slick';
import { InstaSlider } from '../../../Data/SliderSettingsData';
import { CommonPath, ShopNow } from '../../Constant';
import { Btn } from '../../AbstractElements';
import Img from '../../Element/Images';
import { useRouter } from 'next/router';
import Link from 'next/link';
const ShopData = ({ bannerData }) => {
  const InstaBanner = bannerData?.filter((el) => el.subtype === 'fashioninstashop');
  const router = useRouter();
  return (
    <>
      {InstaBanner &&
        InstaBanner.map((el, i) => {
          return (
            <Slider {...InstaSlider} key={i}>
              {el.children.map((elem, i) => {
                return (
                  <div key={i}>
                    <div className='product-box'>
                      <div className='img-wrapper'>
                        <div className='top-wishlist product-color'>
                          <Link href={'/page/wishlist'} className='heart-wishlist heart-color ms-auto theme-color'>
                            <i className='far fa-heart'></i>
                          </Link>
                        </div>
                        <div className='share share-box share-opacity'>
                          <span className='share-plus share-plus-color'>+</span>
                          <span>{elem.share}</span>
                        </div>
                        <a href='#javascript' className='text-center bg-size'>
                          <Img src={`${CommonPath}/${elem.image}`} className='bg-img' alt='share-box' />
                        </a>
                      </div>
                      <div className='insta-hover insta-spacing text-center'>
                        <div>
                          <h5>{elem.discount}</h5>
                          <h3 className='text-hide'>{elem.title}</h3>
                          <Btn
                            attrBtn={{
                              className: 'btn-light-white',
                              onClick: () => router.push('/shop/shop_left_sidebar'),
                            }}>
                            {ShopNow}
                            <i className='fas fa-chevron-right ms-2'></i>
                          </Btn>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          );
        })}
    </>
  );
};
export default ShopData;
