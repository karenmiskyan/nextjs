import React from 'react';
import {Col, Row} from 'reactstrap';
import AutoFadeSlider from '../Common/AutoFadeSlider';
import ProductDetails from '../ProductBundle/ProductDetails';
import {persistor} from "../../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";

const RightSideContain = ({singleProduct}) => {

    return (
        <Col md="7" lg='7' xl="9">
            <div className='details-items'>
                <Row className='g-4'>
                    <Col md='12' lg="12" xl="6">
                        <AutoFadeSlider singleProduct={singleProduct?.product}/>
                    </Col>

                    <Col md='12' lg="12" xl="6">
                        <PersistGate loading={null} persistor={persistor}>
                            <ProductDetails singleProduct={singleProduct?.product}/>
                        </PersistGate>
                    </Col>
                </Row>
            </div>
        </Col>
    );
};

export default RightSideContain;
