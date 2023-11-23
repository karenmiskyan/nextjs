import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {OrderSuccessSvg} from '../../../Data/SVG';
import {OrderSuccess, PaymentDescription, TransactionID} from '../../Constant';
import {useRouter} from "next/router";

const TopSection = ({token}) => {
    let router = useRouter();
    return (
        <section className='pt-0 pb-0'>
            <Container fluid={true}>
                <Row>
                    <Col xs='12' className='p-0'>
                        <div className='success-icon'>
                            <div className='main-container'>
                                <div className='check-container'>
                                    <div className='check-background'>
                                        <OrderSuccessSvg/>
                                    </div>
                                    <div className='check-shadow'></div>
                                </div>
                            </div>

                            <div className='success-contain'>
                                <h4>{OrderSuccess}</h4>
                                <h5 className='font-light'>{PaymentDescription}</h5>
                                <h6 className='font-light'>Order ID: {token}</h6>
                                <div className='product-buttons' style={{margin: "14px auto 0", maxWidth: "200px"}}>
                                    <a onClick={() => router.push('/shop')}
                                       className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                        <span>Continue Shopping</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TopSection;
