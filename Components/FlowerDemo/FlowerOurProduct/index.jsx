import React from "react";
import { Col, Container, Row } from "reactstrap";
import { JustForYou, OurProduct } from "../../Constant";
import SectionHeader from "../../Element/SectionHeader";
import MostPopular from "./MostPopular";
import FlowerProductRight from "./FlowerProductRight";

const FlowerOurProduct = ({ productData }) => {
    return (
        <section>
            <Container>
                <Row className="gy-lg-0 gy-5">
                    <Col lg="8">
                        <SectionHeader title={OurProduct} subTitle={JustForYou} />
                        <FlowerProductRight productData={productData} />
                    </Col>
                    <MostPopular productData={productData} />

                </Row>
            </Container>
        </section>
    )
}
export default FlowerOurProduct;