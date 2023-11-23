import React from 'react';
import { Container, Row } from 'reactstrap';
import DetainTabSection from '../Common/DetailTabsection';
import NotificationModal from '../Common/NotificationModal';
import LeftSideContain from './LeftsideContain';
import RightSideContain from './RightsideContain';

const ProductLeftSidebarContain = ({ productData }) => {
  return (
    <>
      <section>
        <Container>
          <Row className='gx-4 gy-5'>
            <LeftSideContain productData={productData} />
            <RightSideContain />
            <DetainTabSection />
          </Row>
        </Container>
      </section>
      <NotificationModal />
    </>
  );
};

export default ProductLeftSidebarContain;
