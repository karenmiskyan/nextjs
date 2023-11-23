import { Col, Container, Row } from 'reactstrap';
import { OurCategory, OurCollection } from '../../Constant';
import OurCategoryTop from '../../Element/OurCategory';
import SectionHeader from '../../Element/SectionHeader';
import CategoryCard from './CategoryCard';
import RowCategory from './RowCategory';
const FashionCategory = ({ categoryBanner }) => {
  return (
    <section className='category-section ratio_40'>
      <Container fluid={true}>
        <Row>
          <Col lg='12'>
            <SectionHeader title={OurCategory} subTitle={OurCollection} />
          </Col>
        </Row>
        <RowCategory categoryBanner={categoryBanner} />
      </Container>
    </section>
  );
};
export default FashionCategory;
