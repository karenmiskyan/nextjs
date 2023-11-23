import React from 'react';
import { Blogtitle, date } from '../../Constant';

const FormatDetails = ({ elem }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };
  return (
    <div className='blog-detail-custom'>
      <span className='font-light mb-2'>{formatDate(elem?.created_at)}</span>
      <h1 className='card-title mb-4 mt-3' style={{fontSize:"calc(22px + 6 * (100vw - 320px) / 1600)"}}>{elem?.name}</h1>
      {/*<p className='font-light firt-latter'>{elem?.content}</p>*/}
        <div dangerouslySetInnerHTML={{__html: elem?.content}}/>
    </div>
  );
};

export default FormatDetails;
