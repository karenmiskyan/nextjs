import React from 'react'
import {Col, Container, Row} from 'reactstrap'
import ContactForm from './ContactForm'
import ContactSidebar from './ContactSidebar'
import {CommonPath} from "../../Constant";

const ContactContain = () => {
    return (
        <section className="contact-section">
            <Container>
                <Row className="g-4">
                    <ContactForm/>
                    <Col>

                        <img src={`${CommonPath}/koa-contact-us.jpg`} className='img-fluid'
                             style={{borderRadius: "16px"}}
                             alt='contact-us'/>


                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ContactContain