import React from 'react';
import { Col } from 'reactstrap';
import LeftCategory from './LeftCategory';
import LeftPopularCard from './LeftPopularCard';
import LeftSearch from './LeftSearch';

const LeftSidebar = ({popular, title, two}) => {

  return (
    <Col lg='3' md='4'>
      <div className='left-side'>
        {/*<LeftSearch />*/}
          <LeftPopularCard popular={popular} title={title} url={true}/>
          {
              two &&
              <LeftPopularCard popular={two} two={two}/>
          }
        {/*<LeftCategory />*/}
      </div>
    </Col>
  );
};

export default LeftSidebar;
