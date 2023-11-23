import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import CenterImage from './CenterImage';
import CommentDetails from './CommentDetails';
import FormatDetails from './FormatDetails';
import LeftSidebar from './LeftSidebar';

const BlogDetails = ({post, blogsPopular,two}) => {
  // const { blogdata } = useSelector((state) => state.BlogReducer);
  // const DetailFilter = blogdata.filter((el) => el.type === 'blogDetails');
  return (
    <section className='masonary-blog-section pt-0' >
      <Container>
        <Row className='g-4'>
          <Col xl='9' md='8' className='order-md-1 ratio_square'>
            <Row className='g-4'>
              {/*{DetailFilter.map((elem, i) => {*/}
              {/*  return (*/}
                  <Col xs='12' >
                    <div className='blog-details'>
                      <CenterImage elem={post?.data} />
                      <FormatDetails elem={post?.data} />
                    </div>
                    {/*<CommentDetails elem={post} />*/}
                  </Col>
              {/*  );*/}
              {/*})}*/}
            </Row>
          </Col>
          <LeftSidebar popular={blogsPopular?.data} title="Events" two={two?.data}/>
        </Row>
      </Container>
    </section>
  );
};

export default BlogDetails;
