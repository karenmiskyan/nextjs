import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { BackHomePage, CommonPath, pagedescription, pagenotfound } from '../../Constant';
import {TbError404} from "react-icons/tb";

const SectionSvg = () => {
  return (
    <section className='page-not-found section-b-space' style={{backgroundColor:"white"}}>
      <Container>
        <Row className='gx-md-2 gx-0 gy-md-0 gy-3'>
          <Col md='8' className='m-auto'>
            <div className='page-image'>
              {/*<img src={`${CommonPath}/inner-page/404.png`} className='img-fluid' alt='no page found' />*/}
              <TbError404 size={150} style={{color:"var(--theme-color)"}}/>
            </div>
          </Col>

          <Col md='8' className='mx-auto mt-md-5 mt-3'>
            <div className='page-container pass-forgot'>
              <div>
                <h1 style={{fontSize:"calc(25px + 10 * (100vw - 320px) / 1600)",marginBottom:"calc(15px + 5 * (100vw - 320px) / 1600)"}}>{pagenotfound}</h1>
                <p>{pagedescription}</p>
                <Link href={'/shop'} style={{color:"white"}} className='btn btn-solid-default fw-bold'>
                  To Shop Page
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SectionSvg;
