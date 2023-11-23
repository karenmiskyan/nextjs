import React from 'react';
import {Col, Row, Table} from 'reactstrap';
import {
    expecteddate,
    paymentmethod,
    shippingaddress,
    summery,
} from '../../Constant';
import {useRouter} from "next/router";

const OrderSummary = ({details}) => {
    let router = useRouter();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString(undefined, options);
    };



    return (
        <Col md='6'>
            <div className='order-success'>
                <Row className='g-4'>
                    <Col sm='6'>
                        <h4>{summery}</h4>
                        <ul className='order-details'>
                            <li>Order ID: {details?.code}</li>
                            <li>Order Date: {formatDate(details?.created_at)}</li>
                            <li>Order Total:
                                ${(Number(details?.sub_total) + Number(details?.shipping_amount) + Number(details?.tax_amount)).toFixed(2)}</li>
                        </ul>
                    </Col>

                    <Col sm='6'>
                        <h4>{shippingaddress}</h4>
                        <ul className='order-details'>
                            <li>{details?.address?.city}</li>
                            <li>{details?.address?.address}</li>
                            <li>Contact No. {details?.address?.phone}</li>
                        </ul>
                    </Col>

                    <Col xs='12'>
                        <div className='payment-mode'>
                            <h4>{paymentmethod}</h4>
                            <p>{details?.payment?.payment_channel?.value}</p>
                        </div>
                    </Col>

                    <Col md='12'>
                        <div className='delivery-sec'>
                            <h3>
                                {expecteddate} <span>{formatDate(details?.created_at)}</span>
                            </h3>
                            {/*<Link href={`/page/order_tracking`}>{trackorder}</Link>*/}
                        </div>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <Table className='cart-table table-borderless'>
                            {/*<tbody>*/}
                            {/*</tbody>*/}
                            <tfoot>
                            <tr className='table-order'>
                                <td colSpan='3'>
                                    <h5 className='font-light'>Subtotal :</h5>
                                </td>
                                <td>
                                    <h4>${details?.sub_total}</h4>
                                </td>
                            </tr>

                            <tr className='table-order'>
                                <td colSpan='3'>
                                    <h5 className='font-light'>Shipping :</h5>
                                </td>
                                <td>
                                    <h4>${details?.shipping_amount}</h4>
                                </td>
                            </tr>

                            <tr className='table-order'>
                                <td colSpan='3'>
                                    <h5 className='font-light'>Tax(GST) :</h5>
                                </td>
                                <td>
                                    <h4>${details?.tax_amount}</h4>
                                </td>
                            </tr>

                            <tr className='table-order'>
                                <td colSpan='3'>
                                    <h4 className='theme-color fw-bold'>Total Price :</h4>
                                </td>
                                <td>
                                    <h4 className='theme-color fw-bold'>${(Number(details?.sub_total) + Number(details?.shipping_amount) + Number(details?.tax_amount)).toFixed(2)}</h4>
                                </td>
                            </tr>
                            </tfoot>

                        </Table>
                        <div className='product-buttons' style={{margin: "14px auto 0", maxWidth: "200px"}}>
                            <a onClick={() => router.push('/shop')}
                               className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                <span>Continue Shopping</span>
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    );
};

export default OrderSummary;
