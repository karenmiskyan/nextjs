import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Nav, NavItem, NavLink} from 'reactstrap';
import {UserDashboardData} from '../../../Data/UserDashboardData';
import useWindowDimensions from '../../../Utils/useWindowDimensions';
import AllTabContain from './AllTabContain';
import {APICallUrl} from "../../Constant";
import {
    selectAuthUser,
    selectLoginToken,
    setShippingSing,
    setShippingThree,
    setShippingTwo
} from "../../../ReduxToolkit/Slices/LoginSlice";
import {useRouter} from "next/router";

const UserNav = ({isLoaded, loadError}) => {

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("");
    useEffect(() => {
        if (router.asPath === "/my-account/edit-address/") {
            setActiveTab(2);
        } else if (router.asPath === "/my-account/change-password/") {
            setActiveTab(3);
        } else {
            setActiveTab(1);
        }
    }, [])
    const dispatch = useDispatch();
    const loginToken = useSelector(selectLoginToken);
    const {isDashboard} = useSelector((state) => state.ModalReducer);
    const [num, setNum] = useState(1);
    const {width} = useWindowDimensions();
    const toggle = (id) => {
        width < 992 && dispatch({type: 'OVERLAY', payload: true});
        if (activeTab !== id) {
            setActiveTab(id);
        }
        setNum(id);
    };



    return (
        <Fragment>
            <Col lg='3' className="mb-3">
                <Nav className={`nav-tabs custome-nav-tabs flex-column category-option${isDashboard ? ' show' : ''}`}
                     id='myTab'>
                    {UserDashboardData.map((elem, i) => {

                        return (
                            <NavItem className='mb-2' key={i} onClick={() => dispatch({type: 'ISDASHBOARD'})}>
                                <NavLink className={`${activeTab === elem.id ? 'active' : ''}`} style={{cursor:"pointer"}}
                                         onClick={() => toggle(elem.id, elem)}>
                                    <i className='fas fa-angle-right'></i>
                                    {elem.type}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </Col>
            <AllTabContain activeTab={activeTab} num={num} loadError={loadError} isLoaded={isLoaded}/>
        </Fragment>
    );
};

export default UserNav;
