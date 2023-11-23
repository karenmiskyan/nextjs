import React from 'react';
import {Col, Container, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'


// fontawesome.library.add(faCirclePlus);
const MyQuickOrder = () => {
    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
        <Container>
            <Row>
                <h2 style={{marginBottom: "26px"}}>Quick Order</h2>
                <Col lg="12">
                    <Row style={{gridGap: '20px 0'}}>
                        <Col lg="12">
                            <h5>Start typing an KOA or model number or name to search for the products you wish to
                                order.</h5>
                        </Col>
                        <Col lg="12">
                            <Row style={{gridGap: '10px 0'}}>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row>
                                        <Col lg="1">
                                            <div className="quick-order-input">
                                                <h5>#</h5>
                                            </div>
                                        </Col>
                                        <Col lg="11">
                                            <input type="text" className="quick-order-input"
                                                   placeholder="Number of Order" name="number order"/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                        <Col lg="12">
                            <Row>
                                <Col lg="2">
                                    {/*<div>*/}
                                    {/*    <div className="plus-div">*/}
                                    {/*        <i className="fa fa-plus plus-border"></i>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}
                                    <div className='product-buttons' style={{margin:"0",maxWidth:'260px',width:"100%"}}>
                                        {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                        <a href='#javascript' id='cartEffect'
                                           className='btn btn-solid btn-transparent hover-solid btn-animation quick-order-button'>
                                            {/*<i className='fa fa-shopping-cart'></i>*/}

                                            <FontAwesomeIcon icon={faCirclePlus} className="fa-regular circle-plus"/>
                                            <span style={{color:"black"}}>Add More Fields</span>
                                        </a>
                                    </div>

                                </Col>
                                <Col lg="10">
                                    <div style={{display: "flex", justifyContent: "end"}}>

                                        <div className='product-buttons' style={{margin:"0 10px 0 0", maxWidth:'300px',width:"100%"}}>
                                            {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                            {/*<a id='cartEffect'*/}
                                            {/*   className='btn btn-solid btn-transparent hover-solid btn-animation quick-order-button'>*/}
                                            {/*    /!*<i className='fa fa-shopping-cart'></i>*!/*/}
                                            {/*    <span >Add items to project</span>*/}
                                            {/*</a>*/}
                                            <select className='form-select checkout-form form-control form-select-quick-order quick-order-button' id='validationCustom04'>
                                                <option>Add items to projec</option>
                                            </select>
                                        </div>

                                        <div className='product-buttons' style={{margin:"0 0 0 10px",maxWidth:'230px',width:"100%"}}>
                                            {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                            <a href='#javascript' id='cartEffect'
                                               className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                                <span>Add items to Cart</span>
                                            </a>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </section>
    );
};

export default MyQuickOrder;