import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { getAllUsers } from '../../../Service/FetchApi';
import BlogCards from './BlogCards';
import PaginationSidebar from './PaginationSidebar';

const BlogNoSidebarContain = () => {
  const dispatch = useDispatch();
  const types = 'GETBLOGDATA';
  const { Blogdatanew } = useSelector((state) => state.BlogReducer);
  useEffect(() => {
    !Blogdatanew && dispatch(getAllUsers('blog', types));
  }, []);
  const BlogDataFilter = Blogdatanew && Blogdatanew.filter((el) => el.type === 'blogcard');
  return (
    <section className='left-sidebar-section masonary-blog-section section-b-space'>
      <Container>
        <Row className='g-4'>
          <Col xs='12' className='ratio3_2'>
            <BlogCards BlogDataFilter={BlogDataFilter} />
            <PaginationSidebar />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogNoSidebarContain;
