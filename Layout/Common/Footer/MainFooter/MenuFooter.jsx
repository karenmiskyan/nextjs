import Link from 'next/link';
import {Col} from 'reactstrap';

const MenuFooter = ({footerLeft, footerCenter, footerRight}) => {


    return (
        <>

            <Col xl='2' lg='3' md='4' sm='6'>
                <div className='footer-links'>
                    <div className='footer-title'
                    >
                        <h3>Pages</h3>
                    </div>
                    <div className={`footer-content d-sm-block`}
                    >
                        <ul>
                            {footerLeft !== undefined && footerLeft[0]?.menu_nodes?.map((menu) => {
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
            <Col xl='2' lg='3' md='4' sm='6'>
                <div className='footer-links'>
                    <div className='footer-title'
                    >
                        <h3>New Categories</h3>
                    </div>
                    <div className={`footer-content d-sm-block`}
                    >
                        <ul>
                            {footerCenter !== undefined && footerCenter[0]?.menu_nodes?.map((menu) => {

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
            <Col xl='2' lg='3' md='4' sm='6'>
                <div className='footer-links'>
                    <div className='footer-title'
                    >
                        <h3>Get Help</h3>
                    </div>
                    <div className={`footer-content d-sm-block`}
                    >
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
