import React, {useEffect, useState} from 'react';
import {Clock, Eye} from 'react-feather';
import {PopularPost} from '../../../Data/BlogData';
import {PopularPosts} from '../../Constant';
import Link from "next/link";
import {Col, Row} from "reactstrap";

const LeftPopularCard = ({popular, title,two, url}) => {

    const [randomViews, setRandomViews] = useState({});
    useEffect(() => {
        const newRandomViews = {};
        popular?.forEach(elem => {
            newRandomViews[elem?.id] = generateRandomNumber();
        });
        setRandomViews(newRandomViews);
    }, [popular]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: '2-digit'};
        return date.toLocaleDateString('en-US', options);
    };
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    };
    return (
        <div className={`popular-post ${two?"mt-3":""}`}>
            <div className='popular-title'>
                <h1 style={{fontSize: "16px"}}>{title ? title : PopularPosts}</h1>
            </div>
            {popular?.map((elem, i) => {
                return (
                    <Row  className='popular-image' key={i}>
                        <Col xs="3"  className='popular-number '>
                            <h4 className='theme-color'>{(i + 1) < 10 ? "0" : ""}{i + 1}</h4>
                        </Col>
                        <Col xs="9" className='popular-contain'>
                            <Link href={`${title ? `${url?"/event/":""}${elem?.slug}` : `/${elem?.slug}`}`} style={{color: "black"}}>
                                <h3>{elem?.name}</h3>
                            </Link>

                            {/*<p className='font-light mb-1'>*/}
                            {/*    <span>{elem.title}</span> {elem.in} <span>{elem.title1}</span>*/}
                            {/*</p>*/}
                            <div className='review-box'>
                                {/*                                 <span className='font-light eye-icon'>*/}
                                {/*  <Eye/>*/}
                                {/*                                     {randomViews[elem?.id]}*/}
                                {/*</span>*/}
                                <span className='font-light clock-time'>
                  <Clock/>
                                    {formatDate(elem?.created_at)}
                </span>

                            </div>
                        </Col>
                    </Row>
                );
            })}
            {/*{PopularPost.map((elem, i) => {*/}
            {/*    return (*/}
            {/*        <div className='popular-image' key={i}>*/}
            {/*            <div className='popular-number'>*/}
            {/*                <h4 className='theme-color'>{elem.no}</h4>*/}
            {/*            </div>*/}
            {/*            <div className='popular-contain'>*/}
            {/*                <h3>{elem.description}</h3>*/}
            {/*                <p className='font-light mb-1'>*/}
            {/*                    <span>{elem.title}</span> {elem.in} <span>{elem.title1}</span>*/}
            {/*                </p>*/}
            {/*                <div className='review-box'>*/}
            {/*    <span className='font-light clock-time'>*/}
            {/*      <Clock/>*/}
            {/*        {elem.time}*/}
            {/*    </span>*/}
            {/*                    <span className='font-light eye-icon'>*/}
            {/*      <Eye/>*/}
            {/*                        {elem.views}*/}
            {/*    </span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    );*/}
            {/*})}*/}
        </div>
    );
};

export default LeftPopularCard;
