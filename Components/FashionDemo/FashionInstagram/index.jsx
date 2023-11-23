import { Col, Container, Row } from 'reactstrap';
import { InstagramShop, NewCollection } from '../../Constant';
import SectionHeader from '../../Element/SectionHeader';
import ShopData from './ShopData';
const FashionInstagram = ({ bannerData }) => {
  return (
    <section className='ratio_square'>
      <Container fluid={true}>
        <Row>
          <Col>
            <SectionHeader title={InstagramShop} subTitle={NewCollection} />
            <div className='product-style-1 instagram-2 product-wrapper'>
              <div className='insta-slider instagram-wrap'>
                <ShopData bannerData={bannerData} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default FashionInstagram;
