import {useRouter} from 'next/router';
import React from 'react';
import {Col} from 'reactstrap';
import {Btn} from '../../AbstractElements';
import {image_api, CommonPath, OFF, ShopNow} from '../../Constant';
import CountDown from '../../Element/CountDown';
import Img from '../../Element/Images';

const LeftSideDeal = ({elem, defImg}) => {
    const router = useRouter();

    return (
        <Col xl='9' lg='8'>
            <div className='timer-banner text-center bg-size'>
                <Img
                    src={`${image_api}/${elem?.img_src}`}
                    width="1236" height="618" alt={elem?.name} className='bg-img'/>

                <div className='discount-offer'>
                    <h5>
            <span className='theme-color'>
              New Offer {elem?.discount}% {OFF}
            </span>
                    </h5>
                </div>
                <div className='timer'>
                    <CountDown customeclass={'light-color'}/>
                </div>
                <div className='banner-btn-grup'>
                    <Btn
                        attrBtn={{
                            className: 'btn-solid-default',
                            onClick: () => router.push(`${elem?.slugable?.prefix}/${elem?.slugable?.key}`),
                        }}>
                        {ShopNow}
                    </Btn>
                </div>
            </div>
        </Col>
    );
};

export default LeftSideDeal;
