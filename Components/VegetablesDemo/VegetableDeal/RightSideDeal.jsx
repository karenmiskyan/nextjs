import { useRouter } from 'next/router';
import React from 'react';
import { Col } from 'reactstrap';
import { Btn } from '../../AbstractElements';

import {image_api, CommonPath, ShopNow} from '../../Constant';
import Img from '../../Element/Images';

const RightSideDeal = ({ elem, defImg }) => {
  const router = useRouter();

  return (
    <Col xl='3' lg='4' className='small-banner'>
      <div className='collection-banner text-center collection-center bg-size'>
        <Img width="396" height="618"
             src={`${image_api}/${elem?.img_src}`}
             // src={imageLoaded ? `${image_api}/${elem?.img_src}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
             alt={elem?.name} className='bg-img' />
        <div className="special-offer-content">
          <div dangerouslySetInnerHTML={{__html: elem?.short_description}}/>
          {/*<h6 className='theme-color mb-2'>{elem?.rightsmallheading}asdasd</h6>*/}
          {/*<h2>{elem?.rightsmallheading} </h2>*/}
          {/*<h2>{elem?.rightheadingbottom}</h2>*/}
          {/*<p className='mt-2 mb-0 font-light'>{elem?.bottomsmalltop} </p>*/}
          {/*<p className='font-light mb-0'> {elem?.bottomsmallbottom}</p>*/}
          <Btn
            attrBtn={{
              className: 'btn-solid-default ',
                onClick: () => router.push(`${elem?.slugable?.prefix}/${elem?.slugable?.key}`),
            }}>
            {ShopNow}
          </Btn>
        </div>
      </div>
    </Col>
  );
};

export default RightSideDeal;
