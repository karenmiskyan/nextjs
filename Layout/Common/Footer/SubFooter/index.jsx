import {Col} from 'reactstrap';
import {CommonPath, Weaccept} from '../../../../Components/Constant';
import Image from "next/image";

const SubFooter = () => {
    return (
        <Col md='6'>
            <ul>
                <li className='font-dark'>{Weaccept}</li>
                <li>
                    <Image src={`${CommonPath}/payment-icon-auth/1.png`} loading="lazy" width="37" height="30"
                           className='img-fluid' alt='visa'/>

                </li>
                <li>
                    <Image src={`${CommonPath}/payment-icon-auth/2.png`} loading="lazy" width="37" height="30"
                           className='img-fluid' alt='master'/>

                </li>
                <li>
                    <Image src={`${CommonPath}/payment-icon-auth/5.png`} loading="lazy" width="37" height="30"
                           className='img-fluid' alt='american express'/>

                </li>
                <li>
                    <Image src={`${CommonPath}/payment-icon-auth/4.png`} loading="lazy" width="37" height="30"
                           className='img-fluid' alt='paypal'/>
                </li>
            </ul>
        </Col>
    );
};
export default SubFooter;
