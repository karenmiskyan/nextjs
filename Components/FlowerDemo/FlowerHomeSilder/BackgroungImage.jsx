import React, { Fragment } from 'react';
import { CommonPath } from '../../Constant';
const BackgroundImage = ({ FlowerHomeSlider }) => {
  return (
    <>
      {FlowerHomeSlider.map((el, i) => {
        return (
          <Fragment key={i}>
            <div className='background-circle'>
              <img src={`${CommonPath}/${el.backgroundcircle}`} className='img-fluid' alt='flower' />
            </div>
            <div className='flower-image'>
              {el.topbottomimage.map((elem, id) => {
                return <img src={`${CommonPath}/${elem.image}`} key={id} className={elem.class} alt='flower' />;
              })}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
export default BackgroundImage;
