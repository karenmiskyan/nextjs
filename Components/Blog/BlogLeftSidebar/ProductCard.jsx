import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {CommonPath} from '../../Constant';
import Img from '../../Element/Images';
import {Eye} from "react-feather";

const ProductCard = ({currentData}) => {

    const [randomViews, setRandomViews] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: '2-digit'};
        return date.toLocaleDateString('en-US', options);
    };

    const truncateString = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
    };

    useEffect(() => {
        const newRandomViews = {};
        currentData?.forEach(elem => {
            newRandomViews[elem?.id] = generateRandomNumber();
        });
        setRandomViews(newRandomViews);
    }, [currentData]);

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    };

    return (
        <Row className='g-4'>
            {currentData
                ?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)) // Sort by created_at date
                ?.map((elem) => {
                return (
                    <Col lg='4' md='6' key={elem?.id}>
                        <Card className='blog-categority'>
                            <Link href={`/${elem?.slug}`} className='blog-img'>
                                <Img src={`${elem.image}`} alt={elem?.name} width="400" height="300" title={elem?.name} className='card-img-topbg-img bg-img'/>
                            </Link>
                            <CardBody>
                                {/*<h5>{elem.title}</h5>*/}
                                <Link href={`/${elem?.slug}`}>
                                    <h2 className='card-title'>{truncateString(elem?.name, 34)}</h2>
                                </Link>
                                <div className='blog-profile'>
                                    <div className='image-name'>
                                        <h3>
                                            <Eye size={19} style={{marginRight: "6px"}}/>
                                            {randomViews[elem?.id]}
                                        </h3>
                                        <h6>{formatDate(elem?.created_at)}</h6>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default ProductCard;
