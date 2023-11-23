import React from 'react';
import { Container, Row } from 'reactstrap';
import DetainTabSection from '../Common/DetailTabsection';
import LeftSideContain from './LeftsideContain';
import RightSideContain from './RightsideContain';

const ProductVideoThumbnailContain = ({ VideoPlay, productData }) => {
  return (
    <section>
      <Container>
        <Row className='gx-4 gy-5'>
          <LeftSideContain productData={productData} />
          <RightSideContain VideoPlay={VideoPlay} />
          <DetainTabSection />
        </Row>
      </Container>
    </section>
  );
};

export default ProductVideoThumbnailContain;
