import {Col, Form} from "reactstrap";
import React from "react";
import {selectAuth, toggleDivVisibility} from "../../../../ReduxToolkit/Slices/LoginSlice";
import {useDispatch, useSelector} from "react-redux";

const GetTouch = () => {
    let dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    return (
        <>
            {auth &&
                <Col xl="3" lg="4" sm="6" className="d-none d-sm-block">
                    <div className="footer-newsletter">
                        <h3>Join Our Community</h3>
                        <Form
                            className="form-newsletter needs-validation"
                            name="mc-embedded-subscribe-form"
                        >

                            <div className='product-buttons' style={{maxWidth: "240px", width: "100%"}}>
                                <div
                                    onClick={() => dispatch(toggleDivVisibility(true))}
                                    className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                    <span>BECOME A CUSTOMER</span>
                                </div>
                            </div>
                            <p className="font-dark mb-0" style={{textAlign: "left"}}>We are committed to providing our
                                customers with the best products
                                available. We verify all applications and once your business has been approved, you can
                                start
                                shopping. </p>
                        </Form>
                    </div>
                </Col>
            }
        </>

    );
};
export default GetTouch;
