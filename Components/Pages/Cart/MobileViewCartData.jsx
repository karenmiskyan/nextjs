import React from 'react';
import {Col, Input, Row} from 'reactstrap';

const MobileViewCartData = ({elem, removeProduct, handleQtyChange, quantity}) => {
    return (
        <td className="td-left-center">
            <div style={{display: "grid", rowGap: "8px"}}>
                <h3>{elem.product.name}</h3>
                <div><span className="font-light ml-1">Model</span> <span
                    className="font-bold ml-1"># UN55TU7000FXZA</span></div>
                <div><span className="font-light ml-1">Part Number</span> <span
                    className="font-bold ml-1"># 58422</span></div>
            </div>
            {/*<Row className='mobile-cart-content'>*/}
            {/*    <Col>*/}
            {/*        <div className='qty-box'>*/}
            {/*            <div className='input-group'>*/}
            {/*                <Input type='number' name='quantity' value={quantity} min={1}*/}
            {/*                       className='form-control input-number'*/}
            {/*                       onChange={(e) => handleQtyChange(e.target.value)}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
                {/*<Col>*/}
                {/*    <h2>{elem.price}</h2>*/}
                {/*</Col>*/}
                {/*<Col>*/}
                {/*    <h2 className='td-color'>*/}
                {/*        <a onClick={() => removeProduct(elem)}>*/}
                {/*            <i className='fas fa-times'></i>*/}
                {/*        </a>*/}
                {/*    </h2>*/}
                {/*</Col>*/}
            {/*</Row>*/}
        </td>
    );
};

export default MobileViewCartData;
