import React from 'react';
import {Container, Row} from 'reactstrap';
import DetainTabSection from '../Common/DetailTabsection';
import RightSideContain from "../ProductLeftSidebarContain/RightsideContain";
import LeftSideContain from "../ProductLeftSidebarContain/LeftsideContain";
import {persistor} from "../../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";

const ProductRightSidebarContain = ({singleProduct}) => {

    return (
        <section style={{padding: "0"}}>
            <Container>
                <Row className='gx-4 gy-5'>
                    <RightSideContain singleProduct={singleProduct}/>
                    <PersistGate loading={null} persistor={persistor}>
                        <LeftSideContain singleProduct={singleProduct?.product}/>
                        <DetainTabSection singleProduct={singleProduct?.product}/>
                    </PersistGate>
                </Row>
            </Container>
        </section>
    );
};

export default ProductRightSidebarContain;
