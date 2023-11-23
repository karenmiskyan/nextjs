import React from 'react'
import Slider from 'react-slick'
import { Col, Container, Row } from 'reactstrap';
import { FlowerBrandData } from '../../../Data/FlowerBrand';
import { FlowerBrandSlider } from '../../../Data/SliderSettingsData';

const FlowerBrand = () => {
    return (
        <section className="section-b-space">
            <Container>
                <Row>
                    <Col>
                        <div className="brand-slider">
                            <Slider {...FlowerBrandSlider}>
                                {
                                    FlowerBrandData.map((elem) => {
                                        return (
                                            <div key={elem.id}>
                                                <div className="brand-image">
                                                    <img src={elem.img} className="img-fluid"
                                                        alt="brand logo" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default FlowerBrand