import React, {useEffect, useState} from 'react';
import { Col, Modal, ModalBody, Row} from "reactstrap";
import {Btn} from "../../AbstractElements";
import {UserDashboardData} from '../../../Data/UserDashboardData';
import {APICallUrl, CommonPath} from '../../Constant';
import AccountInformation from './AccountInformation';
import {useSelector} from "react-redux";
import {selectLoginToken, setUser} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Backdrop, CircularProgress} from "@mui/material";
import AddressEditForm from "./AddressEditForm";
import {toast} from "react-toastify";
import GooglePlacesAutocomplete from "../Checkout/GooglePlacesAutocomplete";

const DashBoardContain = ({address,address2, isLoaded, loadError}) => {
    const DashboardFilter = UserDashboardData.filter((el) => el.type === 'Edit Address');

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className='dashboard-right'>
            <div className='dashboard'>
                <div className='box-account box-info mt-0'>
                    <div className='box address-box mt-0'>
                        <div className='box-head '>
                            {/*  <h4>{elem.head3}</h4>*/}
                            <h2 className="">Edit Address</h2>
                            {/*  <a href='#javascript'>{elem.subhead}</a>*/}
                        </div>
                        <div className='box-content'>
                            <Row className='row g-4'>
                                <Col sm='6'>
                                    <h4>Billing Address</h4>
                                    <h6 className='font-light'>{address?.name}</h6>
                                    <h6 className='font-light'>{address?.phone}</h6>
                                    <h6 className='font-light'>{address?.state_name}</h6>
                                    <h6 className='font-light'>{address?.city_name}</h6>
                                    <h6 className='font-light'>{address?.state_name}</h6>
                                    <h6 className='font-light'>{address?.address}</h6>
                                    <h6 className='font-light'>{address?.zip_code}</h6>

                                    <div className='product-buttons mt-3'
                                         style={{flexDirection: "column", width: "80px"}}>
                                        <button className='btn btn-solid hover-solid btn-animation'
                                                style={{fontSize: "14px", padding: "2px 4px"}}
                                                onClick={() => setShowModal(true)}>Edit
                                        </button>
                                    </div>
                                </Col>
                                <Col sm='6'>
                                    <h4>Shipping Address</h4>
                                    <h6 className='font-light'>{address2?.name}</h6>
                                    <h6 className='font-light'>{address2?.phone}</h6>
                                    <h6 className='font-light'>{address2?.state_name}</h6>
                                    <h6 className='font-light'>{address2?.city_name}</h6>
                                    <h6 className='font-light'>{address2?.state_name}</h6>
                                    <h6 className='font-light'>{address2?.address}</h6>
                                    <h6 className='font-light'>{address2?.zip_code}</h6>
                                    <div className='product-buttons mt-3'
                                         style={{flexDirection: "column", width: "80px"}}>
                                        <button className='btn btn-solid hover-solid btn-animation'
                                                style={{fontSize: "14px", padding: "2px 4px"}}
                                                onClick={() => setShowModal2(true)}>Edit
                                        </button>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                    </div>

                </div>
            </div>
            <Modal scrollable={true}
                   zIndex={1400}
                   size='lg'
                   toggle={() => {
                       setShowModal(!showModal);
                       // setOrder({});
                   }}
                   isOpen={showModal}>
                <ModalBody>
                    <Btn
                        style={{
                            background: "none",
                            fontSize: "18px",
                            overflow: "visible",
                            position: "absolute",
                            top: "12px",
                            right: "18px"
                        }}
                        attrBtn={{
                            type: 'button',
                            className: 'btn-close d-block p-0',
                            onClick: () => {
                                setShowModal(false);
                                // setOrder({});
                            },
                        }}>
                        <i className='fas fa-times'
                           style={{color: "var(--theme-color)"}}></i>
                    </Btn>
                    <AddressEditForm info={address} title="Billing"
                                     setShowModal={setShowModal}
                                     setLoading={setLoading} loadError={loadError} isLoaded={isLoaded}/>
                    {loading && (
                        <Backdrop sx={{
                            // position:"absolute",
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 5000,
                            backgroundColor: "rgba(255, 255, 255, 0.3)"
                        }} open>
                            <CircularProgress color="primary"/>
                        </Backdrop>
                    )}
                </ModalBody>
            </Modal>
            <Modal scrollable={true}
                   zIndex={1400}
                   size='lg'
                   toggle={() => {
                       setShowModal2(!showModal2);
                       // setOrder({});
                   }}
                   isOpen={showModal2}>
                <ModalBody>
                    <Btn
                        style={{
                            background: "none",
                            fontSize: "18px",
                            overflow: "visible",
                            position: "absolute",
                            top: "12px",
                            right: "18px"
                        }}
                        attrBtn={{
                            type: 'button',
                            className: 'btn-close d-block p-0',
                            onClick: () => {
                                setShowModal2(false);
                                // setOrder({});
                            },
                        }}>
                        <i className='fas fa-times'
                           style={{color: "var(--theme-color)"}}></i>
                    </Btn>
                    <AddressEditForm title="Shipping"
                        info={address2} setShowModal={setShowModal2}
                        setLoading={setLoading} loadError={loadError} isLoaded={isLoaded}/>

                    {loading && (
                        <Backdrop sx={{
                            // position:"absolute",
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 5000,
                            backgroundColor: "rgba(255, 255, 255, 0.3)"
                        }} open>
                            <CircularProgress color="primary"/>
                        </Backdrop>
                    )}
                </ModalBody>
            </Modal>
        </div>
    );
};

export default DashBoardContain;
