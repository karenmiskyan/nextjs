import React from 'react';
import Slider from 'react-slick';
import { CommonPath, Next, Prev } from '../../Constant';

const PosterSlider = ({ nav2, slider1, PosterFilter }) => {
  const PosterSlider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider {...PosterSlider} asNavFor={nav2} ref={(slider) => (slider1.current = slider)} className='poster-image slider-for custome-arrow classic-arrow'>
      {PosterFilter.map((el) => {
        return el.horizontalimage.map((elem, i) => {
          return (
            <div key={i}>
              <img src={`${CommonPath}/${elem.image}`} className='img-fluid' alt='arrow' />
            </div>
          );
        });
      })}
    </Slider>
  );
};

export default PosterSlider;

export const NextArrow = () => {
  return (
    <div className='custom-arrow next'>
      <span>{Next}</span>
      <i className='fas fa-chevron-right ms-3'></i>
    </div>
  );
};
export const PrevArrow = () => {
  return (
    <div className='custom-arrow prev'>
      <i className='fas fa-chevron-left me-3'></i>
      <span>{Prev}</span>
    </div>
  );
};
