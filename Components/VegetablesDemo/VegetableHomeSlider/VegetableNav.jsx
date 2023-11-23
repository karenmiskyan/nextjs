import React from 'react';
import Slider from 'react-slick';
import { VegetableNavSlider } from '../../../Data/SliderSettingsData';
const VegetableNav = ({ nav1, slider2 }) => {
  return (
    <Slider className='slider-nav image-show' asNavFor={nav1} ref={(slider) => (slider2.current = slider)} {...VegetableNavSlider}>
      <div>
        <div className='poster-img'>
          <img src='/assets/images/vegetable/poster/t1.jpg' alt='vegetable' />
          <div className='overlay-color'>
            <i className='fas fa-plus theme-color'></i>
          </div>
        </div>
      </div>
      <div>
        <div className='poster-img'>
          <img src='/assets/images/vegetable/poster/t2.jpg' alt='vegetable' />
          <div className='overlay-color'>
            <i className='fas fa-plus theme-color'></i>
          </div>
        </div>
      </div>

      <div>
        <div className='poster-img'>
          <img src='/assets/images/vegetable/poster/t3.jpg' alt='vegetable' />
          <div className='overlay-color'>
            <i className='fas fa-plus theme-color'></i>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default VegetableNav;
