import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import {JustForYou, NewArrival} from "../../Constant";
import SectionHeader from "../../Element/SectionHeader";
import VRSliders from "./VRSlider";

const ElectronicVR = ({productData, title, addToCart}) => {

    // const FilterVrProduct = productData.filter((el) => el.type === "electronic")
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    return (
        <section className="ratio_asos" >
            <Container fluid={true}>
                <Row>
                    <Col>
                        <SectionHeader title={title ? title : NewArrival} subTitle={title ? title : NewArrival}/>
                        <VRSliders FilterVrProduct={productData} addToCart={addToCart}  defImg={defImg} />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default ElectronicVR;