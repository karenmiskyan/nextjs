import React, {useEffect, useState} from 'react'
import { Container, Row } from 'reactstrap';
import PopularCard from './PopularCards';
import SectionHeader from "../../Element/SectionHeader";
import { TopBrands} from "../../Constant";
const FurnitureSlider = ({ brands }) => {

    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    return (
        <section className="product-slider overflow-hidden" style={{paddingBottom:"80px"}}>
            <div>
                <Container>
                    <SectionHeader title={TopBrands} subTitle={TopBrands} />
                    <Row>
                        <PopularCard brands={brands}  defImg={defImg} />
                    </Row>
                </Container>
            </div>
        </section>
    )
}

export default FurnitureSlider