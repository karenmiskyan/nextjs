import React from 'react';
import {Col, Container, Row, Table} from 'reactstrap';
import {APICallUrl, APIImage,OrderDetail} from '../../Constant';
import OrderSummary from './OrderSummary';

const OrderDetails = ({details}) => {


    return (
        <section className='section-b-space cart-section order-details-table pb-0' style={{backgroundColor: "white",marginBottom: "80px"}}>
            <Container>
                <div className='title title1 title-effect mb-1 title-left'>
                    <h2 className='mb-3'>{OrderDetail}</h2>
                </div>
                <Row className='g-4'>
                    <Col md='6'>
                        <Col sm='12'>
                                    {
                                        details?.products?.map((el, i) => {
                                            return (

                                                <Row className='table-order g-3 justify-content-center' key={i}>

                                                    <Col lg="3" sm='6'  xs="8" className="text-align-left">
                                                        {/*<a href='#javascript'>*/}
                                                        <img src={`${APIImage}/${el?.product_image}`}
                                                             title={el?.product_name} alt={el?.product_name}
                                                             className='img-fluid'/>
                                                        {/*</a>*/}
                                                    </Col>
                                                    <Col lg="5" >
                                                        <p>Product Name</p>
                                                        <h5>{el?.product_name}</h5>
                                                    </Col>
                                                    <Col lg="2"  md="6" >
                                                        <p>Quantity</p>
                                                        <h5>{el?.qty}</h5>
                                                    </Col>
                                                    <Col lg="2"  md="6">
                                                        <p>Price</p>
                                                        <h5>${el?.price}</h5>
                                                    </Col>
                                                </Row>


                                            )
                                        })
                                    }

                        </Col>
                    </Col>
                    <OrderSummary details={details}/>
                </Row>
            </Container>
        </section>
    );
};

export default OrderDetails;
