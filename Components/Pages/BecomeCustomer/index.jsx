import React from 'react';
import {Col, Container, Row} from "reactstrap";
import LeftSide from "./LeftSide";
import RightSide from "./rightSide";

const BecomeCustomer = ({setIsLoading, loadError, isLoaded}) => {

    return (
        <section
            // className='breadcrumb-section section-b-space'
            className="section-b-space" style={{padding: "30px 0", backgroundColor: "white"}}>
            <Container>
                <Row>
                    <Col lg="8">
                        <LeftSide setIsLoading={setIsLoading} loadError={loadError} isLoaded={isLoaded}/>
                    </Col>
                    <Col lg="4">
                        <RightSide/>
                    </Col>
                </Row>

            </Container>
        </section>
    );
};

export default BecomeCustomer;