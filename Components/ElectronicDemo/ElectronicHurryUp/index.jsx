import React, {useEffect, useState} from 'react';
import { Container, Row } from 'reactstrap';
import { HurryUp, SpecialOffer } from '../../Constant';
import SectionHeader from '../../Element/SectionHeader';
import TabNavBar from './TabNavBar';
const ElectronicHurryUp = ({ tabSection }) => {
  const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
  useEffect(() => {
    setDefImg("");
  }, []);
  return (
    <section className='tab-section'>
      <Container>
        <Row>
          <div className='col'>
            <SectionHeader title={SpecialOffer} subTitle={SpecialOffer} />
            <div className='tab-wrap'>
              <TabNavBar TabFilter={tabSection} defImg={defImg}/>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};
export default ElectronicHurryUp;
