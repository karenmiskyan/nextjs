import Link from 'next/link';
import { Col } from 'reactstrap';
import { CommonPath, Weaccept } from '../../../../Components/Constant';

const SubFooter = () => {
  return (
    <Col md='6'>
      <ul>
        <li className='font-dark'>{Weaccept}</li>
        <li>
            <img src={`${CommonPath}/payment-icon-auth/1.png`} width="37" className='img-fluid' alt='visa' />

        </li>
        <li>
            <img src={`${CommonPath}/payment-icon-auth/2.png`} width="37" className='img-fluid' alt='master' />

        </li>
        <li>
            <img src={`${CommonPath}/payment-icon-auth/5.png`}  width="37" className='img-fluid' alt='american express' />

        </li>
        <li>
            <img src={`${CommonPath}/payment-icon-auth/4.png`} width="37" className='img-fluid' alt='paypal' />
        </li>
      </ul>
    </Col>
  );
};
export default SubFooter;
