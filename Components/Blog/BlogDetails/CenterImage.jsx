import React from 'react';
import {APICallUrl, CommonPath} from '../../Constant';

const CenterImage = ({ elem }) => {
  return (
    <div className='blog-image-box'>
      <img src={`${elem?.image}`} alt={elem?.name}  title={elem?.name} className='card-img-top' />
      <div className='blog-title'>
        <div>
          <div className='social-media media-center'>
            {/*{elem.social.map((item) => {*/}
            {/*  return (*/}
            {/*    <a href={item.link} target='new' key={item.id}>*/}
            {/*      <div className='social-icon-box social-color'>*/}
            {/*        <i className={item.class}></i>*/}
            {/*      </div>*/}
            {/*    </a>*/}
            {/*  );*/}
            {/*})}*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterImage;
