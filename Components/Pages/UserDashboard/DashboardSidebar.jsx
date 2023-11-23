import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import UserNav from './UserNav';

const DashboardSidebar = ({isLoaded, loadError}) => {
  return (
    <Fragment>
      <section className='section-b-space' style={{backgroundColor:"white"}}>
        <Container>
          <Row>
            <UserNav loadError={loadError} isLoaded={isLoaded}/>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default DashboardSidebar;
