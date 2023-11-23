import React from 'react';
import {Col, Row} from 'reactstrap';
import {CommonPath} from '../../Constant';
import AddToCartProduct from '../../Element/AddToCart';
import AddToWishList from '../../Element/AddToWishList';
import CompareProducts from '../../Element/CompareProducts';
import ModelViewProduct from '../../Element/ModelViewProduct';

const SliderCard = ({elem}) => {
    const staticActions = true;

    let fixMaxCount = 3;
    return (
        <div>
            <Row className='g-3'>
                {/*{elem.children.slice(0, 4).map((item, i) => {*/}
                {/*  return (*/}
                {/*    <Col lg='12' md='6' xs='12' key={i}>*/}
                {/*      <div className='product-image'>*/}
                {/*        <a>*/}
                {/*          <img src={`${CommonPath}/${item.image}`} alt='furniture' />*/}
                {/*        </a>*/}

                {/*        /!*<div className='product-details'>*!/*/}
                {/*        /!*  <a>*!/*/}
                {/*        /!*    <h6 className='font-light'>{item.description}</h6>*!/*/}
                {/*        /!*    <h3>{item.productName}</h3>*!/*/}
                {/*        /!*    <h4 className='font-light mt-1'>*!/*/}
                {/*        /!*      <del>${item.mrp}</del> <span className='theme-color'>${item.price}</span>*!/*/}
                {/*        /!*    </h4>*!/*/}
                {/*        /!*  </a>*!/*/}
                {/*        /!*  <div className='cart-wrap'>*!/*/}
                {/*        /!*    <ul>*!/*/}
                {/*        /!*      <AddToCartProduct elem={elem} staticActions={staticActions} />*!/*/}
                {/*        /!*      <CompareProducts elem={elem} staticActions={staticActions} />*!/*/}
                {/*        /!*      <AddToWishList elem={elem} staticActions={staticActions} />*!/*/}
                {/*        /!*    </ul>*!/*/}
                {/*        /!*  </div>*!/*/}
                {/*        /!*</div>*!/*/}
                {/*      </div>*/}
                {/*    </Col>*/}
                {/*  );*/}
                {/*})}*/}
                {/*{*/}

                {/*    [...Array(Math.ceil(elem.children.length / fixMaxCount))].map((c, countIndex) => {*/}

                {/*        let indexOfLastEl = (countIndex + 1) * fixMaxCount;*/}
                {/*        let indexOfFirstEl = indexOfLastEl - fixMaxCount;*/}

                {/*        let currentEl = elem.children.slice(indexOfFirstEl, indexOfLastEl)*/}


                {/*        return (*/}
                {/*            <Col lg='12' md='6' xs='12'>*/}
                {/*                <div className='product-image'>*/}
                {/*                    {*/}
                {/*                        currentEl.map((el, makeIndex) => {*/}
                {/*                            return (*/}

                {/*                                <a>*/}
                {/*                                    <img src={`${CommonPath}/${el.image}`} alt='furniture'/>*/}
                {/*                                </a>*/}


                {/*                            )*/}
                {/*                        })*/}
                {/*                    }*/}
                {/*                </div>*/}
                {/*            </Col>*/}

                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </Row>
        </div>
    );
};

export default SliderCard;
