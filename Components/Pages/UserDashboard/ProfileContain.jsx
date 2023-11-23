import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UserDashboardData} from '../../../Data/UserDashboardData';
import LoginDetail from './LoginDetail';
import {Button, Col, Modal, ModalBody, Row} from "reactstrap";
import {Btn} from "../../AbstractElements";
import {APICallUrl} from "../../Constant";
import AccountEditForm from "./AccountEditForm";
import {selectAuthUser} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Backdrop, CircularProgress} from "@mui/material";

const ProfileContain = ({user}) => {
    const dispatch = useDispatch();
    const ProfileFilter = UserDashboardData.filter((el) => el.type === 'Edit Account');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const openProfileModal = () => {
        dispatch({type: 'ISPROFILEMODAL'});
    };

    return (
        <Fragment>
            {/*{ProfileFilter.map((item, i) => {*/}
            {/*    return (*/}
            {/*        <Fragment key={i}>*/}
                        <div className='box-head'>
                            <h2>Edit Account</h2>
                        </div>
                        <Row>
                            <Col lg="6">
                                <ul className='dash-profile'>
                                    {/*{item.tabs.map((result) => {*/}
                                    {/*    return (*/}
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Full Name</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.name}</h6>
                                        </div>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <div className='left'>*/}
                                    {/*        <h6 className='font-light'>Last Name</h6>*/}
                                    {/*    </div>*/}
                                    {/*    <div className='right'>*/}
                                    {/*        <h6>{user?.last_name}</h6>*/}
                                    {/*    </div>*/}
                                    {/*</li>*/}
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Email Address</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.email}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Company Name</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.company_name}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Company Type</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.company_type}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Company Tax ID</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.company_tax_id}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Resale License</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.license_number}</h6>
                                        </div>
                                    </li>

                                </ul>
                            </Col>

                            <Col lg="6">
                                <ul className='dash-profile'>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'># of Employees</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.employees_number}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Years In Business</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.business_years}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Average Project Size</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.project_size}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Annual Sale</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.annual_sale}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Phone Number</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.phone_number}</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='left'>
                                            <h6 className='font-light'>Phone Type</h6>
                                        </div>
                                        <div className='right'>
                                            <h6>{user?.phone_type}</h6>
                                        </div>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <div className='left'>*/}
                                    {/*        <h6 className='font-light'>Interested</h6>*/}
                                    {/*    </div>*/}
                                    {/*    <div className='right'>*/}
                                    {/*        <h6>{user?.state_name}</h6>*/}
                                    {/*    </div>*/}
                                    {/*</li>*/}
                                    {/*    );*/}
                                    {/*})}*/}
                                </ul>
                            </Col>
                        </Row>


                        <div className='product-buttons mt-3' style={{flexDirection: "column", width: "80px"}}>
                            <button className='btn btn-solid hover-solid btn-animation'
                                    style={{fontSize: "14px", padding: "2px 4px"}}
                                    onClick={() => setShowModal(true)}>Edit
                            </button>
                        </div>
                        {/*<Button onClick={()=>setShowModal(true)}>{item.btn}</Button>*/}

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
                                <AccountEditForm info={user} setShowModal={setShowModal} setLoading={setLoading}/>
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
                        {/*<div className='box-head mt-lg-5 mt-3'>*/}
                        {/*  <h3>{item.type1}</h3>*/}
                        {/*  <a href='#javascript' onClick={openProfileModal}>{item.btn}</a>*/}
                        {/*</div>*/}
                        {/*<LoginDetail item={item} openProfileModal={openProfileModal} />*/}
            {/*        </Fragment>*/}
            {/*    );*/}
            {/*})}*/}
        </Fragment>
    );
};

export default ProfileContain;
