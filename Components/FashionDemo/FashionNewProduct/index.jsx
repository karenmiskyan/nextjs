import { Col, Container, Row } from "reactstrap";
import { NewArrival, OurCollection } from "../../Constant";
import SectionHeader from "../../Element/SectionHeader";
import NewProductCard from "./NewProductCard";
const FashionNewProduct = ({ productData }) => {
    return (
        <section className="ratio_asos">
            <Container>
                <Row className="m-0">
                    <Col sm="12" className="p-0">
                        <SectionHeader title={NewArrival} subTitle={OurCollection} />
                        <Row className="product-wrapper product-style-2 g-sm-4 g-3">
                            <NewProductCard productData={productData} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default FashionNewProduct