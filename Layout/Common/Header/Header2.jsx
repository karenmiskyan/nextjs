import React from 'react';
import { Col, Row } from 'reactstrap';
import { useHeaderScroll } from '../../../Utils/HeaderScroll';
import AllCategories from '../../Element/AllCategories';
import HeadingLogo from '../../Element/HeadingLogo';
import NavBar from '../../Element/NavBar';
import RightHeader from '../../Element/RightHeader';
import SearchBarToggle from '../../Element/SearchBarToggle';

const Header2 = ({ noStyle, isCategories, icon, customClass }) => {
  const UpScroll = useHeaderScroll(false);
  return (
    <header className={`${!noStyle ? `${UpScroll ? 'nav-down nav-up' : ''}` : ''}`} id='home'>
      <div className='header-style-3'>
        <div className='main-header navbar-searchbar'>
          <div className='container-fluid-lg'>
            <Row>
              <Col lg='12'>
                <div className='main-menu common-menu'>
                  <div className='top-header top-comman-header text-center ms-0'>
                    <HeadingLogo />
                  </div>
                  <div className='menu-left'>
                    <AllCategories isCategories={isCategories} />
                  </div>
                  <nav className='navigationbar'>
                    <NavBar customClass={customClass} />
                  </nav>
                  <RightHeader icon={icon} />
                  <SearchBarToggle />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header2;
