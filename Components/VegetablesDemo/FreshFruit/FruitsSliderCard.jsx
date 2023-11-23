import React from 'react';
import Slider from 'react-slick';
import { SliderFruit } from '../../../Data/SliderSettingsData';
import { CommonPath } from '../../Constant';

const FruitsSliderCard = ({ FreshFilter }) => {
  return (
    <div className='product-wrapper slide-4'>
      <Slider {...SliderFruit}>
        {FreshFilter.map((el) => {
          return el.banners.map((elem, i) => {
            return (
              <div key={i}>
                <div className='category-image-fruit'>
                  <img src={`${CommonPath}/${elem.image}`} className='img-fluid' alt='category' />
                  <div className='category-contain'>
                    <img src={`${CommonPath}/${elem.imagefront}`} alt='category' />
                  </div>

                  <div className='category-text'>
                    <h2>{elem.heading}</h2>
                    <h5>{elem.subheading}</h5>
                  </div>
                </div>
              </div>
            );
          });
        })}
      </Slider>
    </div>
  );
};

export default FruitsSliderCard;
