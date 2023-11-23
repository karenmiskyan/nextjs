import React from 'react';
import {Col, Container, Row} from "reactstrap";

const PagesSection = ({page}) => {
    return (
        <section className='section-b-space' style={{backgroundColor: "white"}}>
            <Container>
                <Row className="g-3">
                    <Col xs="12"><h1 style={{marginBottom:"10px", fontSize:"calc(22px + 6 * (100vw - 320px) / 1600)"}}>{page.name}</h1></Col>
                    <Col  dangerouslySetInnerHTML={{__html: page.content}}/>
                </Row>
            </Container>
        </section>
    );
};

export default PagesSection;