import { Col } from 'reactstrap';
import { Address, Email, phone, mobileno, ActualAddress } from '../../../../Components/Constant';
import { LogoSvg } from '../../../../Data/SVG';
import Link from "next/link";

const ContactFooter = ({defImg}) => {
  return (
    <>
      <Col xl='3' lg='4' md='6'>
        <div className='footer-contact'>
          <div className='brand-logo'>
            <Link href='/' className='footer-logo'>
              <LogoSvg  defImg={defImg} />
            </Link>
          </div>
          <ul className='contact-lists'>
            <li>
              <span>
                <b>{phone}:</b>
                <span className='font-light'><a href={`tel:${mobileno}`} style={{color:"var(--theme-color)"}}>{mobileno}</a></span>
              </span>
            </li>
            <li>
              <span>
                <b>{Email}:</b>
                <span className='font-light'> <a href="mailto:info@koaedi.com" style={{color:"var(--theme-color)"}} className="text-lowercase">info@koaedi.com</a></span>
              </span>
            </li>
            <li>
              <span>
                <b>{Address}:</b>
                <span className='font-light'> {ActualAddress}</span>
              </span>
            </li>

          </ul>
        </div>
      </Col>
    </>
  );
};
export default ContactFooter;
