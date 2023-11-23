import {useRouter} from 'next/router';
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {Btn} from '../../AbstractElements';
import {ShopNow} from '../../Constant';

const VegeLeftContain = ({VegetableSlider, slider}) => {
    const {symbol, currencyValue} = useSelector((state) => state.CurrencyReducer);
    const router = useRouter();

    return (
        <>
            {slider.map((elem, i) => {

                return (
                    <Fragment key={i}>
                        <div className='left-side-contain'>
                            <div className='banner-left'>
                                <h2>
                                    {/*{elem.lefttitle}*/}
                                    SAMSUNG 4K SMART TV
                                    {elem.title}
                                    {/*<span className='theme-color'>{elem.discount}</span>*/}
                                </h2>
                                <h1>
                                    {/*{elem.heading}*/}
                                    IN STOCK NOW
                                    {/*<span>{elem.headingbottom}</span>*/}
                                </h1>
                                {/*<p>*/}
                                {/*  {elem.bottomtitletop} <span className='theme-color'>{elem.bottomtitlebottom}</span>*/}
                                {/*</p>*/}
                                {/*<h2>*/}
                                {/*  {symbol}*/}
                                {/*  {(elem.price * currencyValue).toFixed(2)}*/}
                                {/*  <span className='theme-color'>*/}
                                {/*    <del>*/}
                                {/*      {symbol}*/}
                                {/*      {(elem.mrp * currencyValue).toFixed(2)}*/}
                                {/*    </del>*/}
                                {/*  </span>*/}
                                {/*</h2>*/}
                                {/*<p className='poster-details'>{elem.description}</p>*/}
                                <div className='banner-btn-grup'>
                                    <Btn
                                        attrBtn={{
                                            className: 'btn-solid-default button-top-left',
                                            onClick: () => router.push('/shop/shop_left_sidebar'),
                                        }}>
                                        {ShopNow}
                                    </Btn>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
};

export default VegeLeftContain;
