import React, {Fragment, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Btn } from '../../AbstractElements';
import { DeleteyourAccount, Hi, MarkEnderess, deletedesp, Note, deletedesp2, deletedesp3 } from '../../Constant';
import LoginDetail from "./LoginDetail";
import {UserDashboardData} from "../../../Data/UserDashboardData";

const SecurityContain = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const ProfileFilter = UserDashboardData.filter((el) => el.type === 'Edit Account');
    const openProfileModal = () => {
        dispatch({ type: 'ISPROFILEMODAL' });
    };
  const deleteModal = () => {
    dispatch({ type: 'OPENDELETEMODAL' });
  };



  return (
    <Fragment>
      {/*<div className='box-head'>*/}
      {/*  <h3>{DeleteyourAccount}</h3>*/}
      {/*</div>*/}
      {/*<div className='security-details'>*/}
      {/*  <h5 className='font-light mt-3'>*/}
      {/*    {Hi} <span> {MarkEnderess}</span>*/}
      {/*  </h5>*/}
      {/*  <p className='font-light mt-1'>{deletedesp}</p>*/}
      {/*</div>*/}

      {/*<div className='security-details-1 mb-0'>*/}
      {/*  <div className='page-title'>*/}
      {/*    <h4 className='fw-bold'>{Note}</h4>*/}
      {/*  </div>*/}
      {/*  <p className='font-light'>{deletedesp2}</p>*/}

      {/*  <p className='font-light mb-4'>{deletedesp3}</p>*/}

      {/*  <Btn attrBtn={{ className: 'btn-solid-default btn-sm fw-bold rounded', onClick: deleteModal }}>{DeleteyourAccount}</Btn>*/}
      {/*</div>*/}
        {ProfileFilter.map((item, i) => {
            return (
                <Fragment key={i}>
                    {/*<div className='box-head'>*/}
                    {/*    <h2>Change Password</h2>*/}
                    {/*    /!*<a href='#javascript' onClick={openProfileModal}>{item.btn}</a>*!/*/}
                    {/*</div>*/}
                    <LoginDetail  />
                    {/*<div className='product-buttons mt-4' style={{flexDirection: "column", width: "80px"}}>*/}
                    {/*    <button className='btn btn-solid hover-solid btn-animation'*/}
                    {/*            style={{fontSize: "14px", padding: "2px 4px"}}*/}
                    {/*            onClick={() => setShowModal(true)}>save </button>*/}
                    {/*</div>*/}
                </Fragment>
            );
        })}
    </Fragment>
  );
};

export default SecurityContain;
