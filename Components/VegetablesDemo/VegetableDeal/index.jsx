import React, {Fragment, useEffect, useState} from 'react';
import {Container, Row} from 'reactstrap';
import LeftSideDeal from './LeftSideDeal';
import RightSideDeal from './RightSideDeal';

const VegetableDeal = ({bannerData, elemclass, newOffer}) => {


    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    return (
        <section className={`ratio2_1 section-b-space ${elemclass}`}>
            <Container>
                <Row className='gy-3'>
                    <Fragment>
                        <LeftSideDeal elem={newOffer[0]} defImg={defImg}/>
                        <RightSideDeal elem={newOffer[1]} defImg={defImg}/>
                    </Fragment>
                </Row>
            </Container>
        </section>
    );
};
export default VegetableDeal;
