import React, {useEffect, useState} from 'react';
import {Container, Row} from "reactstrap";
import SectionHeader from "../../Element/SectionHeader";
import {ShopByCategory, TopBrands} from "../../Constant";
import FashionPopularCard from "./FashionPopularCards";

const Index = ({popularCard}) => {
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    return (
        <section className="product-slider overflow-hidden" style={{backgroundColor: "#eff2f7"}}>
            <div>
                <Container>
                    {/*<SectionHeader title={ShopByCategory} subTitle={ShopByCategory}/>*/}
                    <div
                        className={`${"" ? 'title title-2 text-lg-start text-md-center' : 'title title-2 text-center'}`}>
                        <h1 style={{fontSize: "calc(22px + 6 * (100vw - 320px) / 1600)"}}>{ShopByCategory}</h1>
                        <div className="text-div-after-h">
                            <div className="text-div-after-h-red"/>
                        </div>
                        {/*<h5 className="text-color">{subTitle}</h5>*/}
                    </div>
                    <Row>
                        <FashionPopularCard popularCard={popularCard} defImg={defImg}/>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default Index;