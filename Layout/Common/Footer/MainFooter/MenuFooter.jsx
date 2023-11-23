import Link from 'next/link';
import { useState } from 'react';
import { Col } from 'reactstrap';

const MenuFooter = ({ getFooter,footerLeft,footerCenter,footerRight }) => {
  const [isActive, setIsActive] = useState('0');
  const onHandleChange = (id) => {
    setIsActive(id);
  };
  return (
    <>
      {/*{getFooter.map((elem, id) => {*/}
      {/*  return (*/}
          <Col xl='2' lg='3' md='4' sm='6' >
            <div className='footer-links'>
              <div className='footer-title'
                   // onClick={() => onHandleChange(id)}
              >
                <h3>Pages</h3>
              </div>
              <div className={`footer-content d-sm-block`}
              >
                {/*${isActive == id ? 'd-block' : ' d-none'}*/}
                <ul>
                  { footerLeft !== undefined && footerLeft[0]?.menu_nodes?.map((menu) => {
                    return (
                      <li key={menu.id}>
                        <Link href={menu.url} className='font-dark'>{menu.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Col>
      <Col xl='2' lg='3' md='4' sm='6' >
        <div className='footer-links'>
          <div className='footer-title'
              // onClick={() => onHandleChange(id)}
          >
            <h3>New Categories</h3>
          </div>
          <div className={`footer-content d-sm-block`}
          >
            {/*${isActive == id ? 'd-block' : ' d-none'}*/}
            <ul>
              { footerCenter !== undefined && footerCenter[0]?.menu_nodes?.map((menu) => {

                return (
                    <li key={menu.id}>
                      <Link href={menu.url} className='font-dark'>{menu.title}</Link>
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Col>
      <Col xl='2' lg='3' md='4' sm='6' >
        <div className='footer-links'>
          <div className='footer-title'
              // onClick={() => onHandleChange(id)}
          >
            <h3>Get Help</h3>
          </div>
          <div className={`footer-content d-sm-block`}
          >
            {/*${isActive == id ? 'd-block' : ' d-none'}*/}
            <ul>
              {footerRight !== undefined && footerRight[0]?.menu_nodes?.map((menu) => {
                return (
                    <li key={menu.id}>
                      <Link href={menu.url} className='font-dark'>{menu.title}</Link>
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Col>
    </>
  );
};
export default MenuFooter;
