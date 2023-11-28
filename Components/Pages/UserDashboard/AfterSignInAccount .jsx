import React from 'react';
import {signOut} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const AfterSignInAccount = ({isOpen, divRef}) => {
    let dispatch = useDispatch();
    let router = useRouter();
    return (
        <div className='onhover-div profile-dropdown' ref={divRef}>
                   <span className="d-md-none d-block" style={{textAlign: "end", cursor: "pointer"}}
                         onClick={() => isOpen()}
                   >
              <i className='fas fa-arrow-right back-cart'></i>
            </span>
            <div className='profile-dropdown-div' style={{marginBottom: "12px", paddingBottom: "12px"}}>
                <h3>ACCOUNT</h3>
                <h4 onClick={() => router.push('/my-account')}>My Account</h4>
                <h4 onClick={() => router.push('/my-account/manage-projects')}>My Projects</h4>
                <h4 onClick={() => router.push('/my-account/my-orders')}>View Orders</h4>
                <h4 onClick={() => router.push('/my-account/account-history')}>View History</h4>
            </div>
            <h4 onClick={() => dispatch(signOut())} style={{cursor: "pointer"}}>Sign Out</h4>
        </div>
    );
};

export default AfterSignInAccount;